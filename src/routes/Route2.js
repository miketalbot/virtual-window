import { VirtualRepeat } from "lib/VirtualRepeat"
import { useStyles } from "../App"
import { DummyUser } from "./DummyUser"
import { Buttons } from "./Buttons"

export function Route2() {
  const classes = useStyles()

  return (
    <div className="App">
      <div className={classes.virtualBox}>
        <VirtualRepeat overscan={3}>
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
        </VirtualRepeat>
      </div>
    </div>
  )
}
