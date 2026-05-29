/**
 * Centralized Semantic Linking Engine
 * Generates relational data to prevent orphan pages and create crawl loops.
 */

export const getRelatedEntities = (entityType, entityValue) => {
  switch (entityType) {
    case 'ip':
      return generateIpRelations(entityValue);
    case 'asn':
      return generateAsnRelations(entityValue);
    case 'port':
      return generatePortRelations(entityValue);
    case 'header':
      return generateHeaderRelations(entityValue);
    case 'dns':
      return generateDnsRelations(entityValue);
    case 'ssl':
      return generateSslRelations(entityValue);
    default:
      return { related: [] };
  }
};

// Generates mathematical and contextual relations for IPs
const generateIpRelations = (ip) => {
  const parts = ip.split('.');
  if (parts.length !== 4) return { subnets: [], neighbors: [] };
  
  const base = `${parts[0]}.${parts[1]}.${parts[2]}`;
  const lastOctet = parseInt(parts[3], 10);
  
  return {
    subnets: [
      { label: `${base}.0/24 Subnet`, href: `/ip-intelligence` }, // Link to hub for now, ideal would be a subnet page
    ],
    neighbors: [
      { label: `${base}.${Math.max(1, lastOctet - 1)}`, href: `/ip/${base}.${Math.max(1, lastOctet - 1)}` },
      { label: `${base}.${Math.max(1, lastOctet - 2)}`, href: `/ip/${base}.${Math.max(1, lastOctet - 2)}` },
      { label: `${base}.${Math.min(254, lastOctet + 1)}`, href: `/ip/${base}.${Math.min(254, lastOctet + 1)}` },
      { label: `${base}.${Math.min(254, lastOctet + 2)}`, href: `/ip/${base}.${Math.min(254, lastOctet + 2)}` },
    ],
    asnLink: { label: 'Lookup ASN for this IP', href: '/asn' }
  };
};

// Generates mathematical relations for ASNs
const generateAsnRelations = (asnStr) => {
  const asnNum = parseInt(asnStr.replace(/^AS/i, ''), 10) || 15169;
  return {
    peers: [
      { label: `AS${asnNum + 1}`, href: `/asn/AS${asnNum + 1}` },
      { label: `AS${asnNum + 2}`, href: `/asn/AS${asnNum + 2}` },
      { label: `AS${Math.max(1, asnNum - 1)}`, href: `/asn/AS${Math.max(1, asnNum - 1)}` },
      { label: `AS${Math.max(1, asnNum - 2)}`, href: `/asn/AS${Math.max(1, asnNum - 2)}` },
    ]
  };
};

// Generates protocol and web-stack clustering for ports
const generatePortRelations = (portStr) => {
  const port = parseInt(portStr, 10);
  const webPorts = [80, 443, 8080, 8443];
  const emailPorts = [25, 110, 143, 465, 587, 993];
  const dbPorts = [3306, 5432, 27017, 6379, 1433];
  
  let cluster = [];
  let clusterName = 'Adjacent Ports';
  
  if (webPorts.includes(port)) {
    clusterName = 'Web Infrastructure Ports';
    cluster = webPorts.filter(p => p !== port).map(p => ({ label: `Port ${p}`, href: `/ports/${p}` }));
  } else if (emailPorts.includes(port)) {
    clusterName = 'Email Infrastructure Ports';
    cluster = emailPorts.filter(p => p !== port).map(p => ({ label: `Port ${p}`, href: `/ports/${p}` }));
  } else if (dbPorts.includes(port)) {
    clusterName = 'Database & Cache Ports';
    cluster = dbPorts.filter(p => p !== port).map(p => ({ label: `Port ${p}`, href: `/ports/${p}` }));
  } else {
    // Generate adjacent ports
    cluster = [
      { label: `Port ${port + 1}`, href: `/ports/${port + 1}` },
      { label: `Port ${Math.max(1, port - 1)}`, href: `/ports/${Math.max(1, port - 1)}` }
    ];
  }
  
  return { clusterName, cluster };
};

// Generates semantic clusters for Security Headers
const generateHeaderRelations = (header) => {
  const normalized = header.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  const securityGroup = [
    { label: 'Strict-Transport-Security', href: '/headers/strict-transport-security' },
    { label: 'Content-Security-Policy', href: '/headers/content-security-policy' },
    { label: 'X-Frame-Options', href: '/headers/x-frame-options' },
    { label: 'X-Content-Type-Options', href: '/headers/x-content-type-options' },
  ];
  
  return {
    relatedHeaders: securityGroup.filter(h => h.label.toLowerCase().replace(/[^a-z0-9]/g, '') !== normalized),
    relatedTool: { label: 'Test Headers with Port Scanner', href: '/ports' }
  };
};

const generateDnsRelations = (domain) => {
  return {
    related: [
      { label: `Check SSL for ${domain}`, href: `/ssl/${domain}` },
      { label: `Find Subdomains of ${domain}`, href: `/subdomains/${domain}` },
      { label: `DNS Analysis Hub`, href: `/dns-analysis` }
    ]
  };
};

const generateSslRelations = (domain) => {
  return {
    related: [
      { label: `Check DNS Records for ${domain}`, href: `/dns-records/${domain}` },
      { label: `Find Subdomains of ${domain}`, href: `/subdomains/${domain}` },
      { label: `SSL Hub`, href: `/ssl` }
    ]
  };
};
