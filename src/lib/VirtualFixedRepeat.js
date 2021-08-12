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
