import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Box,
  Typography
} from "@material-ui/core"
import faker from "faker"

export function DummyUser({ paragraphs = 1 }) {
  const bioParagraphs = Math.floor(Math.random() * 3) + 1
  return (
    <Box m={1} clone>
      <Card>
        <CardHeader
          title={`${faker.name.firstName()} ${faker.name.lastName()}`}
          avatar={<Avatar src={faker.image.avatar()} />}
        />
        <CardContent>
          {Array.from({ length: bioParagraphs }, (_, i) => (
            <Typography key={i} gutterBottom>
              {faker.lorem.paragraph()}
            </Typography>
          ))}
        </CardContent>
      </Card>
    </Box>
  )
}
