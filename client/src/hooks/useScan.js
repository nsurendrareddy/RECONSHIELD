import { useState, useRef, useCallback } from 'react'
import { startScan, getScan, getScanStatus } from '../utils/api'

export function useScan() {
  const [status, setStatus] = useState('idle')
  const [scanData, setScanData] = useState(null)
  const [error, setError] = useState(null)
  const [progress, setProgress] = useState('')
  const [scanProgress, setScanProgress] = useState(null)
  const [domain, setDomain] = useState('')
  const pollRef = useRef(null)

  const stopPolling = useCallback(() => {
    if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null }
  }, [])

  const scan = useCallback(async (targetDomain) => {
    setStatus('scanning')
    setError(null)
    setScanData(null)
    setDomain(targetDomain)
    setProgress('Initializing scan engine...')
    setScanProgress(null)

    try {
      const { id } = await startScan(targetDomain, true)
      setProgress('Scan queued. Modules starting...')

      let attempts = 0
      pollRef.current = setInterval(async () => {
        attempts++
        try {
          const statusRes = await getScanStatus(id)
          setScanProgress(statusRes)
          setProgress(statusRes.current_module ? `Running: ${statusRes.current_module}` : 'Processing...')

          if (statusRes.status === 'completed') {
            stopPolling()
            const fullResult = await getScan(id)
            setScanData(fullResult)
            setStatus('completed')
            setProgress('')
          } else if (statusRes.status === 'failed') {
            stopPolling()
            setError('Scan failed. Target may be unreachable.')
            setStatus('error')
          }
        } catch (e) {
          if (attempts > 90) { stopPolling(); setError('Scan timed out'); setStatus('error') }
        }
      }, 1500)
    } catch (e) {
      setError(e.message)
      setStatus('error')
    }
  }, [stopPolling])

  const reset = useCallback(() => {
    stopPolling()
    setStatus('idle'); setScanData(null); setError(null); setProgress(''); setScanProgress(null); setDomain('')
  }, [stopPolling])

  return { status, scanData, error, progress, scanProgress, domain, scan, reset }
}
