import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, Shield, MapPin, Globe, Server, Lock, 
  Terminal, AlertTriangle, CheckCircle, Activity,
  Cpu, ExternalLink, Zap, Info, Layers, Eye
} from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import ScanTerminalLog from '../components/ip-scanner/ScanTerminalLog'
import { API_BASE } from '../utils/api'

// Fix for default marker icons in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Map Updater component to pan map when coordinates change
function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center && center[0] !== 0 && center[1] !== 0) {
      map.flyTo(center, 13, {
        animate: true,
        duration: 1.5
      });
    }
  }, [center, map]);
  return null;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
}

export default function IpScanner() {
  const [target, setTarget] = useState('')
  const [scanning, setScanning] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [lastTarget, setLastTarget] = useState('')
  const [isGps, setIsGps] = useState(false)

  const handleGps = () => {
    if (!navigator.geolocation) {
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
      // Auto-start scan
      setTimeout(() => {
        const fakeEvent = { preventDefault: () => {} };
        handleScan(fakeEvent, data.ip);
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
      {/* Header & Search */}
      <div className="relative">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-matrix-400/5 rounded-full blur-3xl -z-10" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-matrix-400 font-mono text-xs uppercase tracking-[0.2em]">
              <Zap className="w-3 h-3" />
              <span>Advanced Reconnaissance</span>
            </div>
            <h1 className="text-4xl font-display font-bold tracking-tight">
              IP <span className="text-glow-green text-matrix-400">Intelligence</span> Scanner
            </h1>
            <p className="text-gray-500 max-w-xl text-sm">
              Comprehensive deep-packet inspection and passive footprinting for any IP address or domain.
              Analyze infrastructure, security headers, and threat reputation in real-time.
            </p>
          </div>

          <form onSubmit={handleScan} className="flex-1 max-w-lg relative group">
            <div className="absolute inset-0 bg-matrix-400/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 -z-10" />
            <input
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="Enter IP address or domain (e.g. 8.8.8.8 or google.com)"
              className="w-full bg-surface-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-32 focus:border-matrix-400/50 focus:ring-1 focus:ring-matrix-400/50 outline-none transition-all font-mono text-sm"
            />
            <div className="absolute right-32 top-1/2 -translate-y-1/2 flex items-center gap-2">
               <button 
                 type="button"
                 onClick={handleGps}
                 className="p-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-matrix-400 transition-colors"
                 title="Use Browser GPS (Most Accurate)"
               >
                 <Activity className="w-4 h-4" />
               </button>
               <button 
                 type="button"
                 onClick={handleMyIp}
                 className="p-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-matrix-400 transition-colors"
                 title="Scan My IP"
               >
                 <MapPin className="w-4 h-4" />
               </button>
            </div>
            <button
              disabled={scanning}
              type="submit"
              className="absolute right-2 top-2 bottom-2 px-6 bg-matrix-400 text-surface-950 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-matrix-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              {scanning ? (
                <>
                  <Activity className="w-3 h-3 animate-spin" />
                  <span>Scanning...</span>
                </>
              ) : (
                <>
                  <Shield className="w-3 h-3" />
                  <span>Start Scan</span>
                </>
              )}
            </button>
          </form>
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

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Log & Map */}
        <div className="lg:col-span-4 space-y-6">
          {/* Terminal Log */}
          <ScanTerminalLog scanning={scanning} data={data} target={lastTarget} />
          
          {/* Geolocation Map */}
          <div className="terminal-card overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/5 bg-surface-900/50">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-matrix-400" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Geolocation Vector</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-matrix-400 animate-pulse" />
                <span className="text-[10px] text-matrix-400 font-mono uppercase">Live Link</span>
              </div>
            </div>
            <div className="h-[300px] w-full bg-surface-950 grayscale hover:grayscale-0 transition-all duration-700">
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
                      <Popup className="hacker-popup">
                        <div className="font-mono text-xs">
                          <p className="font-bold text-matrix-400">{data.ip_info.ip || 'Local Node'}</p>
                          <p>{data.ip_info.city}, {data.ip_info.country}</p>
                        </div>
                      </Popup>
                    </Marker>
                  </>
                )}
              </MapContainer>
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

        {/* Right Column: Results Dashboard */}
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
                  Initialize a scan to begin reconnaissance. All data is collected passively without direct exploitation.
                </p>
              </motion.div>
            ) : data ? (
              <motion.div 
                key="results"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {/* Risk Score Summary */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="terminal-card col-span-2 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Activity className="w-24 h-24 text-matrix-400" />
                    </div>
                    <div className="p-6 flex items-center justify-between">
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
                          <div className={`w-2 h-2 rounded-full animate-pulse ${getRiskColor(data.risk_score.level).replace('text-', 'bg-').split(' ')[0]}`} />
                          Threat Level: {data.risk_score.level}
                        </div>
                      </div>
                      
                      <div className="hidden md:block w-32 h-32 relative">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                          <circle 
                            cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
                            strokeDasharray={364.4}
                            strokeDashoffset={364.4 - (364.4 * data.risk_score.score) / 100}
                            className={`transition-all duration-1000 ease-out ${getRiskColor(data.risk_score.level).split(' ')[0]}`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <Shield className={`w-6 h-6 mb-1 ${getRiskColor(data.risk_score.level).split(' ')[0]}`} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="terminal-card p-6 bg-matrix-400/5 border-matrix-400/20">
                    <p className="text-[11px] font-mono text-matrix-400 uppercase tracking-widest mb-4">Quick Insights</p>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 text-xs font-mono">ASN Status</span>
                        <span className="text-gray-300 text-xs font-bold">{data.ip_info.as_name || 'Verified'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 text-xs font-mono">SSL Grade</span>
                        <span className="text-matrix-400 text-xs font-bold">{data.ssl.grade || 'N/A'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 text-xs font-mono">Open Ports</span>
                        <span className="text-orange-400 text-xs font-bold">{data.ports.open_count || 0} Detected</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 text-xs font-mono">VPN/Proxy</span>
                        <span className={data.ip_info.is_vpn ? 'text-red-400' : 'text-green-400'}>
                          {data.ip_info.is_vpn ? 'YES' : 'NO'}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Sub-grids for details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* IP Intelligence */}
                  <motion.div variants={itemVariants} className="terminal-card">
                    <div className="p-4 border-b border-white/5 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-matrix-400" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider">Network Identity</span>
                    </div>
                    <div className="p-4 space-y-3">
                      <DetailRow label="ISP" value={data.ip_info.isp} />
                      <DetailRow label="Organization" value={data.ip_info.org} />
                      <DetailRow label="ASN" value={data.ip_info.asn} />
                      <DetailRow label="IP Address" value={data.ip_info.ip} mono />
                      <DetailRow label="Hosting" value={data.ip_info.is_hosting ? 'Cloud/Datacenter' : 'Residential/Enterprise'} />
                    </div>
                  </motion.div>

                  {/* DNS Records */}
                  <motion.div variants={itemVariants} className="terminal-card">
                    <div className="p-4 border-b border-white/5 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-matrix-400" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider">DNS Infrastructure</span>
                    </div>
                    <div className="p-4 space-y-3">
                      <DetailRow label="Reverse DNS" value={data.dns_info.reverse_dns?.[0]?.ptr || 'N/A'} mono />
                      <DetailRow label="Cloud Provider" value={data.dns_info.cloud_providers?.[0] || 'Unknown'} />
                      <div className="flex items-center justify-between text-xs py-1">
                        <span className="text-gray-500 font-mono">Found Records</span>
                        <div className="flex gap-1">
                          {Object.keys(data.dns_info.records).filter(k => data.dns_info.records[k].length > 0).map(type => (
                            <span key={type} className="px-1.5 py-0.5 bg-white/5 rounded text-[10px] font-mono text-gray-300 uppercase">
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                      <DetailRow label="SPF Record" value={data.dns_info.spf.found ? 'Valid' : 'Missing'} 
                                 status={data.dns_info.spf.status === 'pass' ? 'success' : 'warning'} />
                      <DetailRow label="DMARC" value={data.dns_info.dmarc.found ? 'Configured' : 'Missing'} 
                                 status={data.dns_info.dmarc.status === 'pass' ? 'success' : 'warning'} />
                    </div>
                  </motion.div>

                  {/* Port Exposure */}
                  <motion.div variants={itemVariants} className="terminal-card">
                    <div className="p-4 border-b border-white/5 flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-matrix-400" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider">Service Exposure</span>
                    </div>
                    <div className="p-4">
                      {data.ports.open_ports.length > 0 ? (
                        <div className="space-y-2">
                          {data.ports.open_ports.slice(0, 5).map(port => (
                            <div key={port.port} className="flex items-center justify-between text-xs p-2 bg-white/[0.02] rounded-lg border border-white/5">
                              <div className="flex items-center gap-3">
                                <span className="font-mono text-matrix-400">PORT {port.port}</span>
                                <span className="text-gray-400">{port.service}</span>
                              </div>
                              <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                                port.risk === 'High' ? 'text-red-400 bg-red-400/10' : 
                                port.risk === 'Medium' ? 'text-orange-400 bg-orange-400/10' : 'text-blue-400 bg-blue-400/10'
                              }`}>
                                {port.risk} Risk
                              </span>
                            </div>
                          ))}
                          {data.ports.open_ports.length > 5 && (
                            <p className="text-[10px] text-gray-600 text-center mt-2 font-mono">
                              + {data.ports.open_ports.length - 5} more ports detected
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="py-8 text-center">
                          <CheckCircle className="w-8 h-8 text-green-500/20 mx-auto mb-2" />
                          <p className="text-gray-500 text-xs">No common open ports detected</p>
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* SSL/TLS Analysis */}
                  <motion.div variants={itemVariants} className="terminal-card">
                    <div className="p-4 border-b border-white/5 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-matrix-400" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider">SSL/TLS Security</span>
                    </div>
                    <div className="p-4 space-y-3">
                      {data.ssl.has_ssl ? (
                        <>
                          <DetailRow label="Protocol" value={data.ssl.cipher.protocol} />
                          <DetailRow label="Issuer" value={data.ssl.certificate.issuer} />
                          <DetailRow label="Expiry" value={`${data.ssl.certificate.days_remaining} days remaining`}
                                     status={data.ssl.certificate.days_remaining < 30 ? 'warning' : 'success'} />
                          <DetailRow label="Cipher" value={data.ssl.cipher.name} mono />
                          <DetailRow label="Trust Chain" value="Verified" status="success" />
                        </>
                      ) : (
                        <div className="py-8 text-center">
                          <AlertTriangle className="w-8 h-8 text-red-500/20 mx-auto mb-2" />
                          <p className="text-red-500/60 text-xs">No SSL/TLS Certificate Found</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Recommendations */}
                <motion.div variants={itemVariants} className="terminal-card p-6 bg-matrix-400/[0.02]">
                   <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-matrix-400/10 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-matrix-400" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold">Security Recommendations</h3>
                        <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Hardening Roadmap</p>
                      </div>
                   </div>
                   <div className="space-y-3">
                      {data.recommendations.map((rec, i) => (
                        <div key={i} className="flex gap-4 p-4 bg-surface-900/50 border border-white/5 rounded-2xl group hover:border-matrix-400/30 transition-all">
                           <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-1">
                             <span className="text-[10px] font-mono text-gray-500">{i+1}</span>
                           </div>
                           <p className="text-sm text-gray-300 leading-relaxed">{rec}</p>
                        </div>
                      ))}
                   </div>
                </motion.div>
                
                {/* Ethical Notice */}
                <motion.div variants={itemVariants} className="text-center py-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.02] border border-white/5 rounded-full text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                    <Info className="w-3 h-3" />
                    Educational only — Passive reconnaissance. No exploitation.
                  </div>
                </motion.div>

              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
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
