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

import { useMemo, useState } from "react"
import { useScroll } from "./useScroll"
import { RenderItem } from "./RenderItem"
import { Simple } from "./Simple"
import "./virtual-repeat.css"

export function VirtualFixedRepeat({
  list,
  totalCount = 0,
  itemSize = 36,
  item = <Simple />,
  onVisibleChanged = () => {},
  ...props
}) {
  // Configuration Phase

  const [{ top = 0 }, setScrollInfo] = useState({})

  const [scrollMonitor, windowHeight] = useScroll(setScrollInfo)

  totalCount = list ? list.length : totalCount

  // Calculation Phase

  let draw = useMemo(render, [
    top,
    props,
    totalCount,
    list,
    itemSize,
    windowHeight,
    item
  ])

  const totalHeight = itemSize * totalCount

  //Notification Phase

  useVisibilityEvents()

  // Render Phase

  const style = useMemo(() => ({ height: totalHeight }), [totalHeight])

  return (
    <div ref={scrollMonitor} className="vr-scroll-holder">
      <div style={style}>
        <div className="vr-items">{draw}</div>
      </div>
    </div>
  )

  function render() {
    return renderItems({
      windowHeight,
      itemSize,
      totalCount,
      list,
      top,
      item,
      ...props
    })
  }

  function useVisibilityEvents() {
    // Send visibility events
    const firstVisible = draw[0]
    const lastVisible = draw[draw.length - 1]
    useMemo(() => onVisibleChanged(firstVisible, lastVisible), [
      firstVisible,
      lastVisible
    ])
  }
}

function renderItems({
  windowHeight,
  itemSize,
  totalCount,
  list,
  top,
  ...props
}) {
  if (windowHeight < 1) return [[], []]

  let draw = []

  for (
    let scan = Math.floor(top / itemSize), start = -(top % itemSize);
    scan < totalCount && start < windowHeight;
    scan++
  ) {
    const item = (
      <RenderItem
        {...props}
        visible={true}
        top={start}
        offset={top}
        key={scan}
        index={scan}
        data={list ? list[scan] : undefined}
      />
    )
    start += itemSize

    draw.push(item)
  }
  return draw
}
