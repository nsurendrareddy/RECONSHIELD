"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Terminal, Shield, ArrowLeft, Code2, BookOpen, Layers, CheckCircle } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

const API_ENDPOINTS = [
  {
    id: 'ssl',
    name: 'SSL Checker API',
    method: 'GET',
    path: '/api/v1/ssl',
    desc: 'Retrieve certificate configurations, TLS protocol alignments, cipher suites, and validation status.',
    params: [
      { name: 'domain', type: 'string', required: true, desc: 'Target domain (e.g. google.com) to audit.' }
    ],
    response: `{
  "status": "success",
  "data": {
    "domain": "example.com",
    "grade": "A+",
    "certificate": {
      "issuer": "DigiCert TLS RSA SHA256 2020 CA1",
      "expiry": "2027-04-12T12:00:00Z",
      "valid": true
    },
    "protocols": {
      "tls13": true,
      "tls12": true,
      "tls10": false
    }
  }
}`,
    examples: {
      curl: `curl -H "Authorization: Bearer YOUR_API_KEY" \\
  "https://reconshield.in/api/v1/ssl?domain=example.com"`,
      js: `fetch('https://reconshield.in/api/v1/ssl?domain=example.com', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})
  .then(res => res.json())
  .then(data => console.log(data));`,
      python: `import requests

headers = {
    "Authorization": "Bearer YOUR_API_KEY"
}
response = requests.get(
    "https://reconshield.in/api/v1/ssl?domain=example.com",
    headers=headers
)
print(response.json())`
    }
  },
  {
    id: 'subdomains',
    name: 'Subdomain Finder API',
    method: 'GET',
    path: '/api/v1/subdomains',
    desc: 'Extract indexed subdomains and active records harvested from Certificate Transparency logs.',
    params: [
      { name: 'domain', type: 'string', required: true, desc: 'Root domain (e.g. github.com) to search.' }
    ],
    response: `{
  "status": "success",
  "data": {
    "domain": "example.com",
    "count": 3,
    "subdomains": [
      { "name": "www.example.com", "ip": "93.184.216.34" },
      { "name": "api.example.com", "ip": "93.184.216.35" },
      { "name": "dev.example.com", "ip": "127.0.0.1" }
    ]
  }
}`,
    examples: {
      curl: `curl -H "Authorization: Bearer YOUR_API_KEY" \\
  "https://reconshield.in/api/v1/subdomains?domain=example.com"`,
      js: `fetch('https://reconshield.in/api/v1/subdomains?domain=example.com', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})
  .then(res => res.json())
  .then(data => console.log(data));`,
      python: `import requests

headers = {
    "Authorization": "Bearer YOUR_API_KEY"
}
response = requests.get(
    "https://reconshield.in/api/v1/subdomains?domain=example.com",
    headers=headers
)
print(response.json())`
    }
  },
  {
    id: 'ports',
    name: 'Port Scanner API',
    method: 'GET',
    path: '/api/v1/ports',
    desc: 'Passively list active TCP ports and service identifiers detected on the target interface.',
    params: [
      { name: 'host', type: 'string', required: true, desc: 'Target IPv4 host address or domain to analyze.' }
    ],
    response: `{
  "status": "success",
  "data": {
    "host": "93.184.216.34",
    "open_ports": [
      { "port": 80, "service": "http" },
      { "port": 443, "service": "https" }
    ]
  }
}`,
    examples: {
      curl: `curl -H "Authorization: Bearer YOUR_API_KEY" \\
  "https://reconshield.in/api/v1/ports?host=93.184.216.34"`,
      js: `fetch('https://reconshield.in/api/v1/ports?host=93.184.216.34', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})
  .then(res => res.json())
  .then(data => console.log(data));`,
      python: `import requests

headers = {
    "Authorization": "Bearer YOUR_API_KEY"
}
response = requests.get(
    "https://reconshield.in/api/v1/ports?host=93.184.216.34",
    headers=headers
)
print(response.json())`
    }
  },
  {
    id: 'headers',
    name: 'Headers Grader API',
    method: 'GET',
    path: '/api/v1/headers',
    desc: 'Audit security header configurations and calculate target grades.',
    params: [
      { name: 'domain', type: 'string', required: true, desc: 'Domain URL to audit for header configurations.' }
    ],
    response: `{
  "status": "success",
  "data": {
    "domain": "example.com",
    "grade": "B",
    "headers": {
      "Content-Security-Policy": "missing",
      "Strict-Transport-Security": "present",
      "X-Frame-Options": "SAMEORIGIN"
    }
  }
}`,
    examples: {
      curl: `curl -H "Authorization: Bearer YOUR_API_KEY" \\
  "https://reconshield.in/api/v1/headers?domain=example.com"`,
      js: `fetch('https://reconshield.in/api/v1/headers?domain=example.com', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})
  .then(res => res.json())
  .then(data => console.log(data));`,
      python: `import requests

headers = {
    "Authorization": "Bearer YOUR_API_KEY"
}
response = requests.get(
    "https://reconshield.in/api/v1/headers?domain=example.com",
    headers=headers
)
print(response.json())`
    }
  }
];

