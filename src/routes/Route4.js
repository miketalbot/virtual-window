import { VirtualFixedRepeat } from "lib/VirtualFixedRepeat"
import { VirtualItem } from "./VirtualItem"
import { routes } from "./routes"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  virtualBox: {
    height: 370,
    background: "#0002",
    overflow: "auto"
  }
})

routes["/route4"] = <Route4 />

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
