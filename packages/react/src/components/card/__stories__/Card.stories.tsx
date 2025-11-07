import { RADII as DEFAULT_RADII } from '~/sb/utils'
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardActionArea,
} from '../index'
import { Avatar, Button, Box, Flex } from '../../index'
import type { CardHeaderProps } from '../index'
import type { Meta, StoryObj } from '@storybook/react-vite'

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

const RADII = [...DEFAULT_RADII].filter((radius) => radius !== 'full')

const SHADOWS = ['xs', 'sm', 'md', 'lg', 'xl'] as const

const meta = {
  title: 'Components/Card',
  component: Card<'div'>,
  argTypes: {
    shadow: {
      control: 'select',
      options: SHADOWS,
    },
    radius: {
      control: 'select',
      options: RADII,
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

export const Default: Story = {}

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

export const Radius: Story = {
  render: (props) => {
    return (
      <Flex gap='4'>
        {RADII.map((radius) => (
          <Card {...props} key={radius} radius={radius} shadow='lg'>
            <CardBody>
              <div>Radius: {radius}</div>
            </CardBody>
          </Card>
        ))}
      </Flex>
    )
  },
}

export const Shadow: Story = {
  render: (props) => {
    return (
      <Flex gap='4'>
        {SHADOWS.map((shadow) => (
          <Card {...props} key={shadow} shadow={shadow}>
            <CardBody>
              <div>Shadow: {shadow}</div>
            </CardBody>
          </Card>
        ))}
      </Flex>
    )
  },
}
