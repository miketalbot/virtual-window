import { useContext, useState, createContext } from "react"
import { useMeasurement } from "./useMeasurement"

export const MeasuredContext = createContext({
  sizes: {},
  measuredId: 1,
  total: 0,
  count: 0,
  changed: () => {}
})

const EMPTY = { height: 0, width: 0 }

export function Measured({ children, style, id }) {
  const context = useContext(MeasuredContext)
  const [measureId] = useState(() =>
    id === undefined ? context.measureId++ : id
  )
  const [size, attach] = useMeasurement(measureId, true)
  const existing = context.sizes[measureId] || EMPTY
  if (size.height > 0 && size.height !== existing.height) {
    if (existing === EMPTY) {
      context.count++
    }
    context.total -= existing.height
    context.total += size.height
    context.sizes[measureId] = size
    context.changed()
  }

  return (
    <div key={measureId} style={style} ref={attach}>
      {children}
    </div>
  )
}
