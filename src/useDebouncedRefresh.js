import { useCallback, useState } from "react"

const debounce = (fn, delay) => {
  let timer = 0
  return (...params) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...params), delay)
  }
}

export function useDebouncedRefresh() {
  const [refresh, setRefresh] = useState(0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const changed = useCallback(
    debounce(() => setRefresh(i => i + 1)),
    [setRefresh]
  )
  changed.id = refresh
  return changed
}
