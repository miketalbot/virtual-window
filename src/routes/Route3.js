import { VirtualItem } from "./VirtualItem"
import { routes } from "./routes"
import { makeStyles } from "@material-ui/core"
import { VirtualWindow } from "lib/VirtualWindow"

const useStyles = makeStyles({
  virtualBox: {
    height: 370,
    background: "#0002",
    overflow: "auto"
  }
})

routes["/route3"] = <Route3 />

export function Route3() {
  const classes = useStyles()

  return (
    <div className="App">
      <div className={classes.virtualBox}>
        <VirtualWindow totalCount={1500000} item={<VirtualItem />} />
      </div>
    </div>
  )
}
