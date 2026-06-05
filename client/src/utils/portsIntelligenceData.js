export const PORTS_INTELLIGENCE = {
  21: {
    port: 21,
    service: 'FTP',
    protocol: 'TCP',
    risk: 'High',
    purpose: 'File Transfer Protocol (FTP) is a standard network protocol used to transfer computer files between a client and server on a computer network. Port 21 is used to establish the control connection, which handles commands and replies.',
    commonServices: [
      { name: 'vsftpd', desc: 'Very Secure FTP Daemon, widely used on Linux systems.' },
      { name: 'ProFTPD', desc: 'Highly configurable and modular FTP server software.' },
      { name: 'Pure-FTPd', desc: 'Lightweight and security-focused FTP server.' }
    ],
    risks: 'FTP transmits commands, credentials, and data in clear text. This exposes network traffic to passive sniffing, spoofing, and man-in-the-middle (MITM) attacks. Legacy versions of FTP servers also contain remote code execution vulnerabilities.',
    cves: [
      { id: 'CVE-2011-2523', desc: 'vsftpd 2.3.4 Backdoor Vulnerability. A malicious backdoor was inserted into the source code archive, allowing attackers to execute commands as root by sending a specific character sequence.' },
      { id: 'CVE-2019-12815', desc: 'ProFTPD Arbitrary File Copy. An issue in the mod_copy module allowed unauthenticated users to copy arbitrary files on the server.' }
    ],
    hardening: [
      'Migrate to secure protocols: Disable port 21 and enforce SFTP (SSH File Transfer Protocol) or FTPS (FTP over SSL/TLS).',
      'Disable anonymous access to prevent unauthorized users from viewing or hosting files.',
      'Configure chroot jails to restrict FTP users to their home directories.'
    ],
    firewall: [
      '# UFW: Block FTP publicly\nufw deny 21/tcp',
      '# iptables: Allow port 21 only from a secure management subnet\niptables -A INPUT -p tcp -s 192.168.1.0/24 --dport 21 -j ACCEPT\niptables -A INPUT -p tcp --dport 21 -j DROP'
    ]
  },
  22: {
    port: 22,
    service: 'SSH',
    protocol: 'TCP',
    risk: 'Medium',
    purpose: 'Secure Shell (SSH) is a cryptographic network protocol for operating network services securely over an unsecured network. It is most commonly used for remote command-line login, shell access, and secure file transfers.',
    commonServices: [
      { name: 'OpenSSH', desc: 'The premier connectivity tool for remote login with the SSH protocol.' },
      { name: 'Dropbear', desc: 'A lightweight SSH server optimized for embedded environments.' }
    ],
    risks: 'Exposed SSH ports are constantly targeted by automated brute-force scripts. Weak passwords can lead to total system compromise. Additionally, SSH key mismanagement or vulnerabilities in SSH server daemons can allow unauthorized system access.',
    cves: [
      { id: 'CVE-2024-3094', desc: 'XZ Utils Backdoor. A malicious backdoor was injected into the upstream xz compression library, which is dynamically linked by OpenSSH in several Linux distributions, allowing remote attackers to bypass SSH authentication.' },
      { id: 'CVE-2008-0166', desc: 'Debian OpenSSL Predictable PRNG. A Debian-specific package patch accidentally compromised the random number generator, resulting in predictable SSH host and user keys.' }
    ],
    hardening: [
      'Enforce Key-Based Authentication only. Disable password authentication entirely (PasswordAuthentication no).',
      'Change the default port from 22 to a non-standard port to reduce automated scan noise.',
      'Configure AllowUsers or AllowGroups to restrict who can establish remote shell sessions.'
    ],
    firewall: [
      '# UFW: Rate limit SSH connections to block brute-force networks\nufw limit 22/tcp',
      '# iptables: Allow SSH only from a specific secure IP\niptables -A INPUT -p tcp -s 203.0.113.50 --dport 22 -j ACCEPT\niptables -A INPUT -p tcp --dport 22 -j DROP'
    ]
  },
  25: {
    port: 25,
    service: 'SMTP',
    protocol: 'TCP',
    risk: 'Medium',
    purpose: 'Simple Mail Transfer Protocol (SMTP) is the standard protocol for sending email messages across the Internet. Port 25 is the default port used to route mail between mail servers (MTA to MTA).',
    commonServices: [
      { name: 'Postfix', desc: 'A popular open-source mail transfer agent designed for security and reliability.' },
      { name: 'Exim', desc: 'Default MTA on many Debian-based Linux systems.' },
      { name: 'Sendmail', desc: 'A legacy, highly configurable mail routing engine.' }
    ],
    risks: 'Public SMTP ports are targets for spam distribution, mail relay hijacking, and user enumeration. Vulnerabilities in mail parsers (such as Exim or Postfix) have historically led to pre-authentication remote code execution.',
    cves: [
      { id: 'CVE-2023-42115', desc: 'Exim Remote Code Execution. An out-of-bounds write vulnerability in the connection handling component allowed remote attackers to execute code in the context of the Exim process.' },
      { id: 'CVE-2019-10149', desc: 'The Return of the Wizard (Exim). A flaw in the deliver_message function allowed remote attackers to execute arbitrary shell commands as root.' }
    ],
    hardening: [
      'Disable open relay: Ensure the SMTP server is configured to block unauthorized third-party mail routing.',
      'Enforce TLS (opportunistic or mandatory STARTTLS) to encrypt email handshakes.',
      'Enable SPF, DKIM, and DMARC verification checks on inbound mail flows.'
    ],
    firewall: [
      '# UFW: Limit SMTP access to trusted mail exchangers\nufw allow proto tcp from 198.51.100.0/24 to any port 25',
      '# iptables: Prevent local spam bots by blocking outgoing SMTP except for root\niptables -A OUTPUT -p tcp --dport 25 -m owner --uid-owner root -j ACCEPT\niptables -A OUTPUT -p tcp --dport 25 -j DROP'
    ]
  },
  53: {
    port: 53,
    service: 'DNS',
    protocol: 'TCP/UDP',
    risk: 'Low',
    purpose: 'Domain Name System (DNS) translates human-readable hostnames (like reconshield.in) into machine-readable IP addresses. Port 53 handles standard DNS queries and zone transfers.',
    commonServices: [
      { name: 'BIND9', desc: 'The most widely used Domain Name System software on the internet.' },
      { name: 'dnsmasq', desc: 'A lightweight DNS, DHCP, and TFTP server popular in small networks.' },
      { name: 'Unbound', desc: 'A validating, recursive, and caching DNS resolver.' }
    ],
    risks: 'Misconfigured open DNS resolvers can be abused in DNS amplification distributed denial-of-service (DDoS) attacks. Zone transfers exposed on port 53 allow attackers to map out all hostnames inside a corporate domain.',
    cves: [
      { id: 'CVE-2021-25216', desc: 'BIND9 GSS-TSIG Buffer Overflow. A vulnerability in the processing of key exchange messages could allow a remote attacker to crash the named process or execute arbitrary code.' },
      { id: 'CVE-2020-25684', desc: 'Dnsmasq DNS Cache Poisoning (DNSPeeq). Multiple vulnerabilities allowed cache poisoning via birthday attacks, resulting in traffic redirection.' }
    ],
    hardening: [
      'Disable DNS zone transfers (allow-transfer { none; }) unless required for secondary servers.',
      'Disable recursion on public-facing DNS name servers (recursion no;) to prevent amplification exploits.',
      'Implement DNSSEC (Domain Name System Security Extensions) to cryptographically sign DNS records.'
    ],
    firewall: [
      '# UFW: Allow DNS requests from local subnet only\nufw allow from 192.168.1.0/24 to any port 53',
      '# iptables: Rate limit DNS queries to prevent denial-of-service\niptables -A INPUT -p udp --dport 53 -m limit --limit 15/min -j ACCEPT'
    ]
  },
  80: {
    port: 80,
    service: 'HTTP',
    protocol: 'TCP',
    risk: 'Low',
    purpose: 'Hypertext Transfer Protocol (HTTP) is the protocol used to transmit web pages and other resources. Port 80 is the default port for unencrypted web traffic.',
    commonServices: [
      { name: 'Nginx', desc: 'A high-performance HTTP server and reverse proxy.' },
      { name: 'Apache HTTP Server', desc: 'Robust, full-featured web server software.' },
      { name: 'Microsoft IIS', desc: 'Web server package for Windows operating environments.' }
    ],
    risks: 'HTTP transmits all website data, form submissions, and cookie tokens in plaintext. This makes connections highly vulnerable to eavesdropping, credential hijacking, and traffic injection by ISPs or local network attackers.',
    cves: [
      { id: 'CVE-2021-41773', desc: 'Apache HTTP Server Path Traversal. A flaw in URL normalization allowed remote attackers to read arbitrary files or execute CGI scripts via path traversal.' },
      { id: 'CVE-2022-21907', desc: 'Windows HTTP Protocol Stack RCE. A vulnerability in the HTTP.sys stack allowed unauthenticated remote code execution on Windows servers.' }
    ],
    hardening: [
      'Configure automated HTTP-to-HTTPS redirects (301 redirects) to force encryption via TLS (port 443).',
      'Add security headers (CSP, X-Frame-Options, Referrer-Policy, HSTS) in the server configuration block.',
      'Disable directory indexing (autoindex off on Nginx; Options -Indexes on Apache).'
    ],
    firewall: [
      '# UFW: Allow standard web traffic publicly\nufw allow 80/tcp',
      '# iptables: Accept incoming HTTP traffic\niptables -A INPUT -p tcp --dport 80 -m state --state NEW,ESTABLISHED -j ACCEPT'
    ]
  },
  110: {
    port: 110,
    service: 'POP3',
    protocol: 'TCP',
    risk: 'Medium',
    purpose: 'Post Office Protocol version 3 (POP3) is a standard mail protocol used by email clients to retrieve messages from a mail server. It typically deletes messages from the server once they are downloaded.',
    commonServices: [
      { name: 'Dovecot', desc: 'A secure, high-performance IMAP and POP3 server for Linux systems.' },
      { name: 'Courier-POP3D', desc: 'A lightweight, fast POP3 server daemon.' }
    ],
    risks: 'Standard POP3 on port 110 transmits email passwords and message contents in clear text. Passive sniffing on local networks or intermediate routers can expose mailbox access credentials.',
    cves: [
      { id: 'CVE-2022-2625', desc: 'Dovecot POP3 Authentication Bypass. Under specific database configurations, authentication parameters could be bypassed, letting malicious actors sign in to user mailboxes.' }
    ],
    hardening: [
      'Disable plain text POP3. Enforce POP3S (POP3 over SSL/TLS) on port 995.',
      'Configure SMTP/POP3 clients to use secure authentication mechanisms (e.g. OAuth2 or SASL GSSAPI).'
    ],
    firewall: [
      '# UFW: Block insecure POP3 traffic\nufw deny 110/tcp',
      '# iptables: Redirect traffic or drop public port 110 access\niptables -A INPUT -p tcp --dport 110 -j DROP'
    ]
  },
  143: {
    port: 143,
    service: 'IMAP',
    protocol: 'TCP',
    risk: 'Medium',
    purpose: 'Internet Message Access Protocol (IMAP) is a standard protocol used by email clients to retrieve messages from a mail server. Unlike POP3, IMAP leaves mail on the server, permitting access from multiple devices.',
    commonServices: [
      { name: 'Dovecot', desc: 'A secure, high-performance IMAP and POP3 server for Linux systems.' },
      { name: 'Courier-IMAP', desc: 'Fast, secure IMAP mail server.' }
    ],
    risks: 'IMAP traffic on port 143 is unencrypted by default. Mailboxes, folders, and access credentials can be harvested by attackers on the network path.',
    cves: [
      { id: 'CVE-2019-11500', desc: 'Dovecot Buffer Overflow. An issue in the IMAP login process allowed authenticated users to trigger memory corruption and execute arbitrary code.' }
    ],
    hardening: [
      'Disable port 143 and force IMAPS (IMAP over SSL/TLS) on port 993.',
      'Enforce strong authentication policies and limit connection counts per host IP.'
    ],
    firewall: [
      '# UFW: Deny public IMAP access\nufw deny 143/tcp',
      '# iptables: Drop all incoming TCP packets on port 143\niptables -A INPUT -p tcp --dport 143 -j DROP'
    ]
  },
  443: {
    port: 443,
    service: 'HTTPS',
    protocol: 'TCP',
    risk: 'Low',
    purpose: 'Hypertext Transfer Protocol Secure (HTTPS) is the secure version of HTTP. It uses SSL/TLS to encrypt all communications between the client browser and the server.',
    commonServices: [
      { name: 'Nginx', desc: 'A high-performance HTTP server and reverse proxy.' },
      { name: 'Apache HTTP Server', desc: 'Robust, full-featured web server software.' },
      { name: 'Cloudflare Proxy', desc: 'CDN and reverse proxy providing edge SSL termination.' }
    ],
    risks: 'Exposing port 443 is necessary for secure web servers, but configurations must be audited. Outdated TLS stacks or weak cipher suites can allow decryption of traffic or session hijacking. Vulnerabilities in HTTP parsers can also lead to remote compromises.',
    cves: [
      { id: 'CVE-2014-0160', desc: 'Heartbleed (OpenSSL). A critical vulnerability in OpenSSL allowed attackers to read memory from a connected client or server, exposing private keys and session cookies.' },
      { id: 'CVE-2022-3786', desc: 'OpenSSL Buffer Overflow. A buffer overflow vulnerability during certificate verification could be exploited to crash services or execute code.' }
    ],
    hardening: [
      'Disable TLS 1.0 and TLS 1.1. Only permit TLS 1.2 and TLS 1.3 protocols.',
      'Enforce strong modern ciphers (ECDHE-ECDSA-AES128-GCM-SHA256, etc.) and disable CBC and RC4 ciphers.',
      'Ensure HSTS header is enabled to force HTTPS connections and prevent SSL stripping.'
    ],
    firewall: [
      '# UFW: Allow secure web traffic publicly\nufw allow 443/tcp',
      '# iptables: Accept incoming HTTPS traffic\niptables -A INPUT -p tcp --dport 443 -m state --state NEW,ESTABLISHED -j ACCEPT'
    ]
  },
  3306: {
    port: 3306,
    service: 'MySQL',
    protocol: 'TCP',
    risk: 'High',
    purpose: 'MySQL is a popular open-source relational database management system. Port 3306 is the default port used by clients and applications to connect to the database server.',
    commonServices: [
      { name: 'MySQL Server', desc: 'The default Oracle-backed open source relational database server.' },
      { name: 'MariaDB', desc: 'An enterprise-grade, open-source fork of MySQL.' }
    ],
    risks: 'Exposing MySQL publicly on port 3306 is a major security risk. It invites automated brute-force attacks against database passwords. Any SQL injection or authentication bypass vulnerability can lead to direct database compromise or server control.',
    cves: [
      { id: 'CVE-2012-2122', desc: 'MySQL Password Authentication Bypass. A critical flaw in the authentication protocol allowed remote attackers to sign in to MySQL servers without knowing the password simply by repeating connection attempts.' },
      { id: 'CVE-2021-27928', desc: 'MariaDB Privilege Escalation. An arbitrary library loading vulnerability allowed authenticated attackers to run code on the system with root privileges.' }
    ],
    hardening: [
      'Bind MySQL to localhost (bind-address = 127.0.0.1) so it does not listen on the public network interface.',
      'Require SSL/TLS encryption for all remote database connections.',
      'Enforce strict password complexity rules and rename or remove default admin account names.'
    ],
    firewall: [
      '# UFW: Deny database access to the public internet\nufw deny 3306/tcp',
      '# iptables: Allow MySQL only from a specific secure application server IP\niptables -A INPUT -p tcp -s 192.168.1.100 --dport 3306 -j ACCEPT\niptables -A INPUT -p tcp --dport 3306 -j DROP'
    ]
  },
  3389: {
    port: 3389,
    service: 'RDP',
    protocol: 'TCP',
    risk: 'Critical',
    purpose: 'Remote Desktop Protocol (RDP) is a proprietary protocol developed by Microsoft, which provides a user with a graphical interface to connect to another computer over a network connection.',
    commonServices: [
      { name: 'TermService', desc: 'Microsoft Windows Terminal Services for remote desktop access.' },
      { name: 'XRDP', desc: 'An open-source remote desktop protocol server for Linux environments.' }
    ],
    risks: 'RDP is one of the most heavily targeted ports on the internet. Automated scripts brute-force RDP connections to gain server entry. Historical flaws in the RDP stack (like BlueKeep) permit remote code execution without authentication.',
    cves: [
      { id: 'CVE-2019-0708', desc: 'BlueKeep. A critical remote code execution vulnerability in Remote Desktop Services allowed unauthenticated attackers to execute arbitrary code with SYSTEM privileges on vulnerable systems.',
        remediation: 'Disable RDP publicly, deploy patch KB4499175 immediately, and enforce Network Level Authentication (NLA).'
      },
      { id: 'CVE-2019-1181', desc: 'DejaBlue. A remote code execution vulnerability in Remote Desktop Services that operates similarly to BlueKeep, affecting newer Windows editions.' }
    ],
    hardening: [
      'Require Network Level Authentication (NLA) (RequireSecureRPC / enforce NLA).',
      'Expose RDP only via a VPN or RD Gateway, never directly to the public internet.',
      'Deploy account lockout policies to lock user IDs after a set number of failed login attempts.'
    ],
    firewall: [
      '# UFW: Block RDP publicly\nufw deny 3389/tcp',
      '# iptables: Accept RDP only from a secure management IP address\niptables -A INPUT -p tcp -s 203.0.113.100 --dport 3389 -j ACCEPT\niptables -A INPUT -p tcp --dport 3389 -j DROP'
    ]
  },
  5432: {
    port: 5432,
    service: 'PostgreSQL',
    protocol: 'TCP',
    risk: 'High',
    purpose: 'PostgreSQL is an advanced, enterprise-class open-source object-relational database system. Port 5432 is the default port used by PostgreSQL database engines.',
    commonServices: [
      { name: 'PostgreSQL Server', desc: 'Enterprise relational database engine.' }
    ],
    risks: 'Direct public exposure of PostgreSQL database servers on port 5432 leads to SQL brute-forcing, password sniffing, and exploitation of query execution vulnerabilities (e.g. COPY FROM PROGRAM abuse).',
    cves: [
      { id: 'CVE-2019-10208', desc: 'PostgreSQL Privilege Escalation. A flaw in pg_dumpall allowed authenticated database administrators to run arbitrary commands on the system root namespace.' },
      { id: 'CVE-2013-1899', desc: 'PostgreSQL Connection File Corruption. Attackers could send connection requests with specific characters to corrupt or write files, causing database crashes.' }
    ],
    hardening: [
      'Bind database listener to the localhost interface (listen_addresses = "localhost").',
      'Use pg_hba.conf to whitelist specific client IPs and enforce trust authentication filters (md5, scram-sha-256).',
      'Require SSL connections (ssl = on) to prevent credential sniffing on the wire.'
    ],
    firewall: [
      '# UFW: Disable public PostgreSQL traffic\nufw deny 5432/tcp',
      '# iptables: Limit port 5432 connections to secure application servers\niptables -A INPUT -p tcp -s 10.0.0.50 --dport 5432 -j ACCEPT\niptables -A INPUT -p tcp --dport 5432 -j DROP'
    ]
  }
};
