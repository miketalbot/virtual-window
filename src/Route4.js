import { VirtualFixedRepeat } from "./VirtualFixedRepeat"
import { useStyles } from "./App"
import { VirtualItem } from "./VirtualItem"

export function Route4() {
  const classes = useStyles()

  return (
    <div className="App">
      <div className={classes.virtualBox}>
        <VirtualFixedRepeat
          totalCount={5000000}
          item={<VirtualItem />}
          itemSize={18}
        />
      </div>
    </div>
  )
}
