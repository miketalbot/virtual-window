import { useEffect, useRef, useState } from "react"
import { useObserver } from "./useObserver"
import _ from "./scope"

const AVOID_DIVIDE_BY_ZERO = 0.001

export function useScroll(whenScrolled, extract = v => v) {
  const observer = useObserver(measure, [])
  const scrollCallback = useRef()
  scrollCallback.current = whenScrolled

  const [windowHeight, setWindowHeight] = useState(AVOID_DIVIDE_BY_ZERO)
  const scroller = useRef()
  useEffect(() => {
    if (!scroller.current) return
    const parent = extract(scroller.current)
    observer.observe(parent)
    if (!parent) {
      return
    }
    parent.addEventListener("scroll", handleScroll)
    return () => {
      parent.removeEventListener("scroll", handleScroll)
    }

    function handleScroll(event) {
      if (scrollCallback.current) {
        _(event.target)(_ => {
          scrollCallback.current({
            top: Math.floor(_.scrollTop),
            left: Math.floor(_.scrollLeft),
            height: _.scrollHeight,
            width: _.scrollWidth
          })
        })
      }
    }
  }, [extract, observer])
  return [scroller, windowHeight, scroller.current]

  function measure({ contentRect: { height } }) {
    setWindowHeight(height || AVOID_DIVIDE_BY_ZERO)
  }
}
