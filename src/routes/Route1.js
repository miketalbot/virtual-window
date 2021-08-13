import { VirtualWindow } from "lib/VirtualWindow"

import { DummyItem } from "./DummyItem"
import randomColor from "randomcolor"
import { routes } from "./routes"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  virtualBox: {
    height: 370,
    background: "#0002",
    overflow: "auto"
  }
})

routes["/route1"] = <Route1 />

export const items = Array.from({ length: 2000 }, (_, i) => ({
  content: i,
  color: randomColor()
}))

export function Route1() {
  const classes = useStyles()

  return (
    <div className="App">
      <div className={classes.virtualBox}>
        <VirtualWindow list={items} item={<DummyItem />} />
      </div>
    </div>
  )
}
