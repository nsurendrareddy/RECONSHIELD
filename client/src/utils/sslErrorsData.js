// ReconShield SSL Errors SEO Data
// Provides comprehensive security analysis, browser error profiles, resolution steps, and FAQs.

export const SSL_ERRORS_DATA = {
  'err_cert_date_invalid': {
    name: "ERR_CERT_DATE_INVALID",
    title: "ERR_CERT_DATE_INVALID – SSL/TLS Certificate Expiry & Resolution Guide",
    description: "Detailed troubleshooting guide for the ERR_CERT_DATE_INVALID browser error. Learn why certificates expire, associated MITM security risks, and how to fix it.",
    content: `
## What is the ERR_CERT_DATE_INVALID Error?
The **ERR_CERT_DATE_INVALID** error is a browser warning indicating that the website's SSL/TLS certificate is either expired or not yet active. When a browser initiates a secure handshake, it inspects the certificate's validity period. If the current system time falls outside the certificate's "Not Before" or "Not After" timestamps, the browser blocks the connection to prevent data interception.

## Common Root Causes
This error can result from server-side configurations or client-side issues:
* **Expired Server Certificate:** The website administrator failed to renew the SSL certificate before its scheduled expiry.
* **Incorrect Client System Clock:** The user's device clock is set to the wrong date or time, making a valid certificate appear invalid.
* **ACME Renewal Failures:** Automated certificate renew scripts (like Let's Encrypt cron jobs) failed due to firewall blocks, rate limiting, or DNS changes.

## Security Implications: The Threat of MITM Attacks
While often a harmless administrative slip-up, an expired certificate presents real security risks:
* **Man-in-the-Middle (MITM) Interception:** If a certificate is expired, browsers cannot verify the server's identity. Attackers can hijack the connection, present their own expired or forged certificates, and decrypt traffic.
* **Loss of Brand Integrity:** Visitors are greeted with a full-screen browser warning, severely damaging user trust and increasing bounce rates.
* **Weakened Encryption Standards:** Expired certificates may rely on older, vulnerable cipher suites that have since been deprecated.

## Step-by-Step Resolution Guide
### For Server Administrators:
1. **Trigger Manual ACME Renewal:** Run \`certbot renew\` or equivalent to force certificate reissue.
2. **Verify the Certificate Chain:** Use the ReconShield SSL Checker to verify that the root and intermediate certificates are correctly chained.
3. **Automate Monitoring:** Implement automated monitoring alerts that flag upcoming certificate expiries 30, 14, and 7 days in advance.

### For End-Users:
1. **Sync Device Clock:** Go to settings and enable automatic time synchronization via network time servers (NTP).
2. **Clear Browser Cache:** Expired SSL states can be cached. Clear browser cache or open the site in an Incognito window.
3. **Disable VPN/Proxy:** Some local proxies inject expired self-signed certificates for traffic inspection.
    `,
    faqs: [
      { q: "What does ERR_CERT_DATE_INVALID mean?", a: "It means the SSL/TLS certificate of the website has expired or is not yet valid based on the current system time." },
      { q: "Is it safe to bypass this error and proceed to the site?", a: "No. Bypassing this warning exposes you to potential Man-in-the-Middle attacks where an attacker can capture your login credentials." },
      { q: "Why did my certificate expire if I set up automatic renewal?", a: "Common causes include blocked HTTP challenges (Port 80 closed), changed DNS records, or failing ACME cron jobs." },
      { q: "How do I check a certificate's expiration date?", a: "You can click the padlock icon in the browser address bar, view certificate details, or run a query using the ReconShield SSL Checker." },
      { q: "Can a bad client-side clock cause this error?", a: "Yes. If your device's date is set incorrectly, the browser will miscalculate the certificate's validity window and trigger the warning." }
    ],
    relatedTools: ['ssl-checker', 'vulnerability-scanner', 'dns-lookup']
  },
  'err_ssl_protocol_error': {
    name: "ERR_SSL_PROTOCOL_ERROR",
    title: "ERR_SSL_PROTOCOL_ERROR – TLS Handshake Failures & Security Defenses",
    description: "Analyze the ERR_SSL_PROTOCOL_ERROR. Discover common causes of handshake failures, protocol mismatches, and how to configure secure server TLS bindings.",
    content: `
## What is the ERR_SSL_PROTOCOL_ERROR?
The **ERR_SSL_PROTOCOL_ERROR** (often displayed as 'This site can’t provide a secure connection') occurs when the browser and the web server fail to establish a secure SSL/TLS handshake. It indicates a fundamental communication mismatch between the client's requested encryption protocols and the server's supported parameters.

## Primary Root Causes
* **Protocol Version Mismatch:** The browser supports modern protocols (TLS 1.2/1.3) but the legacy server only supports deprecated, insecure protocols (SSLv3 or TLS 1.0) that the browser has disabled.
* **Cipher Suite Conflicts:** The client and server do not share a common cryptographic cipher suite, preventing them from agreeing on encryption parameters.
* **Server Binding Configuration Errors:** The server is configured to listen on port 443 but returns unencrypted HTTP responses instead of initiating a TLS handshake.
* **Traffic Inspection Interceptions:** Local antivirus software, parental controls, or network firewalls intercepting traffic can corrupt TLS frames.

## Security Context of Handshake Failures
Handshake failures are key indicators of network issues or security tampering:
* **Downgrade Attack Detection:** Modern browsers trigger protocol errors to block downgrade attacks, where attackers attempt to force legacy protocols to exploit cryptographic weaknesses.
* **Insecure Legacy Infrastructure:** The error highlights legacy servers that fail to maintain compliance standards (like PCI-DSS) by continuing to use deprecated protocols.

## How to Fix ERR_SSL_PROTOCOL_ERROR
### For Server Administrators:
1. **Enable Modern TLS Protocols:** Update your web server configuration (Nginx, Apache, IIS) to enable TLS 1.2 and TLS 1.3, and disable SSLv3, TLS 1.0, and TLS 1.1.
2. **Review Port Bindings:** Ensure that port 443 has SSL enabled in server blocks (e.g., \`listen 443 ssl;\` in Nginx).
3. **Verify Cipher Configurations:** Configure secure, modern cipher suites prioritizing Forward Secrecy (ECDHE).

### For End-Users:
1. **Disable Browser Extensions:** Security or ad-blocking extensions can interfere with SSL/TLS negotiation.
2. **Check System Antivirus Settings:** Temporarily disable 'HTTPS Scanning' or 'SSL Inspection' features in local security software.
3. **Clear SSL State:** In Windows settings, search for 'Internet Options', navigate to the 'Content' tab, and click 'Clear SSL State'.
    `,
    faqs: [
      { q: "What does ERR_SSL_PROTOCOL_ERROR mean?", a: "It indicates a failure to establish a secure connection (TLS handshake) between your browser and the web server." },
      { q: "Why does this error occur on old servers?", a: "Older servers often only support deprecated protocols like TLS 1.0/1.1 or legacy ciphers, which modern browsers actively block." },
      { q: "How do I fix this error in Nginx?", a: "Ensure you have `ssl` enabled on your listening port and that `ssl_protocols TLSv1.2 TLSv1.3;` is correctly defined in your configuration." },
      { q: "Can a local antivirus trigger this protocol error?", a: "Yes. Antivirus software that performs SSL inspection can corrupt TLS handshakes, triggering browser blocks." },
      { q: "What is an SSL handshake?", a: "The initial negotiation phase of a secure connection where the client and server agree on protocol versions, ciphers, and exchange public keys." }
    ],
    relatedTools: ['ssl-checker', 'port-scanner', 'http-headers']
  },
  'err_cert_authority_invalid': {
    name: "ERR_CERT_AUTHORITY_INVALID",
    title: "ERR_CERT_AUTHORITY_INVALID – Untrusted CAs, Self-Signed Certs & Mitigations",
    description: "Detailed analysis of the ERR_CERT_AUTHORITY_INVALID error. Learn about certificate trust chains, self-signed certificates, and CA validation rules.",
    content: `
## What is the ERR_CERT_AUTHORITY_INVALID Error?
The **ERR_CERT_AUTHORITY_INVALID** warning (often styled as 'Your connection is not private') occurs when the browser cannot establish a chain of trust between the website's SSL certificate and a trusted Root Certificate Authority (CA) pre-installed in the operating system's trust store.

## Common Root Causes
* **Self-Signed Certificates:** The website uses a certificate generated by its own administrator rather than an accredited public CA.
* **Missing Intermediate Certificates:** The server is only serving the leaf certificate, neglecting to bundle the intermediate certificates necessary to link back to the Root CA.
* **Untrusted Root CA:** The certificate was issued by an ad-hoc or private CA that is not registered in major browser trust programs (e.g., Apple, Google, Microsoft, Mozilla).
* **Network Interception (MITM):** An attacker or local proxy is intercepting the connection and injecting a rogue certificate.

## The Danger of Self-Signed Certificates in Production
Self-signed certificates are acceptable in isolated development environments, but represent severe vulnerabilities in production:
* **No Identity Verification:** Self-signed certificates cannot prove identity, making it easy for attackers to clone pages and harvest credentials.
* **Normalizing Warnings:** Forcepting users to bypass security warnings conditions them to ignore browser defenses, making them vulnerable to active phishing attacks.
* **Compliance Failures:** Organizations using untrusted certificates will fail security compliance reviews under SOC2, ISO27001, and PCI-DSS frameworks.

## Resolution Guide
### For Server Administrators:
1. **Acquire a Publicly Trusted Certificate:** Use a trusted CA like Let's Encrypt, DigiCert, or Sectigo to issue a valid certificate.
2. **Configure Full-Chain Certificate Bundling:** Always configure your server to return the complete certificate chain (leaf plus intermediate certificates). In Nginx, use the \`fullchain.pem\` file.
3. **Implement CAA Records:** Add Certification Authority Authorization (CAA) DNS records to specify which CAs are permitted to issue certificates for your domain.

### For End-Users:
1. **Avoid Bypassing the Warning:** Do not proceed to sites displaying this error, especially on public Wi-Fi networks.
2. **Inspect Certificate Details:** Click the warning details and check the "Issued By" field to identify if it is self-signed or issued by a rogue local proxy.
    `,
    faqs: [
      { q: "What does ERR_CERT_AUTHORITY_INVALID mean?", a: "It means the website's SSL certificate was issued by an entity that is not trusted by your browser's root store." },
      { q: "Why are self-signed certificates untrusted?", a: "Anyone can generate a self-signed certificate, meaning there is no third-party verification to guarantee the domain owner's identity." },
      { q: "How do I fix a missing intermediate certificate error?", a: "You must configure your web server to serve the full certificate chain (leaf + intermediate certs) instead of just the domain certificate." },
      { q: "Can public Wi-Fi networks trigger this authority error?", a: "Yes. Captive portals on public Wi-Fi often redirect traffic or inject self-signed certificates to display login pages, triggering browser warnings." },
      { q: "What is the browser root store?", a: "A pre-installed database of trusted Root Certificate Authorities that operating systems and browsers use to validate certificate authenticity." }
    ],
    relatedTools: ['ssl-checker', 'dns-lookup', 'vulnerability-scanner']
  },
  'net_err_cert_common_name_invalid': {
    name: "NET::ERR_CERT_COMMON_NAME_INVALID",
    title: "NET::ERR_CERT_COMMON_NAME_INVALID – Domain Mismatch & SAN Alignment Guides",
    description: "Understand the common name mismatch error (ERR_CERT_COMMON_NAME_INVALID), how browsers validate hostnames, and how to align SAN properties.",
    content: `
## What is the NET::ERR_CERT_COMMON_NAME_INVALID Error?
The **NET::ERR_CERT_COMMON_NAME_INVALID** error (also referred to as a SSL Domain Mismatch) indicates that the domain name in the browser's address bar does not match any of the hostnames listed in the website's SSL/TLS certificate. Browsers strictly enforce hostname matching to ensure that you are connecting to the legitimate server rather than an unauthorized redirect.

## Primary Root Causes
* **Missing Wildcard Coverage:** A certificate is valid for the root domain (example.com) but not for subdomains (such as blog.example.com), and the admin neglected to acquire a wildcard certificate (*.example.com).
* **Missing SAN (Subject Alternative Name) Configuration:** The certificate only covers the 'www' version (www.example.com) but not the bare root (example.com), or vice-versa.
* **Shared IP Configuration Issues:** The website is hosted on a shared server where the web server serves the default SSL certificate of a different client site instead of the target site's certificate.
* **DNS Resolution Typos:** A DNS record points to the wrong IP, routing the browser to an entirely different server.

## Security Risks of Domain Mismatches
Hostname alignment is a core security boundary:
* **Redirect Hijackings:** Attackers intercepting DNS queries can redirect domains to their servers. If hostnames do not align, browsers block the connection, preventing credential harvesting.
* **Data Leakage Warnings:** Entering credentials on a mismatched domain runs the risk of sending sensitive data to unauthorized third-party hosting tenants.

## How to Fix Domain Mismatch Errors
### For Server Administrators:
1. **Audit Subject Alternative Names (SANs):** When generating a Certificate Signing Request (CSR), ensure all domain variations (root, www, and subdomains) are listed in the SAN extension.
2. **Deploy Wildcard Certificates:** Use wildcard certificates (*.example.com) to secure all first-level subdomains automatically.
3. **Configure SNI (Server Name Indication):** Ensure your web server configuration has SNI enabled so it serves the correct SSL certificate corresponding to each virtual host query.

### For End-Users:
1. **Verify the URL Syntax:** Check if adding or removing the 'www' prefix bypasses the error, indicating a configuration gap on the administrator's side.
    `,
    faqs: [
      { q: "What does ERR_CERT_COMMON_NAME_INVALID mean?", a: "It means the domain name you are trying to visit does not match any of the hostnames authorized in the website's SSL certificate." },
      { q: "What is SAN in an SSL certificate?", a: "Subject Alternative Name (SAN) is an extension that allows multiple domain names and subdomains to be secured by a single certificate." },
      { q: "Does a certificate for example.com automatically cover www.example.com?", a: "No. Both domains must be explicitly listed in the certificate's SAN properties to be considered valid." },
      { q: "How do I fix a domain mismatch error in Apache?", a: "Ensure that each `<VirtualHost>` block has SNI enabled and points to the correct, dedicated `SSLCertificateFile` for its domain." },
      { q: "What is the Common Name (CN) field?", a: "An older field in SSL certificates representing the primary hostname. It has been replaced by the SAN extension in modern standards." }
    ],
    relatedTools: ['ssl-checker', 'subdomain-finder', 'dns-lookup']
  }
};
