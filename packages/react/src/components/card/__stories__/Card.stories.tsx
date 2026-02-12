import {
  RADII as DEFAULT_RADII,
  toReadableRadius,
  toReadableSize,
  withLabel,
} from '~/sb/utils'
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardActionArea,
} from '../index'
import { Avatar, Button, Box, Flex } from '../../index'
import type { CardHeaderProps, CardProps } from '../index'
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
        <CardHeaderTemplate />
      </Card>
    )
  },
} satisfies Meta<typeof Card<'div'>>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

function renderWithAction(props?: CardProps) {
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
}
export const WithAction: Story = {
  render: renderWithAction,
}

function renderWithBodyAndFooter(props?: CardProps) {
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
}
export const WithBodyAndFooter: Story = {
  render: renderWithBodyAndFooter,
}

function renderWithActionArea(props?: CardProps) {
  return (
    <Card {...props}>
      <CardHeaderTemplate />
      <CardActionArea>
        <CardBody>This action area is clickable.</CardBody>
      </CardActionArea>
    </Card>
  )
}
export const WithActionArea: Story = {
  render: renderWithActionArea,
}

export const Hoverable: Story = {
  args: {
    hoverable: true,
  },
}

function renderBlurred(props?: CardProps) {
  return (
    <Box
      sx={{
        backgroundImage: 'linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%)',
        maxW: '345px',
        borderRadius: 'lg',
      }}
    >
      <Card
        {...props}
        blurred
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
}
export const BlurredCard: Story = {
  render: renderBlurred,
}

function renderRadii(props?: CardProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {RADII.map((radius) =>
        withLabel(`${toReadableRadius(radius)}Radius`)(
          <Card {...props} key={radius} radius={radius} shadow='lg'>
            <CardHeaderTemplate />
          </Card>,
        ),
      )}
    </Flex>
  )
}
export const Radius: Story = {
  render: renderRadii,
}

function renderShadows(props?: CardProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {SHADOWS.map((shadow) =>
        withLabel(`${toReadableSize(shadow)}Shadow`)(
          <Card {...props} key={shadow} shadow={shadow}>
            <CardHeaderTemplate />
          </Card>,
        ),
      )}
    </Flex>
  )
}
export const Shadow: Story = {
  render: renderShadows,
}

export const Chromatic: Story = {
  render: () => {
    return (
      <>
        {withLabel('WithAction')(renderWithAction())}
        {withLabel('WithBodyAndFooter')(renderWithBodyAndFooter())}
        {withLabel('WithActionArea')(renderWithActionArea())}
        {withLabel('BlurredCard')(renderBlurred())}
        {renderRadii()}
        {renderShadows()}
      </>
    )
  },
  parameters: {
    chromatic: {
      disable: false,
    },
    controls: {
      disable: true,
    },
  },
}
