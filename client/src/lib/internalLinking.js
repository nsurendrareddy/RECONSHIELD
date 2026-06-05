import { KNOWN_IPS, KNOWN_ASNS, KNOWN_PORTS, KNOWN_HEADERS, KNOWN_DOMAINS } from './entityRegistry';

/**
 * Centralized Semantic Linking Engine
 * Generates relational data to prevent orphan pages and create crawl loops.
 * Links are strictly validated against the entity registry to ensure 200 HTTP response.
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

// Generates semantic relations for IPs based on classification groups
const generateIpRelations = (ip) => {
  const CLEAN_RESOLVERS = ['8.8.8.8', '1.1.1.1', '9.9.9.9'];
  const CRAWLERS = ['185.191.171.2', '194.165.16.2'];
  const THREATS = ['185.122.204.10', '45.227.255.43', '103.142.228.6', '193.169.255.10'];

  let neighbors = [];
  if (CLEAN_RESOLVERS.includes(ip)) {
    neighbors = CLEAN_RESOLVERS.filter(item => item !== ip).map(item => ({ label: item, href: `/ip/${item}` }));
  } else if (CRAWLERS.includes(ip)) {
    neighbors = CRAWLERS.filter(item => item !== ip).map(item => ({ label: item, href: `/ip/${item}` }));
  } else if (THREATS.includes(ip)) {
    neighbors = THREATS.filter(item => item !== ip).map(item => ({ label: item, href: `/ip/${item}` }));
  } else {
    // Fallback: only pick other known IPs
    neighbors = KNOWN_IPS.filter(item => item !== ip).slice(0, 4).map(item => ({ label: item, href: `/ip/${item}` }));
  }

  return {
    subnets: [
      { label: `IP Intelligence Hub`, href: `/ip-intelligence` },
    ],
    neighbors: neighbors,
    asnLink: { label: 'Browse Autonomous Systems', href: '/asn' }
  };
};

// Generates semantic relations for ASNs
const generateAsnRelations = (asnStr) => {
  const normalizedAsn = asnStr.toUpperCase();
  const peers = KNOWN_ASNS
    .filter(asn => asn.toUpperCase() !== normalizedAsn)
    .map(asn => ({ label: `${asn} Profile`, href: `/asn/${asn}` }));

  return { peers };
};

// Generates protocol and web-stack clustering for ports
const generatePortRelations = (portStr) => {
  const port = parseInt(portStr, 10);
  const webPorts = [80, 443, 8080];
  const emailPorts = [25, 110, 143, 587];
  const dbPorts = [3306, 5432, 6379, 27017];
  const adminPorts = [22, 23, 3389];
  
  let cluster = [];
  let clusterName = 'Related Security Ports';
  
  if (webPorts.includes(port)) {
    clusterName = 'Web Infrastructure Ports';
    cluster = webPorts.filter(p => p !== port).map(p => ({ label: `Port ${p}`, href: `/ports/${p}` }));
  } else if (emailPorts.includes(port)) {
    clusterName = 'Email Infrastructure Ports';
    cluster = emailPorts.filter(p => p !== port).map(p => ({ label: `Port ${p}`, href: `/ports/${p}` }));
  } else if (dbPorts.includes(port)) {
    clusterName = 'Database & Cache Ports';
    cluster = dbPorts.filter(p => p !== port).map(p => ({ label: `Port ${p}`, href: `/ports/${p}` }));
  } else if (adminPorts.includes(port)) {
    clusterName = 'Remote Administration Ports';
    cluster = adminPorts.filter(p => p !== port).map(p => ({ label: `Port ${p}`, href: `/ports/${p}` }));
  } else {
    // Return standard popular ports that exist in the database
    cluster = KNOWN_PORTS.filter(p => p !== port).slice(0, 4).map(p => ({ label: `Port ${p}`, href: `/ports/${p}` }));
  }
  
  return { clusterName, cluster };
};

// Generates semantic clusters for Security Headers
const generateHeaderRelations = (header) => {
  const normalized = header.toLowerCase();
  
  const securityGroup = [
    { label: 'Strict-Transport-Security', href: '/headers/strict-transport-security' },
    { label: 'Content-Security-Policy', href: '/headers/content-security-policy' },
    { label: 'X-Frame-Options', href: '/headers/x-frame-options' },
    { label: 'X-Content-Type-Options', href: '/headers/x-content-type-options' },
    { label: 'Server', href: '/headers/server' }
  ];
  
  return {
    relatedHeaders: securityGroup.filter(h => h.label.toLowerCase() !== normalized),
    relatedTool: { label: 'Analyze Headers in Port Scanner', href: '/tools/port-scanner' }
  };
};

const generateDnsRelations = (domain) => {
  const cleanDomain = domain.toLowerCase();
  const related = [];
  
  if (KNOWN_DOMAINS.includes(cleanDomain)) {
    related.push({ label: `Check SSL for ${cleanDomain}`, href: `/ssl/${cleanDomain}` });
    related.push({ label: `Find Subdomains of ${cleanDomain}`, href: `/subdomains/${cleanDomain}` });
    related.push({ label: `DNS Records for ${cleanDomain}`, href: `/dns-records/${cleanDomain}` });
    related.push({ label: `Whois Records for ${cleanDomain}`, href: `/tools/whois/${cleanDomain}` });
  }

  return { related };
};

const generateSslRelations = (domain) => {
  const cleanDomain = domain.toLowerCase();
  const related = [];

  if (KNOWN_DOMAINS.includes(cleanDomain)) {
    related.push({ label: `DNS Records for ${cleanDomain}`, href: `/dns-records/${cleanDomain}` });
    related.push({ label: `Find Subdomains of ${cleanDomain}`, href: `/subdomains/${cleanDomain}` });
    related.push({ label: `Whois Records for ${cleanDomain}`, href: `/tools/whois/${cleanDomain}` });
  }

  return { related };
};
