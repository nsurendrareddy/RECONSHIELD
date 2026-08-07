import { NextResponse } from 'next/server';
import dns from 'dns/promises';

// Helper function to resolve TXT records using node dns
async function resolveTxtSafe(hostname) {
  try {
    const records = await dns.resolveTxt(hostname);
    // dns.resolveTxt returns array of string arrays (chunks)
    return records.map(chunk => chunk.join(''));
  } catch (err) {
    return [];
  }
}

// Helper function to resolve MX records
async function resolveMxSafe(hostname) {
  try {
    const records = await dns.resolveMx(hostname);
    return records.sort((a, b) => a.priority - b.priority).map(r => `${r.priority} ${r.exchange}`);
  } catch (err) {
    return [];
  }
}

// Fallback DoH fetch for server side if system DNS fails or yields empty
async function dohQuery(name, type) {
  const endpoints = [
    `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(name)}&type=${type}`,
    `https://dns.google/resolve?name=${encodeURIComponent(name)}&type=${type}`
  ];

  for (const url of endpoints) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      const res = await fetch(url, {
        headers: { accept: 'application/dns-json' },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.Answer && Array.isArray(data.Answer)) {
          return data.Answer.map(a => a.data ? a.data.replace(/^"|"$/g, '').replace(/\\"/g, '"') : '').filter(Boolean);
        }
      }
    } catch (e) {
      // Continue to next endpoint
    }
  }
  return [];
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const rawDomain = searchParams.get('domain');

  if (!rawDomain) {
    return NextResponse.json({ error: 'Domain parameter is required.' }, { status: 400 });
  }

  // Clean domain string
  const cleanDomain = rawDomain
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/\/.*$/, '')
    .replace(/[^a-z0-9.-]/g, '');

  if (!cleanDomain || !cleanDomain.includes('.')) {
    return NextResponse.json({ error: 'Please enter a valid domain name (e.g. example.com).' }, { status: 400 });
  }

  try {
    // 1. Resolve TXT records for domain (SPF)
    let txtRecords = await resolveTxtSafe(cleanDomain);
    if (txtRecords.length === 0) {
      txtRecords = await dohQuery(cleanDomain, 'TXT');
    }

    // 2. Resolve DMARC records (_dmarc.domain)
    let dmarcRecords = await resolveTxtSafe(`_dmarc.${cleanDomain}`);
    if (dmarcRecords.length === 0) {
      dmarcRecords = await dohQuery(`_dmarc.${cleanDomain}`, 'TXT');
    }

    // 3. Resolve BIMI records (default._bimi.domain)
    let bimiRecords = await resolveTxtSafe(`default._bimi.${cleanDomain}`);
    if (bimiRecords.length === 0) {
      bimiRecords = await dohQuery(`default._bimi.${cleanDomain}`, 'TXT');
    }

    // 4. Resolve MX records
    let mxRecords = await resolveMxSafe(cleanDomain);
    if (mxRecords.length === 0) {
      mxRecords = await dohQuery(cleanDomain, 'MX');
    }

    // 5. Resolve common DKIM selectors
    const dkimSelectors = ['google', 'k1', 's1', 'selector1', 'mail', 'default', 'dmarc'];
    const dkimResults = [];

    await Promise.all(
      dkimSelectors.map(async (selector) => {
        const host = `${selector}._domainkey.${cleanDomain}`;
        let records = await resolveTxtSafe(host);
        if (records.length === 0) {
          records = await dohQuery(host, 'TXT');
        }
        const dkimRecord = records.find(r => r.includes('v=DKIM1') || r.includes('p='));
        if (dkimRecord) {
          dkimResults.push({
            selector,
            record: dkimRecord,
            keyLength: dkimRecord.includes('p=') ? (dkimRecord.length > 250 ? '2048-bit+' : '1024-bit') : 'Unknown'
          });
        }
      })
    );

    // Parse SPF
    const spfRecord = txtRecords.find(r => r.startsWith('v=spf1')) || null;
    let spfLookupCount = 0;
    let spfMechanisms = [];
    if (spfRecord) {
      const matches = spfRecord.match(/\b(include|redirect|a|mx|exists|ptr):?[^\s]*/gi);
      spfLookupCount = matches ? matches.length : 0;
      spfMechanisms = spfRecord.split(/\s+/).filter(Boolean);
    }

    // Parse DMARC
    const dmarcRecord = dmarcRecords.find(r => r.startsWith('v=DMARC1')) || null;
    let dmarcPolicy = 'none';
    let dmarcSubdomainPolicy = 'none';
    let dmarcRua = null;
    let dmarcRuf = null;

    if (dmarcRecord) {
      const pMatch = dmarcRecord.match(/\bp=([a-z]+)/i);
      if (pMatch) dmarcPolicy = pMatch[1].toLowerCase();

      const spMatch = dmarcRecord.match(/\bsp=([a-z]+)/i);
      if (spMatch) dmarcSubdomainPolicy = spMatch[1].toLowerCase();

      const ruaMatch = dmarcRecord.match(/\brua=([^\s;]+)/i);
      if (ruaMatch) dmarcRua = ruaMatch[1];

      const rufMatch = dmarcRecord.match(/\bruf=([^\s;]+)/i);
      if (rufMatch) dmarcRuf = rufMatch[1];
    }

    // Parse BIMI
    const bimiRecord = bimiRecords.find(r => r.startsWith('v=BIMI1')) || null;
    let bimiLogoUrl = null;
    let bimiVmcUrl = null;
    if (bimiRecord) {
      const lMatch = bimiRecord.match(/\bl=([^\s;]+)/i);
      if (lMatch) bimiLogoUrl = lMatch[1];
      const aMatch = bimiRecord.match(/\ba=([^\s;]+)/i);
      if (aMatch) bimiVmcUrl = aMatch[1];
    }

    // Calculate Deliverability Score & Identify Issues
    let score = 0;
    const issues = [];
    const recommendations = [];

    // SPF Scoring
    if (spfRecord) {
      score += 25;
      if (spfLookupCount > 10) {
        issues.push({
          severity: 'High',
          category: 'SPF',
          title: 'SPF 10-DNS Lookup Limit Exceeded',
          desc: `Found ${spfLookupCount} DNS lookups in SPF record. RFC 7208 limits lookups to 10. Receiving mail servers will abort evaluation with a PermError.`,
          remediation: 'Flatten your SPF record by consolidating domain includes into direct IP blocks (ip4/ip6) or using dynamic SPF lookup services.'
        });
      } else if (spfRecord.includes('+all')) {
        issues.push({
          severity: 'Critical',
          category: 'SPF',
          title: 'SPF Permissive "+all" Qualifier Detected',
          desc: 'The "+all" mechanism explicitly authorizes ANY IP address to send email on behalf of your domain.',
          remediation: 'Replace "+all" with "-all" (hardfail) or "~all" (softfail).'
        });
      } else if (spfRecord.includes('~all')) {
        recommendations.push('Upgrade SPF ending qualifier from "~all" (softfail) to "-all" (hardfail) once DMARC is fully enforced.');
      }
    } else {
      issues.push({
        severity: 'Critical',
        category: 'SPF',
        title: 'Missing SPF Record',
        desc: 'No SPF TXT record was found. Unauthenticated senders can easily send emails pretending to come from your domain.',
        remediation: 'Publish an SPF TXT record (v=spf1 ...) specifying authorized mail servers for your domain.'
      });
    }

    // DMARC Scoring
    if (dmarcRecord) {
      if (dmarcPolicy === 'reject') {
        score += 40;
      } else if (dmarcPolicy === 'quarantine') {
        score += 30;
        recommendations.push('Transition DMARC policy from p=quarantine to p=reject for complete spoofing elimination.');
      } else {
        score += 15;
        issues.push({
          severity: 'Medium',
          category: 'DMARC',
          title: 'Weak DMARC Policy (p=none)',
          desc: 'DMARC is configured in monitoring mode only (p=none). Unauthenticated or spoofed emails will still reach recipients.',
          remediation: 'Monitor aggregate RUA reports and upgrade your DMARC policy to p=quarantine and eventually p=reject.'
        });
      }

      if (!dmarcRua) {
        recommendations.push('Add an aggregate reporting tag (rua=mailto:dmarc-reports@' + cleanDomain + ') to receive daily authentication reports.');
      }
    } else {
      issues.push({
        severity: 'Critical',
        category: 'DMARC',
        title: 'Missing DMARC Policy',
        desc: `No DMARC record found at _dmarc.${cleanDomain}. Mail providers will not enforce SPF/DKIM failures or reject spoofed messages.`,
        remediation: `Create a DNS TXT record for _dmarc.${cleanDomain} with value "v=DMARC1; p=reject; rua=mailto:dmarc-reports@${cleanDomain};"`
      });
    }

    // DKIM Scoring
    if (dkimResults.length > 0) {
      score += 20;
    } else {
      issues.push({
        severity: 'High',
        category: 'DKIM',
        title: 'No Active DKIM Selectors Discovered',
        desc: 'Could not detect public DKIM keys under common selectors (google, k1, s1, selector1, mail, default).',
        remediation: 'Ensure your mail provider (e.g. Google Workspace, Microsoft 365) has active DKIM signing enabled and public keys published in DNS.'
      });
    }

    // MX Server Scoring
    if (mxRecords.length > 0) {
      score += 10;
    } else {
      issues.push({
        severity: 'High',
        category: 'MX',
        title: 'No MX Records Found',
        desc: 'Domain has no active MX records configured. Incoming emails will fail to deliver.',
        remediation: 'Configure MX DNS records pointing to your email hosting provider servers.'
      });
    }

    // BIMI Scoring
    if (bimiRecord) {
      score += 5;
    } else if (dmarcPolicy === 'reject' || dmarcPolicy === 'quarantine') {
      recommendations.push('Deploy BIMI (Brand Indicators for Message Identification) to display your official verified brand logo in recipient inboxes.');
    }

    return NextResponse.json({
      domain: cleanDomain,
      score: Math.min(100, score),
      spfRecord,
      spfLookupCount,
      spfMechanisms,
      dmarcRecord,
      dmarcPolicy,
      dmarcSubdomainPolicy,
      dmarcRua,
      dmarcRuf,
      dkimResults,
      bimiRecord,
      bimiLogoUrl,
      bimiVmcUrl,
      mxRecords,
      issues,
      recommendations,
      timestamp: new Date().toISOString()
    });

  } catch (err) {
    console.error('API Email Audit Error:', err);
    return NextResponse.json(
      { error: 'Failed to complete email security audit: ' + (err.message || 'Unknown error') },
      { status: 500 }
    );
  }
}
