import { useEffect, useRef, useState } from 'react'

interface UseElapsedTimerResult {
  elapsed: number
  reset: () => void
}

export function useElapsedTimer(running: boolean): UseElapsedTimerResult {
  const [elapsed, setElapsed] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setElapsed((e) => e + 1), 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [running])

  return {
    elapsed,
    reset: () => setElapsed(0),
  }
}
