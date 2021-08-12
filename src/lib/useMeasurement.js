import { useCallback, useState, useRef } from "react"
import { useObserver } from "./useObserver"

export function useMeasurement(id = 0, log = false) {
  const measure = useCallback(measureItem, [])
  const observer = useObserver(measure, [])
  const currentTarget = useRef(null)
  const attach = useCallback(
    function attach(target) {
      if (!target) return
      currentTarget.current = target
      observer.observe(target)
    },
    [observer]
  )
  const [size, setSize] = useState({})
  return [size, attach, currentTarget.current]

  function measureItem({ contentRect, target }) {
    if (contentRect.height > 0) {
      updateSize(target, contentRect)
    }
  }
  function updateSize(target, rect) {
    setSize({
      width: Math.ceil(rect.width),
      height: Math.ceil(rect.height),
      element: target
    })
  }
}