export default function ApiDocsPage() {
  const [activeTab, setActiveTab] = useState('curl');

  return (
    <div className="bg-[#05080f] min-h-screen text-white pb-24">
      <div className="max-w-5xl mx-auto px-4 pt-8">
        
        <Breadcrumbs crumbs={[
          { label: 'Developers', href: '/developers' },
          { label: 'API Reference', href: '/api-docs' }
        ]} />

        {/* Back navigation */}
        <Link href="/developers" className="inline-flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-[#00ff88] transition-colors mb-8 mt-6">
          <ArrowLeft className="w-4 h-4" /> Back to Developer Portal
        </Link>

        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-12">
          <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-4">
            REST API Reference (v1)
          </h1>
          <p className="text-gray-400 text-base max-w-3xl leading-relaxed">
            Reference definitions and request templates for all passive ReconShield security check systems.
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest">// Endpoints</h3>
            <div className="flex flex-col gap-2">
              {API_ENDPOINTS.map((endpoint) => (
                <a 
                  key={endpoint.id} 
                  href={`#${endpoint.id}`}
                  className="px-3 py-2 rounded-xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 text-xs font-mono text-gray-400 hover:text-white transition-all flex items-center justify-between"
                >
                  <span>{endpoint.name}</span>
                  <span className="text-[9px] px-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-bold uppercase">GET</span>
                </a>
              ))}
            </div>
          </div>

          {/* Reference Body */}
          <div className="lg:col-span-3 space-y-16">
            
            {/* Auth documentation */}
            <section className="p-6 rounded-2xl bg-[#0d1117] border border-white/5 space-y-4">
              <h2 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-400" />
                Authentication
              </h2>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Authenticate your API requests by including your API token in the <code>Authorization</code> header using the Bearer schema.
              </p>
              <pre className="p-3 bg-black rounded text-[11px] font-mono text-gray-400 border border-white/5">
                Authorization: Bearer YOUR_API_KEY
              </pre>
            </section>

            {/* Code Selector Tab */}
            <div className="flex justify-end gap-2 border-b border-white/5 pb-4">
              {['curl', 'js', 'python'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono border cursor-pointer ${
                    activeTab === tab 
                      ? 'bg-[#00ff88]/10 text-[#00ff88] border-[#00ff88]/20' 
                      : 'bg-[#0d1117] text-gray-500 border-white/5 hover:text-white'
                  }`}
                >
                  {tab === 'js' ? 'JavaScript' : tab === 'python' ? 'Python' : 'curl'}
                </button>
              ))}
            </div>

            {/* Endpoints Documentation */}
            {API_ENDPOINTS.map((endpoint) => (
              <section key={endpoint.id} id={endpoint.id} className="space-y-6 scroll-mt-24">
                
                {/* Method path */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-2 py-1 bg-emerald-500/10 text-[#00ff88] border border-[#00ff88]/20 rounded-md font-mono text-xs font-bold">{endpoint.method}</span>
                  <span className="font-mono text-base font-bold text-white">{endpoint.path}</span>
                </div>

                <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-sans">{endpoint.desc}</p>

                {/* Parameters */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest">Query Parameters</h4>
                  <div className="border border-white/5 rounded-2xl overflow-hidden bg-[#0d1117]">
                    {endpoint.params.map((param, pIdx) => (
                      <div key={pIdx} className="p-4 border-b border-white/5 last:border-0 flex flex-col md:flex-row justify-between md:items-center text-xs font-mono">
                        <div>
                          <span className="font-bold text-[#00ff88]">{param.name}</span>
                          <span className="text-[10px] text-gray-500 ml-2">({param.type})</span>
                          {param.required && <span className="text-[9px] px-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded ml-2 uppercase font-bold">required</span>}
                        </div>
                        <p className="text-gray-400 font-sans mt-1 md:mt-0 text-[11px] max-w-md">{param.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Code switcher view */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest">Request Example</h4>
                  <pre className="p-4 bg-black rounded-2xl text-[11px] font-mono text-[#00ff88] border border-white/5 overflow-x-auto whitespace-pre">
                    {endpoint.examples[activeTab]}
                  </pre>
                </div>

                {/* Response payload */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest">Response Example (200 OK)</h4>
                  <pre className="p-4 bg-black rounded-2xl text-[11px] font-mono text-gray-400 border border-white/5 overflow-x-auto whitespace-pre">
                    {endpoint.response}
                  </pre>
                </div>

              </section>
            ))}

            {/* Collapsed OpenAPI schema */}
            <section className="p-6 rounded-2xl bg-[#0d1117]/50 border border-white/5 space-y-4">
              <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">OpenAPI 3.0.0 Specifications</h3>
              <details className="cursor-pointer group">
                <summary className="text-xs font-mono text-cyan-400 group-hover:underline select-none">
                  Click to expand OpenAPI JSON Schema Descriptor
                </summary>
                <pre className="p-4 bg-black rounded-2xl text-[10px] font-mono text-gray-500 border border-white/5 overflow-x-auto mt-4 whitespace-pre">
{`{
  "openapi": "3.0.0",
  "info": {
    "title": "ReconShield Security APIs",
    "version": "1.0.0"
  },
  "servers": [
    { "url": "https://reconshield.in/api/v1" }
  ],
  "paths": {
    "/ssl": {
      "get": {
        "summary": "SSL/TLS assessment",
        "parameters": [
          { "name": "domain", "in": "query", "required": true, "schema": { "type": "string" } }
        ]
      }
    }
  }
}`}
                </pre>
              </details>
            </section>

          </div>

        </div>

      </div>
    </div>
  );
}
