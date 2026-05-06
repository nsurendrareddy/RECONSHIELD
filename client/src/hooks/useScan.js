import { useState, useRef, useCallback } from 'react'
import { startScan, getScan, getScanStatus } from '../utils/api'
import { useAuth } from '../context/AuthContext'

const GUEST_SCAN_LIMIT = 3
const STORAGE_KEY = 'reconshield_guest_scans'

export function useScan() {
  const { token } = useAuth()
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

  const getGuestScanCount = () => {
    return parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10)
  }

  const incrementGuestScanCount = () => {
    const current = getGuestScanCount()
    localStorage.setItem(STORAGE_KEY, (current + 1).toString())
  }

  const scan = useCallback(async (targetDomain) => {
    // Check limit for guests
    if (!token) {
      const count = getGuestScanCount()
      if (count >= GUEST_SCAN_LIMIT) {
        setStatus('limit-reached')
        return
      }
    }

    setStatus('scanning')
    setError(null)
    setScanData(null)
    setDomain(targetDomain)
    setProgress('Initializing scan engine...')
    setScanProgress(null)

    try {
      const { id } = await startScan(targetDomain, true)
      setProgress('Scan queued. Modules starting...')

      // Increment count for guests on successful start
      if (!token) {
        incrementGuestScanCount()
      }

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
  }, [stopPolling, token])

  const reset = useCallback(() => {
    stopPolling()
    setStatus('idle'); setScanData(null); setError(null); setProgress(''); setScanProgress(null); setDomain('')
  }, [stopPolling])

  return { status, scanData, error, progress, scanProgress, domain, scan, reset }
}
