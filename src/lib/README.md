# virtual-window

For background on this
component, [see this Dev.to Article](https://dev.to/miketalbot/react-virtual-window-virtualise-anything-for-a-performance-boost-full-tutorial-3moe).

## Installation

```bash
npm i virtual-window
```

## Usage

You can place a Virtual Window over a set of arbitrary React components by simply wrapping them

```jsx
function MyComponent({ list }) {
  return (
    <VirtualWindow>
      <MyComponent1 />
      {list.map(l => (
        <SomeComponent key={l.id} data={l} />
      ))}
      <MyLastComponent />
    </VirtualWindow>
  )
}
```

You can also use the mode where it is a virtual list, in this mode you specify a number of parameters

| Parameter        | Default       | Purpose                                                                                                                                  |
| ---------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| className        |               | A class to apply to the outer wrapper component |
| item             | `<Simple/>` a fragment like component  | The item that will be used to display this element. This component is passed properties for the item being displayed and the `index` of it. <br><br>e.g. `<VirtualWindow list={items} item={<MyComponent withAny={prop}/>} />` |
| itemSize         | 36            | The default size to expect for items |
| keyFn            | WeakMap of items to unique integers | A function to create a key for an item in the list. <br><br>e.g. `<VirtualWindow list={items} keyFn={v=>v.id}/>` |
| list             |               | The array of items to display |
| pass             | item          | a string containing the name of the property to pass to the `item` being rendered. |
| onConfigure      |               | A callback function that receives properties of the Virtual Window in attributes called `expectedSize` and `scrollingElement`.  The callback is triggered whenever measurement detects a change in the expected size of items.
| onVisibleChanged |               | A callback function that receives the first and last visible items as they change `onVisibleChanged={(first, last)=>console.log(first, last)}`. <br><br>You can use this property to update the list and provide endless scrolling.
| overscan         | 2             | The number of additional pages to render below and above the visible list for sizing |
| totalCount       |               | The number of records to render, this is used instead of a `list` to have the component totally virtual.  In this case the `item` passed to the rendered component is the index to use for the data. |

### Sizing

By default the virtual item container has a `height` of `100%` and a `flex` of `1`.  This allows it to resize into various
useful containers.  If you need to specify a height then either size the wrapping component or pass a `className` to the `<VirtualWindow/>`

### Example

```jsx
import { VirtualWindow } from "lib/VirtualWindow"
import { Box, IconButton } from "@material-ui/core"
import { useState, useMemo } from "react"
import { MdExpandLess, MdExpandMore } from "react-icons/md"
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


export const items = Array.from({ length: 2000 }, (_, i) => ({
  content: i,
  color: randomColor()
}))

export default function App() {
  const classes = useStyles()

  return (
    <div className="App">
      <div className={classes.virtualBox}>
        <VirtualWindow list={items} item={<DummyItem />} />
      </div>
    </div>
  )
}


export function DummyItem({ item, index }) {
  const [extra, setExtra] = useState(item.upsized || 0)
  item.upsized = extra
  const style = useMemo(
    () => ({
      minHeight: 34 + (index & 7) * 9 + extra,
      width: "100%",
      background: item.color
    }),
    [item.color, extra, index]
  )
  return (
    <Box display="flex" flexDirection="row" p={2} style={style}>
      <Box flex={1} />
      <Box
        borderRadius={4}
        bgcolor="#ffffffdc"
        color="#444"
        boxShadow="inset 0 0 6px 0px #000c"
        p={1}
        display="flex"
        alignItems="center"
      >
        <Box mr={2}>{item.content}</Box>
        <Box>{JSON.stringify(style, null, 2)}</Box>
        <Box
          ml={1}
          onClick={() => {
            if (extra) {
              setExtra(0)
            } else {
              setExtra(Math.floor(Math.random() * 90) + 20)
            }
          }}
        >
          <IconButton color="primary">
            {extra ? <MdExpandLess /> : <MdExpandMore />}
          </IconButton>
        </Box>
      </Box>
      <Box flex={1} />
    </Box>
  )
}

```

## Demonstration

[On CodeSandBox](https://codesandbox.io/s/virtual-nlm7m-nlm7m?initialpath=%2Froute2)
