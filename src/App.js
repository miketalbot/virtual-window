import "./styles.css"
import { makeStyles } from "@material-ui/core"
import "./virtual-repeat.css"
import { Route1 } from "./Route1"
import { Route3 } from "./Route3"
import { Route2 } from "./Route2"
import { Route4 } from "./Route4"

export const useStyles = makeStyles({
  virtualBox: {
    height: 500,
    background: "#0002",
    overflow: "auto"
  }
})

const routes = {
  "/route1": <Route1 />,
  "/route2": <Route2 />,
  "/route3": <Route3 />,
  "/route4": <Route4 />,
  fallback: <Route2 />
}

export default function App() {
  return routes[window.location.pathname] ?? routes.fallback
}
