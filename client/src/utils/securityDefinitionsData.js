export const SECURITY_DEFINITIONS = {
  'ssl-checker': {
    title: "Key Security Definitions",
    description: "Understand the core terminology of secure transport systems:",
    colorClass: "text-[#00ff88]",
    definitions: [
      {
        name: "SSL Handshake",
        description: "An SSL handshake is the initialization process that establishes an encrypted session between a client and a server. It negotiates the protocol version, evaluates the server's certificate, and generates secure symmetric keys for the session."
      },
      {
        name: "Certificate Authority",
        description: "A Certificate Authority (CA) is a trusted entity that issues digital certificates. It verifies the identity of domain owners, enabling browsers to trust the cryptographic encryption keys presented by servers."
      },
      {
        name: "Wildcard Certificate",
        description: "A wildcard certificate is a single public-key certificate that can secure a root domain and an unlimited number of its direct subdomains, designated by an asterisk (e.g., *.example.com)."
      },
      {
        name: "Cipher Suite",
        description: "A cipher suite is a standardized set of cryptographic algorithms used to establish a secure connection. It defines the key exchange, authentication, symmetric encryption, and message authentication code (MAC) algorithms."
      }
    ]
  },
  'subdomain-finder': {
    title: "Key Security Definitions",
    description: "Understand the core terminology of host name mapping and discovery:",
    colorClass: "text-[#f97316]",
    definitions: [
      {
        name: "DNS Zone",
        description: "A DNS zone is a distinct portion of the global domain name space that is managed by a single administrator or organization. It contains the authoritative records mapping subdomains to specific network resources."
      },
      {
        name: "Passive Reconnaissance",
        description: "Passive reconnaissance is a security intelligence methodology that gathers data about a target system using public registries, CT logs, and OSINT databases without interacting with or sending traffic to the target."
      },
      {
        name: "OSINT",
        description: "OSINT (Open Source Intelligence) refers to the collection and analysis of data gathered from publicly available, legal sources to identify security vulnerabilities, exposed assets, and organizational footprints."
      }
    ]
  },
  'port-scanner': {
    title: "Key Security Definitions",
    description: "Understand the core terminology of network service auditing:",
    colorClass: "text-[#ef4444]",
    definitions: [
      {
        name: "Active Reconnaissance",
        description: "Active reconnaissance is a security scanning methodology that directly interacts with the target network (e.g., sending probe packets) to discover open ports, active hosts, and operating systems."
      },
      {
        name: "Port Scanning",
        description: "Port scanning is a network exploration technique that sends packets to specific ports on a host to determine which services are listening, closed, or blocked by security firewalls."
      },
      {
        name: "Threat Vector",
        description: "A threat vector is a path, route, or technique that an unauthorized actor uses to gain unauthorized access to a network, system, or application to deliver a malicious payload or execute exploits."
      }
    ]
  }
};
