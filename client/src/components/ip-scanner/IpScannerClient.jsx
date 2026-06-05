'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, Shield, MapPin, Globe, Server, Lock, 
  Terminal, AlertTriangle, CheckCircle, Activity,
  Cpu, ExternalLink, Zap, Info, Layers, Eye
} from 'lucide-react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { API_BASE } from '@/utils/api'

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const MapUpdater = dynamic(() => Promise.resolve(({ center }) => {
  const { useMap } = require('react-leaflet');
  const map = useMap();
  useEffect(() => {
    if (center && center[0] !== 0 && center[1] !== 0) {
      map.flyTo(center, 13, { animate: true, duration: 1.5 });
    }
  }, [center, map]);
  return null;
}), { ssr: false });

import ScanTerminalLog from '@/components/ip-scanner/ScanTerminalLog'

export default function IpScannerClient() {
  const [target, setTarget] = useState('')
  const [scanning, setScanning] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [lastTarget, setLastTarget] = useState('')
  const [isGps, setIsGps] = useState(false)
  const [L, setL] = useState(null)

  useEffect(() => {
    // Import leaflet and its styles only on client
    import('leaflet/dist/leaflet.css');
    import('leaflet').then(leaflet => {
      setL(leaflet.default);
      // Fix for default marker icons
      delete leaflet.default.Icon.Default.prototype._getIconUrl;
      leaflet.default.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });
    });
  }, []);

  const handleGps = () => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }
    setScanning(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setData(prev => ({
          ...prev,
          ip_info: {
            ...prev?.ip_info,
            lat: latitude,
            lon: longitude,
            city: "Current Location",
            country: "Verified via GPS"
          }
        }));
        setIsGps(true);
        setScanning(false);
      },
      (err) => {
        setError("GPS access denied or unavailable");
        setScanning(false);
      }
    );
  };

  const handleMyIp = async () => {
    try {
      setScanning(true);
      const res = await fetch('https://api.ipify.org?format=json');
      const data = await res.json();
      setTarget(data.ip);
      setTimeout(() => {
        handleScan(null, data.ip);
      }, 100);
    } catch (err) {
      setError("Could not detect your IP");
      setScanning(false);
    }
  };

  const handleScan = async (e, forcedTarget) => {
    if (e) e.preventDefault()
    const targetToScan = forcedTarget || target;
    if (!targetToScan) return
    
    setScanning(true)
    setError(null)
    setLastTarget(targetToScan)

    try {
      const response = await fetch(`${API_BASE}/ip-scanner`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target: targetToScan })
      })
      
      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.detail || 'Scan failed')
      }
      
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setScanning(false)
    }
  }

  const getRiskColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'critical': return 'text-red-500 bg-red-500/10 border-red-500/20'
      case 'high': return 'text-orange-500 bg-orange-500/10 border-orange-500/20'
      case 'medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20'
      case 'low': return 'text-blue-500 bg-blue-500/10 border-blue-500/20'
      default: return 'text-matrix-400 bg-matrix-400/10 border-matrix-400/20'
    }
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="relative">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-matrix-400/5 rounded-full blur-3xl -z-10" />
        <div className="flex flex-col items-center text-center gap-8 mb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-matrix-400 font-mono text-xs uppercase tracking-[0.2em] bg-matrix-400/5 px-3 py-1 rounded-full border border-matrix-400/10">
              <Zap className="w-3.5 h-3.5" />
              <span>Advanced infrastructure visibility</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white">
              IP <span className="text-glow-green text-matrix-400">Intelligence</span> Scanner
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Comprehensive security configuration analysis and passive footprinting for any IP address or domain.
              Analyze infrastructure, security headers, and threat reputation in real-time.
            </p>
          </div>

          <form onSubmit={handleScan} className="w-full max-w-2xl relative group">
            <div className="absolute inset-0 bg-matrix-400/20 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 -z-10" />
            <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-2 rounded-2xl bg-surface-900 border border-white/10 focus-within:border-matrix-400/50 transition-all shadow-lg min-h-[64px]">
              <div className="flex-1 flex items-center gap-3 px-4 min-h-[48px]">
                <Search className="w-5 h-5 text-gray-500 shrink-0" />
                <input
                  type="text"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  placeholder="Enter IP address or domain to analyze..."
                  className="w-full bg-transparent border-none outline-none text-white placeholder-gray-500 text-base font-mono"
                  disabled={scanning}
                />
              </div>
              
              <div className="flex items-center justify-between sm:justify-end gap-3 px-3 sm:px-0">
                <div className="flex items-center gap-1.5">
                  <button 
                    type="button"
                    onClick={handleGps}
                    className="p-3 hover:bg-white/5 rounded-xl text-gray-400 hover:text-matrix-400 transition-colors"
                    title="Use Browser GPS"
                  >
                    <Activity className="w-4 h-4" />
                  </button>
                  <button 
                    type="button"
                    onClick={handleMyIp}
                    className="p-3 hover:bg-white/5 rounded-xl text-gray-400 hover:text-matrix-400 transition-colors"
                    title="Scan My IP"
                  >
                    <MapPin className="w-4 h-4" />
                  </button>
                </div>
                
                <button
                  disabled={scanning}
                  type="submit"
                  className="flex-1 sm:flex-none px-8 py-3 bg-matrix-400 hover:bg-matrix-300 text-surface-950 rounded-xl font-bold text-xs uppercase tracking-widest disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,255,136,0.3)] hover:shadow-[0_0_25px_rgba(0,255,136,0.5)] cursor-pointer"
                >
                  {scanning ? <Activity className="w-4 h-4 animate-spin text-surface-950" /> : <Shield className="w-4 h-4 text-surface-950" />}
                  <span>{scanning ? 'Scanning...' : 'Scan'}</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* What You Get Section */}
        <div className="mt-10 flex flex-col items-center">
          <h2 className="font-mono text-[10px] tracking-[3px] uppercase text-[#94a3b8] mb-4">// INTELLIGENCE COLLECTED</h2>
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
            {[
              'ISP / Hosting Provider', 'ASN Number', 'Country & City', 
              'Abuse Confidence Score', 'Blocklist Presence', 'Reverse DNS', 
              'Proxy / VPN Detection', 'Threat Tags'
            ].map((p, i) => (
              <div key={i} className="px-3.5 py-2 bg-[#0d1117] border border-[#1a2332] rounded-full flex items-center gap-2 hover:border-[#00ff88]/30 transition-all duration-300">
                <span className="text-[#00ff8866] text-[10px]">▸</span>
                <span className="font-mono text-[11px] text-[#64748b]">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 text-sm font-medium"
        >
          <AlertTriangle className="w-4 h-4" />
          {error}
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-6">
          <ScanTerminalLog scanning={scanning} data={data} target={lastTarget} />
          
          <div className="terminal-card overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/5 bg-surface-900/50">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-matrix-400" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Geolocation Vector</span>
              </div>
            </div>
            <div className="h-[300px] w-full bg-surface-950 grayscale hover:grayscale-0 transition-all duration-700">
              {MapContainer && (
                <MapContainer 
                  center={[39.03, -77.5]} 
                  zoom={2} 
                  style={{ height: '100%', width: '100%' }}
                  zoomControl={false}
                >
                  <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                  {(data?.ip_info?.lat || isGps) && (
                    <>
                      <MapUpdater center={[data.ip_info.lat, data.ip_info.lon]} />
                      <Marker position={[data.ip_info.lat, data.ip_info.lon]}>
                        <Popup>
                          <div className="font-mono text-xs">
                            <p className="font-bold text-matrix-400">{data.ip_info.ip || 'Local Node'}</p>
                            <p>{data.ip_info.city}, {data.ip_info.country}</p>
                          </div>
                        </Popup>
                      </Marker>
                    </>
                  )}
                </MapContainer>
              )}
            </div>
            <div className="p-4 grid grid-cols-2 gap-4 bg-surface-900/30">
               <div className="space-y-1">
                 <p className="text-[10px] text-gray-500 font-mono uppercase">Latitude</p>
                 <p className="text-xs font-mono text-gray-300">{data?.ip_info?.lat || '---'}</p>
               </div>
               <div className="space-y-1">
                 <p className="text-[10px] text-gray-500 font-mono uppercase">Longitude</p>
                 <p className="text-xs font-mono text-gray-300">{data?.ip_info?.lon || '---'}</p>
               </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <AnimatePresence mode="wait">
            {!data && !scanning ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-[600px] flex flex-col items-center justify-center text-center p-12 border border-dashed border-white/10 rounded-3xl"
              >
                <div className="w-20 h-20 rounded-full bg-matrix-400/5 flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-matrix-400/30" />
                </div>
                <h3 className="text-xl font-display font-bold mb-2">Awaiting Target</h3>
                <p className="text-gray-500 max-w-xs text-sm">
                  Initialize a scan to begin infrastructure visibility. All data is collected passively without direct exploitation.
                </p>
              </motion.div>
            ) : data ? (
              <motion.div 
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="terminal-card col-span-2 p-6 flex items-center justify-between">
                    <div className="space-y-4">
                      <div>
                        <p className="text-[11px] font-mono text-gray-500 uppercase tracking-widest mb-1">Total Risk Index</p>
                        <div className="flex items-baseline gap-2">
                          <span className={`text-5xl font-display font-bold ${getRiskColor(data.risk_score.level).split(' ')[0]}`}>
                            {data.risk_score.score}
                          </span>
                          <span className="text-gray-600 font-mono">/100</span>
                        </div>
                      </div>
                      <div className={`px-3 py-1.5 rounded-lg border font-mono text-xs uppercase tracking-wider inline-flex items-center gap-2 ${getRiskColor(data.risk_score.level)}`}>
                        Threat Level: {data.risk_score.level}
                      </div>
                    </div>
                  </div>

                  <div className="terminal-card p-6 bg-matrix-400/5 border-matrix-400/20">
                    <p className="text-[11px] font-mono text-matrix-400 uppercase tracking-widest mb-4">Quick Insights</p>
                    <div className="space-y-4 text-xs font-mono">
                      <div className="flex items-center justify-between"><span className="text-gray-500">ASN Status</span><span>{data.ip_info.as_name || 'Verified'}</span></div>
                      <div className="flex items-center justify-between"><span className="text-gray-500">SSL Grade</span><span>{data.ssl.grade || 'N/A'}</span></div>
                      <div className="flex items-center justify-between"><span className="text-gray-500">Open Ports</span><span className="text-orange-400">{data.ports.open_count || 0} Detected</span></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DetailCard title="Network Identity" icon={<Globe className="w-4 h-4" />}>
                      <DetailRow label="ISP" value={data.ip_info.isp} />
                      <DetailRow label="Organization" value={data.ip_info.org} />
                      <DetailRow label="ASN" value={data.ip_info.asn} />
                      <DetailRow label="IP Address" value={data.ip_info.ip} mono />
                  </DetailCard>
                  
                  <DetailCard title="DNS Infrastructure" icon={<Layers className="w-4 h-4" />}>
                      <DetailRow label="Reverse DNS" value={data.dns_info.reverse_dns?.[0]?.ptr || 'N/A'} mono />
                      <DetailRow label="SPF Record" value={data.dns_info.spf.found ? 'Valid' : 'Missing'} 
                                  status={data.dns_info.spf.status === 'pass' ? 'success' : 'warning'} />
                      <DetailRow label="DMARC" value={data.dns_info.dmarc.found ? 'Configured' : 'Missing'} 
                                  status={data.dns_info.dmarc.status === 'pass' ? 'success' : 'warning'} />
                  </DetailCard>
                </div>

                <div className="terminal-card p-6 bg-matrix-400/[0.02]">
                   <h3 className="font-display font-bold mb-4">Security Recommendations</h3>
                   <div className="space-y-3">
                      {data.recommendations.map((rec, i) => (
                        <div key={i} className="p-4 bg-surface-900/50 border border-white/5 rounded-2xl text-sm text-gray-300">
                           {rec}
                        </div>
                      ))}
                   </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

    </div>
  )
}

function DetailCard({ title, icon, children }) {
  return (
    <div className="terminal-card">
      <div className="p-4 border-b border-white/5 flex items-center gap-2">
        <span className="text-matrix-400">{icon}</span>
        <span className="text-xs font-mono font-bold uppercase tracking-wider">{title}</span>
      </div>
      <div className="p-4 space-y-3">{children}</div>
    </div>
  )
}

function DetailRow({ label, value, mono = false, status }) {
  return (
    <div className="flex items-center justify-between text-xs py-1">
      <span className="text-gray-500 font-mono">{label}</span>
      <div className="flex items-center gap-2">
        {status && (
          <div className={`w-1.5 h-1.5 rounded-full ${
            status === 'success' ? 'bg-matrix-400' : 
            status === 'warning' ? 'bg-orange-500' : 'bg-red-500'
          }`} />
        )}
        <span className={`${mono ? 'font-mono' : ''} ${status === 'warning' ? 'text-orange-400' : 'text-gray-300'}`}>
          {value || '---'}
        </span>
      </div>
    </div>
  )
}
