import { Box, IconButton } from "@material-ui/core"
import { useState, useMemo } from "react"
import { MdExpandLess, MdExpandMore } from "react-icons/md"

export function DummyItem({ item, index }) {
  const [extra, setExtra] = useState(item.upsided || 0)
  item.upsided = extra
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
