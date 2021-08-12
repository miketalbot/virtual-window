import { Box } from "@material-ui/core"
import randomColor from "randomcolor"
import { useMemo } from "react"

export function VirtualItem({ index }) {
  const style = useMemo(
    () => ({
      height: 18,
      width: "100%",
      display: "flex",
      alignItems: "stretch",
      background: randomColor({ seed: index })
    }),
    [index]
  )
  return (
    <div style={style}>
      <Box
        borderTop="1px dotted #0002"
        minWidth={60}
        textAlign="right"
        bgcolor="white"
        pl={1}
        pr={1}
      >
        <Box fontSize={11} fontFamily="monospace">
          {index}
        </Box>
      </Box>
      <Box flex={1} />
    </div>
  )
}
