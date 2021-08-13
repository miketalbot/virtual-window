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
import React, { createContext, useContext, useState } from "react"
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
      {children}pweir-q2349
    </div>
  )
}
