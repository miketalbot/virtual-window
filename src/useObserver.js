/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useMemo } from "react"

export function useObserver(measure, deps = []) {
  const _measure = useCallback(measureFirstItem, [measure, ...deps])
  const observer = useMemo(() => new ResizeObserver(_measure), [
    _measure,
    ...deps
  ])
  useEffect(() => {
    return () => {
      observer.disconnect()
    }
  }, [observer])
  return observer

  function measureFirstItem(entries) {
    if (!entries?.length) return
    measure(entries[0])
  }
}
