/*

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>

*/

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
    parent.addEventListener("scroll", handleScroll, { passive: true })
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
