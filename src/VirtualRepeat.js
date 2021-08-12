import { useMemo, useState, useRef } from "react"
import { MeasuredContext } from "./Measured"
import { useDebouncedRefresh } from "./useDebouncedRefresh"
import { useScroll } from "./useScroll"
import { RenderItem } from "./RenderItem"
import { Simple } from "./Simple"

export function VirtualRepeat({
  children,
  list = children?.length ? children : undefined,
  totalCount = 0,
  itemSize = 36,
  item = <Simple />,
  onVisibleChanged = () => {},
  overscan = 2,
  ...props
}) {
  // Configuration Phase

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
    measureContext.count > 2
      ? measureContext.total / measureContext.count
      : itemSize
  )

  let [draw, visible] = useMemo(render, [
    top,
    delta,
    props,
    expectedSize,
    totalCount,
    list,
    measureContext,
    windowHeight,
    item,
    overscan
  ])

  const totalHeight = Math.floor(
    (totalCount - visible.length) * expectedSize +
      visible.reduce((c, a) => c + a.props.height, 0)
  )

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

  // Render Phase

  const style = useMemo(() => ({ height: totalHeight }), [totalHeight])

  return (
    <MeasuredContext.Provider value={measureContext}>
      <div ref={scrollMonitor} className="vr-scroll-holder">
        <div style={style}>
          <div className="vr-items">{draw}</div>
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
    useMemo(() => onVisibleChanged(firstVisible, lastVisible), [
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

    for (
      ;
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
        start += (height || expectedSize) * direction
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
        start += (height || expectedSize) * direction
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
