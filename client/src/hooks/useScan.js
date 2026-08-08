import { useState, useRef, useCallback, useEffect } from 'react'
import { startScan, getScan, getScanStatus } from '../utils/api'

export function useScan() {
  const [status, setStatus] = useState('idle')
  const [scanData, setScanData] = useState(null)
  const [error, setError] = useState(null)
  const [progress, setProgress] = useState('')
  const [scanProgress, setScanProgress] = useState(null)
  const [domain, setDomain] = useState('')
  const pollTimerRef = useRef(null)
  const isMountedRef = useRef(true)

  const stopPolling = useCallback(() => {
    if (pollTimerRef.current) {
      clearTimeout(pollTimerRef.current)
      pollTimerRef.current = null
    }
  }, [])

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
      stopPolling()
    }
  }, [stopPolling])

  const scan = useCallback(async (targetDomain) => {
    stopPolling()
    setStatus('scanning')
    setError(null)
    setScanData(null)
    setDomain(targetDomain)
    setProgress('Initializing scan engine...')
    setScanProgress(null)

    try {
      const { id } = await startScan(targetDomain, true)
      if (!isMountedRef.current) return
      setProgress('Scan queued. Modules starting...')

      let attempts = 0

      const pollNext = async () => {
        if (!isMountedRef.current) return
        attempts++
        try {
          const statusRes = await getScanStatus(id)
          if (!isMountedRef.current) return

          setScanProgress(statusRes)
          setProgress(statusRes.current_module ? `Running: ${statusRes.current_module}` : 'Processing...')

          if (statusRes.status === 'completed') {
            const fullResult = await getScan(id)
            if (!isMountedRef.current) return
            setScanData(fullResult)
            setStatus('completed')
            setProgress('')
            stopPolling()
          } else if (statusRes.status === 'failed') {
            setError('Scan failed. Target may be unreachable.')
            setStatus('error')
            stopPolling()
          } else {
            if (attempts > 90) {
              stopPolling()
              setError('Scan timed out')
              setStatus('error')
            } else {
              pollTimerRef.current = setTimeout(pollNext, 1500)
            }
          }
        } catch (e) {
          if (!isMountedRef.current) return
          if (attempts > 90) {
            stopPolling()
            setError('Scan timed out')
            setStatus('error')
          } else {
            pollTimerRef.current = setTimeout(pollNext, 1500)
          }
        }
      }

      pollTimerRef.current = setTimeout(pollNext, 1500)
    } catch (e) {
      if (isMountedRef.current) {
        setError(e.message)
        setStatus('error')
      }
    }
  }, [stopPolling])

  const reset = useCallback(() => {
    stopPolling()
    setStatus('idle')
    setScanData(null)
    setError(null)
    setProgress('')
    setScanProgress(null)
    setDomain('')
  }, [stopPolling])

  return { status, scanData, error, progress, scanProgress, domain, scan, reset }
}
