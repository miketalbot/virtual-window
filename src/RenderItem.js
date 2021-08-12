import { useMemo } from "react"
import { Measured } from "./Measured"
import { getKey } from "./getKey"

export function RenderItem({
  data,
  top,
  offset,
  item,
  visible,
  keyFn = getKey,
  pass = "item",
  index
}) {
  const style = useMemo(
    () => ({
      top: top + offset,
      position: "absolute",
      width: "100%",
      opacity: visible ? 1 : 0
    }),
    [top, visible, offset]
  )

  return (
    !!item && (
      <Measured id={index} style={style}>
        <item.type
          key={data ? keyFn(data) : index}
          {...{ ...item.props, [pass]: data, index }}
        />
      </Measured>
    )
  )
}
