// ReconShield Email Authentication Errors SEO Data
// Provides comprehensive security analysis, configuration guides, troubleshooting steps, and FAQs.

export const EMAIL_AUTHS_DATA = {
  'spf-errors': {
    name: "SPF (Sender Policy Framework) Errors",
    title: "SPF Errors – DNS Qualifier Failures, Lookup Limits & Mitigations",
    description: "Detailed analysis of SPF (Sender Policy Framework) record errors. Learn how to debug the 10-DNS-lookup limit, syntax errors, and authentication failures.",
    content: `
## What is an SPF Record?
Sender Policy Framework (SPF) is an email authentication standard hosted in a domain's DNS TXT record. It specifies which IP addresses, subnets, and mail servers (like Google Workspace, Microsoft 365, or SendGrid) are authorized to send outbound emails on behalf of your domain name.

## Common SPF Errors and Syntax Gaps
SPF validation is delicate, and minor syntax errors can break the entire email defense layout:
* **The 10-DNS-Lookup Limit Exceeded:** The SPF protocol restricts the number of recursive DNS lookups (triggered by mechanisms like \`include\`, \`a\`, \`mx\`, and \`exists\`) to a maximum of 10. If an SPF record exceeds this limit, receiving mail servers reject verification, resulting in a PermError.
* **Multiple SPF Records configured:** A domain must have exactly one SPF record. If a resolver finds multiple records starting with \`v=spf1\`, it immediately returns a PermError, invalidating all authorized IP listings.
* **Incorrect Mechanism Qualifiers:** Misusing qualifiers (like using \`+all\` which permits the entire internet to send mail, instead of \`~all\` or \`-all\`) defeats the purpose of SPF.
* **IP Range Syntax Errors:** Missing spaces, typos in CIDR notations (e.g., \`ip4:192.168.1.0/24\` formatted without the prefix), or duplicate entries.

## The Security Impact of SPF Failures
* **Domain Spoofing & Phishing:** If SPF validation fails or returns a PermError, spam filters have no way to verify the sender, permitting threat actors to send highly convincing spoofed emails impersonating your employees.
* **Damaged Sender Reputation:** If your legitimate sending IPs fail SPF checks, your domain reputation is downgraded, causing emails to be routed directly to recipients' spam folders.

## How to Resolve SPF Validation Errors
1. **Consolidate and Flatten Records:** If you exceed the 10-DNS-lookup constraint, merge redundant includes or use an SPF flattening tool to resolve nested domains into raw IP ranges.
2. **Remove Stale Authorizations:** Regularly audit your SPF records to remove third-party email tools that your marketing or sales teams no longer use.
3. **Merge Dual Declarations:** If you have separate SPF records (e.g., one for Google and one for Salesforce), merge them into a single TXT entry: \`v=spf1 include:_spf.google.com include:salesforce.com ~all\`.
    `,
    faqs: [
      { q: "What is the SPF 10-lookup limit?", a: "A rule restricting SPF validation to a maximum of 10 recursive DNS queries to prevent Denial of Service (DoS) attacks on DNS servers." },
      { q: "What happens if a domain has multiple SPF records?", a: "Receiving mail servers return a PermError, and SPF verification fails completely, leaving the domain vulnerable to spoofing." },
      { q: "What is the difference between softfail (~all) and hardfail (-all)?", a: "Softfail (~all) recommends receivers accept the email but flag it as suspicious, while hardfail (-all) directs receivers to reject the email outright if authentication fails." },
      { q: "How do I check if my SPF record is valid?", a: "You can query your domain's TXT records using the ReconShield Email Security tool to analyze syntax and check lookup counts." },
      { q: "Does SPF protect against display name spoofing?", a: "No. SPF only validates the 'Return-Path' domain in the email header. It does not validate the visible 'From' display name, which requires DMARC." }
    ],
    relatedTools: ['email-security', 'dns-lookup', 'vulnerability-scanner']
  },
  'dkim-errors': {
    name: "DKIM (DomainKeys Identified Mail) Errors",
    title: "DKIM Errors – Key Length Mismatches, Syntax & Header Signature Fixes",
    description: "Detailed guide to debugging DKIM (DomainKeys Identified Mail) errors. Learn about selector mismatches, key size vulnerability audits, and header signature checks.",
    content: `
## What is DKIM?
DomainKeys Identified Mail (DKIM) is an email authentication protocol that adds a cryptographic signature to the header of outbound email messages. The sending mail server signs the message using its private key, and the receiving mail server verifies the signature using the sender's public key published as a DNS TXT record at a specific subdomain location called a "selector".

## Common DKIM Errors and Implementation Failures
* **Selector Mismatches:** If the sending server signs the email using selector 's1' but the DNS public key is published under selector 's2', the receiver cannot locate the public key, causing DKIM validation to fail.
* **Weak Cryptographic Keys (512 or 1024-bit):** Threat actors can crack 512-bit and 1024-bit RSA keys using public cloud resources. Modern email standards require at least 2048-bit keys to pass security audits.
* **Body Hash Mismatches:** This occurs if intermediate mail relays, auto-forwarders, or spam filters alter the email's body layout, line endings, or headers in transit, invalidating the signature.
* **Syntax Errors in DNS Records:** Missing or incorrect tags in the public key TXT record (such as incorrect \`k=rsa\` or \`p=\` values).

## Security Consequences of DKIM Vulnerabilities
* **Tampering in Transit:** Lacking DKIM makes it easy for attackers to alter email contents or inject malicious attachments in transit without the recipient knowing.
* **Phishing Susceptibility:** Without DKIM validation, receivers cannot confirm the integrity of the email header, making it easier for spoofed emails to pass basic spam checks.

## How to Fix DKIM Failures
1. **Upgrade to 2048-bit Keys:** Generate new DKIM key pairs with 2048-bit length. Update your DNS TXT records and configure your sending mail server to use the new keys.
2. **Review DKIM Selectors:** Match the selector specified in your email headers (e.g., \`s=selectorName\`) with the DNS subdomain name (e.g., \`selectorName._domainkey.example.com\`).
3. **Configure Canonicalization Policies:** Use 'relaxed' canonicalization headers (e.g., \`c=relaxed/relaxed\`) to allow minor header formatting changes in transit without breaking the cryptographic signature.
    `,
    faqs: [
      { q: "What is a DKIM selector?", a: "A unique string used to identify the specific public key in a domain's DNS records, allowing organizations to use multiple mail providers." },
      { q: "Why does my DKIM fail check despite having a DNS record?", a: "Common causes include selector mismatches, key typos, or modifications to the email body by intermediate relays." },
      { q: "What is the recommended key length for DKIM?", a: "Strong security standards require 2048-bit keys. 1024-bit keys are increasingly vulnerable to factorization, and 512-bit keys are deprecated." },
      { q: "How do I check if my outbound emails are DKIM signed?", a: "You can send an email to a test service or check the email's raw headers for the `DKIM-Signature` block." },
      { q: "Does DKIM check the sender IP address?", a: "No. Unlike SPF, DKIM does not check the sender IP address. It relies entirely on cryptographic signature verification." }
    ],
    relatedTools: ['email-security', 'dns-lookup', 'port-scanner']
  },
  'dmarc-errors': {
    name: "DMARC (Domain-based Message Authentication) Errors",
    title: "DMARC Errors – Alignment Failures, Policy Gaps & Reporting Setup",
    description: "Detailed analysis of DMARC (Domain-based Message Authentication) errors. Learn how to resolve alignment failures, syntax errors, and move to p=reject safely.",
    content: `
## What is DMARC?
Domain-based Message Authentication, Reporting, and Conformance (DMARC) is the ultimate email security standard. It ties SPF and DKIM protocols together, requiring "alignment" between the domain in the visible 'From' header and the domains verified by SPF and DKIM. DMARC tells receiving mail servers how to handle emails that fail authentication (via none, quarantine, or reject policies) and coordinates aggregate reporting.

## Common DMARC Misconfigurations and Failures
* **DMARC Alignment Failures:** This occurs when SPF or DKIM verify successfully, but for a different domain (e.g., mail sent from a third-party tool like Mailchimp uses mailchimp.com in the Return-Path but example.com in the visible From). Without alignment, DMARC fails.
* **Setting the Policy to 'none' Permanently:** A policy of \`p=none\` is for monitoring only. Leaving it enabled permanently does not block email spoofing, rendering the domain vulnerable.
* **Incorrect DNS TXT Record Syntax:** Typos in essential tags (such as \`v=DMARC1\` configured with lowercase letters, missing semicolons, or incorrect policy values).
* **Missing rua/ruf Reporting Addresses:** Failing to configure report destinations means you cannot monitor delivery failures or detect phishing campaigns.

## Phishing and BEC Exploits via DMARC Gaps
* **Business Email Compromise (BEC):** Threat actors spoof domain headers to send false wire transfer requests to finance teams. Without a strict \`p=quarantine\` or \`p=reject\` policy, these emails are delivered.
* **Brand Abuse:** Cybercriminals send mass phishing campaigns using your exact domain name, damaging customer trust and triggering spam-blocklists.

## Road to DMARC Enforcement (p=reject)
1. **Start with p=none:** Publish a basic record with a reporting address: \`v=DMARC1; p=none; rua=mailto:dmarc-reports@example.com\`.
2. **Analyze rua XML Reports:** Review reporting data to identify legitimate email senders (such as CRM or invoice tools) that fail alignment.
3. **Fix SPF and DKIM Alignments:** Configure custom Return-Path domains and custom DKIM selectors on all legitimate email services.
4. **Transition to p=quarantine:** Escalate your policy to quarantine unauthorized emails to the spam folder.
5. **Enforce p=reject:** Once alignment rates reach >99%, set \`p=reject\` to block all spoofed emails.
    `,
    faqs: [
      { q: "What is DMARC alignment?", a: "The requirement that the domain in the visible From header matches the domain verified by SPF (Return-Path) and/or DKIM." },
      { q: "Why is a DMARC policy of p=none vulnerable?", a: "Because `p=none` instructs receiving servers to take no action on failed emails, allowing spoofed emails to land in users' inboxes." },
      { q: "What is the difference between rua and ruf tags?", a: "The `rua` tag specifies the destination for aggregate daily reports (XML summaries), while `ruf` is for forensic reports (detailed copies of failed emails)." },
      { q: "How do I fix a DMARC syntax error?", a: "Ensure your record starts exactly with `v=DMARC1;`, uses correct uppercase tags, and has exactly one valid policy defined." },
      { q: "Does DMARC protect my domain from spoofing?", a: "Yes. Once fully enforced at `p=reject`, DMARC prevents anyone from sending unauthorized emails using your domain name." }
    ],
    relatedTools: ['email-security', 'dns-lookup', 'vulnerability-scanner']
  }
};
