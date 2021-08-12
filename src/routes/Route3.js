import { VirtualRepeat } from "lib/VirtualRepeat"
import { useStyles } from "../App"
import { VirtualItem } from "./VirtualItem"

export function Route3() {
  const classes = useStyles()

  return (
    <div className="App">
      <div className={classes.virtualBox}>
        <VirtualRepeat
          totalCount={5000000}
          item={<VirtualItem />}
          overscan={1}
        />
      </div>
    </div>
  )
}
