import "./styles.css"
import { useMeasurement } from "./useMeasurement"
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Box,
  makeStyles,
  Button,
  Typography,
  CardActions
} from "@material-ui/core"
import "./virtual-repeat.css"
import { VirtualRepeat } from "./VirtualRepeat"
import randomColor from "randomcolor"
import { useState, useMemo } from "react"
import faker from "faker"

const useStyles = makeStyles({
  virtualBox: {
    height: 500,
    background: "#0002",
    overflow: "auto"
  }
})

const items = Array.from({ length: 127 }, (_, i) => ({
  content: i,
  color: randomColor()
}))

export default function App() {
  switch (window.location.pathname.split("/").slice(-1)[0]) {
    case "route1":
      return <Route1 />
    case "route3":
      return <Route3 />
    default:
      return <Route2 />
  }
}

function Route1() {
  const classes = useStyles()
  const [, attach] = useMeasurement()
  return (
    <div className="App" ref={attach}>
      <div className={classes.virtualBox}>
        <VirtualRepeat list={items} item={<DummyItem />} />
      </div>
    </div>
  )
}

function Route3() {
  const classes = useStyles()
  const [, attach] = useMeasurement()
  return (
    <div className="App" ref={attach}>
      <div className={classes.virtualBox}>
        <VirtualRepeat totalCount={5000000} item={<VirtualItem />} />
      </div>
    </div>
  )
}

function VirtualItem({ index }) {
  const style = useMemo(
    () => ({
      height: 18,
      width: "100%",
      background: randomColor({ seed: index })
    }),
    [index]
  )
  return <div style={style}>{index}</div>
}

function Route2() {
  const classes = useStyles()
  const [, attach] = useMeasurement()
  return (
    <div className="App" ref={attach}>
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

function Buttons() {
  return (
    <Box m={1} clone>
      <Card>
        <CardActions>
          <Button color="primary">Button 1</Button>
          <Button color="secondary">Button 2</Button>
          <Box flex={1} />
          <Button color="primary" variant="contained">
            Button 3
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
}

function DummyUser({ paragraphs = 1 }) {
  const bioParagraphs = Math.floor(Math.random() * 3) + 1
  return (
    <Box m={1} clone>
      <Card>
        <CardHeader
          title={`${faker.name.firstName()} ${faker.name.lastName()}`}
          avatar={<Avatar src={faker.image.avatar()} />}
        />
        <CardContent>
          {Array.from({ length: bioParagraphs }, () => (
            <Typography gutterBottom>{faker.lorem.paragraph()}</Typography>
          ))}
        </CardContent>
      </Card>
    </Box>
  )
}

function DummyItem({ item, index }) {
  const [extra, setExtra] = useState(item.upsided || 0)
  const style = useMemo(
    () => ({
      height: 18 + (index & 7) * 5 + extra,
      width: "100%",
      background: item.color
    }),
    [item.color, extra, index]
  )
  return (
    <div
      onClick={() => {
        setExtra(v => (item.upsided = !v ? 40 : 0))
      }}
      style={style}
    >
      {item.content} = {JSON.stringify(style)}
    </div>
  )
}
