import { Card, Box, Button, CardActions } from "@material-ui/core"

export function Buttons() {
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
