import { HeartOutlined } from '@nex-ui/icons'
import {
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Button,
  CardFooter,
  Flex,
} from '@nex-ui/react'

export default function App() {
  return (
    <Card>
      <CardHeader
        title='Nex UI'
        subtitle='nexui.dev'
        avatar={
          <Avatar
            sx={{ bg: 'transparent' }}
            src='https://github.com/rxy001/nex-ui/raw/main/assets/logo.png'
          />
        }
        action={
          <Button variant='ghost' radius='full' iconOnly aria-label='Like'>
            <HeartOutlined />
          </Button>
        }
      />
      <CardBody>
        Beautiful, modern and reliable React component library.
      </CardBody>
      <CardFooter as={Flex} gap='4'>
        <Button variant='ghost' size='sm'>
          SHARE
        </Button>
        <Button variant='ghost' size='sm'>
          LEARN MORE
        </Button>
      </CardFooter>
    </Card>
  )
}
