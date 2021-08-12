import { VirtualRepeat } from "./lib/VirtualRepeat"
import { useStyles } from "./App"
import { DummyItem } from "./DummyItem"
import randomColor from "randomcolor"

export const items = Array.from({ length: 2000 }, (_, i) => ({
  content: i,
  color: randomColor()
}))

export function Route1() {
  const classes = useStyles()

  return (
    <div className="App">
      <div className={classes.virtualBox}>
        <VirtualRepeat list={items} item={<DummyItem />} />
      </div>
    </div>
  )
}
