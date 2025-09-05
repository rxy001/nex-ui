import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardActionArea,
} from '../index'
import { Avatar, Button, Box, Flex } from '../../index'
import type { CardHeaderProps } from '../index'
import type { Meta, StoryObj } from '@storybook/react'

function CardHeaderTemplate(props: CardHeaderProps) {
  return (
    <CardHeader
      title='Nex UI'
      subtitle='React component library'
      avatar={
        <Avatar
          src='https://github.com/rxy001/nex-ui/raw/main/assets/logo.png'
          sx={{
            bg: 'transparent',
          }}
        />
      }
      {...props}
    />
  )
}

const meta = {
  title: 'Components/Card',
  component: Card<'div'>,
  argTypes: {
    shadow: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    blurred: {
      control: 'boolean',
    },
    hoverable: {
      control: 'boolean',
    },
  },
  render: (props) => {
    return (
      <Card {...props}>
        <CardHeaderTemplate
          action={
            <Button variant='ghost' color='blue' size='sm'>
              View
            </Button>
          }
        />
      </Card>
    )
  },
} satisfies Meta<typeof Card<'div'>>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithBodyAndFooter: Story = {
  render: (props) => {
    return (
      <Card {...props}>
        <CardHeaderTemplate />
        <CardBody>
          <div>Make beautiful websites with ease and efficiency.</div>
        </CardBody>
        <CardFooter>
          <Button color='blue' size='sm'>
            Share
          </Button>
        </CardFooter>
      </Card>
    )
  },
}

export const WithActionArea: Story = {
  render: (props) => {
    return (
      <Card {...props}>
        <CardActionArea>
          <CardBody>This action area is clickable.</CardBody>
        </CardActionArea>
      </Card>
    )
  },
}

export const Hoverable: Story = {
  args: {
    hoverable: true,
  },
}

export const BlurredCard: Story = {
  args: {
    blurred: true,
  },
  render: (props) => {
    return (
      <Box
        sx={{
          backgroundImage:
            'linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%)',
          maxW: '345px',
          borderRadius: 'lg',
        }}
      >
        <Card
          {...props}
          sx={{
            bg: {
              _DEFAULT: 'white/50',
              _dark: 'black/60',
            },
          }}
        >
          <CardHeaderTemplate />
          <CardBody>
            <div>Make beautiful websites with ease and efficiency.</div>
          </CardBody>
          <CardFooter as={Flex} gap='2'>
            <Button color='blue' size='sm' variant='ghost'>
              SHARE
            </Button>
            <Button color='blue' size='sm' variant='ghost'>
              LEARN MORE
            </Button>
          </CardFooter>
        </Card>
      </Box>
    )
  },
}
