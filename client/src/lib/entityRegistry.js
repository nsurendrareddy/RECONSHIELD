// Centralized Entity Registry for ReconShield
// Ensures all links and sitemap entries point to pages that return HTTP 200.

export const KNOWN_IPS = [
  '8.8.8.8',
  '1.1.1.1',
  '9.9.9.9',
  '185.191.171.2',
  '194.165.16.2',
  // New whitelisted demo/example IPs
  '8.8.4.4',
  '1.0.0.1',
  '208.67.222.222',
  // Active threat pulse IPs
  '185.122.204.10',
  '45.227.255.43',
  '103.142.228.6',
  '193.169.255.10'
];

export const KNOWN_ASNS = [
  'AS15169', // Google
  'AS13335', // Cloudflare
  'AS714',   // Apple
  'AS32934', // Facebook
  'AS16509', // Amazon
  'AS8075',  // Microsoft
  'AS14618', // Amazon Dev
  'AS54113', // Fastly
  'AS36692'  // Cisco OpenDNS
];

export const KNOWN_PORTS = [
  21,    // FTP
  22,    // SSH
  23,    // Telnet
  25,    // SMTP
  53,    // DNS
  80,    // HTTP
  110,   // POP3
  143,   // IMAP
  443,   // HTTPS
  587,   // SMTP SSL/TLS Submission
  3306,  // MySQL
  3389,  // RDP
  5432,  // PostgreSQL
  6379,  // Redis
  8080,  // HTTP-Alt
  27017  // MongoDB
];

export const KNOWN_HEADERS = [
  'server',
  'content-security-policy',
  'x-frame-options',
  'strict-transport-security',
  'x-content-type-options'
];

export const KNOWN_DOMAINS = [
  'google.com',
  'reconshield.in',
  'github.com',
  'cloudflare.com',
  'microsoft.com',
  'yahoo.com',
  'apple.com'
];

// Helper checks for existence and validity
export const isValidIP = (ip) => KNOWN_IPS.includes(ip);
export const isValidASN = (asn) => KNOWN_ASNS.includes(asn);
export const isValidPort = (port) => KNOWN_PORTS.includes(parseInt(port, 10));
export const isValidHeader = (header) => KNOWN_HEADERS.includes(header.toLowerCase());
export const isValidDomain = (domain) => KNOWN_DOMAINS.includes(domain.toLowerCase());
