import { VirtualWindow } from "lib/VirtualWindow"

import { DummyUser } from "./DummyUser"
import { Buttons } from "./Buttons"
import { routes } from "./routes"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  virtualBox: {
    height: 370,
    background: "#0002",
    overflow: "auto"
  }
})

routes["/route2"] = <Route2 />

export function Route2() {
  const classes = useStyles()

  return (
    <div className="App">
      <div className={classes.virtualBox}>
        <VirtualWindow overscan={3}>
          <DummyUser />
          <DummyUser />
          <DummyUser />
          <Buttons />
          <DummyUser />
          <DummyUser />
          <DummyUser />
          <DummyUser />
          <Buttons />
          <DummyUser />
          <Buttons />
          <DummyUser />
          <Buttons />
          <DummyUser />
          <DummyUser />
          <DummyUser />
          <Buttons />
        </VirtualWindow>
      </div>
    </div>
  )
}
