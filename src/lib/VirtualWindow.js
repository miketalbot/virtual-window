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
import React, { useEffect, useMemo, useRef, useState } from "react"
import { MeasuredContext } from "./Measured"
import { useDebouncedRefresh } from "./useDebouncedRefresh"
import { useScroll } from "./useScroll"
import { RenderItem } from "./RenderItem"
import { Simple } from "./Simple"
import css from "./virtual-repeat.css"

export { useMeasurement } from "./useMeasurement"
export { useScroll }
export { useDebouncedRefresh }
export { MeasuredContext }
export { useObserver } from "./useObserver"
export { Measured } from "./Measured"

export function VirtualWindow({
                                children,
                                list,
                                totalCount = 0,
                                itemSize = 36,
                                className = "",
                                item,
                                onVisibleChanged = () => {
                                },
                                onConfigure = () => {
                                },
                                overscan = 2,
                                ...props
                              }) {
  // Configuration Phase
  children = Array.isArray(children)
    ? children
    : children
      ? [children]
      : undefined

  list = list || (children?.length > 0 ? children : undefined)
  item = item || <Simple />
  const [{ top = 0 }, setScrollInfo] = useState({})
  const previousTop = useRef(0)
  const changed = useDebouncedRefresh()
  const lastRendered = useRef([])

  const [scrollMonitor, windowHeight, scrollingElement] = useScroll(
    setScrollInfo
  )

  const measureContext = useMemo(
    () => ({
      sizes: {},
      changed,
      total: 0,
      count: 0
    }),
    [changed]
  )

  totalCount = list ? list.length : totalCount

  // Calculation Phase

  let delta = Math.floor(previousTop.current - top)
  previousTop.current = top

  const expectedSize = Math.floor(
    measureContext.count > 0
      ? measureContext.total / measureContext.count
      : itemSize
  )

  //eslint-disable-next-line react-hooks/exhaustive-deps
  let [draw, visible] = useMemo(render, [
    top,
    delta,
    expectedSize,
    totalCount,
    list,
    measureContext,
    windowHeight,
    measureContext.count,
    item,
    overscan
  ])

  const calculatedHeight = Math.floor(
    (totalCount - visible.length) * expectedSize +
    visible.reduce((c, a) => c + a.props.height, 0)
  )
  //eslint-disable-next-line react-hooks/exhaustive-deps
  const totalHeight = useMemo(() => calculatedHeight, [
    //eslint-disable-next-line react-hooks/exhaustive-deps
    Math.floor(expectedSize / 4),
    top
  ])

  lastRendered.current = visible
  const last = visible[visible.length - 1]
  if (last && +last.key === totalCount - 1 && totalHeight > windowHeight) {
    if (last.props.top + last.props.height < windowHeight) {
      delta = Math.floor(windowHeight - (last.props.top + last.props.height))
      ;[draw, visible] = render()
      lastRendered.current = visible
    }
  }

  if (visible.length) {
    const first = visible[0]
    if (first.key === 0 && first.props.top > 0) {
      scrollingElement.scrollTop = 0
    }
  }

  //Notification Phase

  useVisibilityEvents()

  useEffect(() => onConfigure({ expectedSize, scrollingElement }), [
    expectedSize,
    scrollingElement,
    onConfigure
  ])

  // Render Phase

  const style = useMemo(() => ({ height: totalHeight }), [totalHeight])

  return (
    <MeasuredContext.Provider value={measureContext}>
      <div
        ref={scrollMonitor}
        className={`${className} ${css["vr-scroll-holder"]}`}
      >
        <div style={style}>
          <div className={`${className} ${css["vr-items"]}`}>{draw}</div>
        </div>
      </div>
    </MeasuredContext.Provider>
  )

  function render() {
    return renderItems({
      windowHeight,
      expectedSize,
      rendered: lastRendered.current,
      totalCount,
      delta,
      list,
      measureContext,
      top,
      item,
      overscan,
      ...props
    })
  }

  function useVisibilityEvents() {
    // Send visibility events
    let firstVisible
    let lastVisible
    for (let item of visible) {
      if (
        item.props.top + item.props.height > 0 &&
        item.props.top < windowHeight
      ) {
        firstVisible = firstVisible || item
        lastVisible = item
      }
    }
    useEffect(() => onVisibleChanged(firstVisible, lastVisible), [
      firstVisible,
      lastVisible
    ])
  }
}

function renderItems({
                       windowHeight,
                       expectedSize,
                       rendered,
                       totalCount,
                       delta,
                       list,
                       overscan = 2,
                       measureContext,
                       top,
                       ...props
                     }) {
  if (windowHeight < 1) return [[], []]
  const { sizes } = measureContext
  if (
    !rendered.length ||
    top < expectedSize ||
    Math.abs(delta) > windowHeight * 5
  ) {
    return layoutAll()
  } else {
    return layoutAgain()
  }

  function layoutAll() {
    const topItem = Math.max(0, Math.floor(top / expectedSize))
    return layout(topItem, -(top % expectedSize))
  }

  function layoutAgain() {
    let draw = []
    let renderedVisible = []
    let firstVisible = rendered.find(f => f.props.top + delta >= 0)
    if (!firstVisible) return layoutAll()
    let topOfFirstVisible = firstVisible.props.top + delta

    if (topOfFirstVisible > 0) {
      // The first item is not at the top of the screen,
      // so we need to scan backwards to find items to fill the space
      ;[draw, renderedVisible] = layout(
        +firstVisible.key - 1,
        topOfFirstVisible,
        -1
      )
    }
    const [existingDraw, exisitingVisible] = layout(
      +firstVisible.key,
      topOfFirstVisible
    )
    return [draw.concat(existingDraw), renderedVisible.concat(exisitingVisible)]
  }

  function layout(scan, start, direction = 1) {
    let draw = []
    let renderedVisible = []

    let adding = true
    let max = 400
    for (
      ;
      max-- &&
      scan >= 0 &&
      start > -windowHeight * overscan &&
      scan < totalCount &&
      start < windowHeight * (1 + overscan);
      scan += direction
    ) {
      let height = sizes[scan]?.height
      if (height === undefined) {
        adding = false
      }
      if (direction < 0) {
        start += (height || Math.max(8, expectedSize)) * direction
      }
      const item = (
        <RenderItem
          {...props}
          visible={adding}
          height={height}
          top={start}
          offset={top}
          key={scan}
          index={scan}
          data={list ? list[scan] : undefined}
        />
      )
      if (direction > 0) {
        start += (height || Math.max(8, expectedSize)) * direction
      }
      if (adding) {
        if (direction > 0) {
          renderedVisible.push(item)
        } else {
          renderedVisible.unshift(item)
        }
      }
      draw.push(item)
    }
    return [draw, renderedVisible]
  }
}
