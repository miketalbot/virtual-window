import "./styles.css"

import { Route2 } from "routes/Route2"
import { routes } from "routes"

export default function App() {
  return routes[window.location.pathname] ?? <Route2 />
}
