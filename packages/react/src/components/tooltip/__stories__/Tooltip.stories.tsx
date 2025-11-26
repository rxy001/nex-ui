import { useRef, useState } from 'react'
import { COLORS as DEFAULT_COLORS, RADII, SIZES } from '~/sb/utils'
import { upperFirst } from '@nex-ui/utils'
import { Box } from '../../box'
import { Tooltip } from '../Tooltip'
import { Button } from '../../button'
import { Flex } from '../../flex'
import type { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { TooltipProps } from '../types'

function Container({ children }: { children: ReactNode }) {
  return (
    <Flex
      sx={{
        w: '100vw',
        h: '100vh',
        columnGap: 60,
      }}
      justify='center'
      align='center'
      wrap='wrap'
    >
      {children}
    </Flex>
  )
}

const COLORS = ['default', ...DEFAULT_COLORS] as const

const PLACEMENTS = [
  'top-start',
  'top',
  'top-end',
  'right-start',
  'right',
  'right-end',
  'bottom-start',
  'bottom',
  'bottom-end',
  'left-start',
  'left',
  'left-end',
] as const

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip<'div'>,
  argTypes: {
    color: {
      options: COLORS,
      control: 'select',
    },
    size: {
      options: SIZES,
      control: 'select',
    },
    radius: {
      options: RADII,
      control: 'select',
    },
    placement: {
      options: PLACEMENTS,
      control: 'select',
    },
    closeOnEscape: {
      control: 'boolean',
    },
    closeDelay: {
      control: 'number',
    },
    openDelay: {
      control: 'number',
    },
    interactive: {
      control: 'boolean',
    },
    animateDisabled: {
      control: 'boolean',
    },
    keepMounted: {
      control: 'boolean',
    },
  },
  args: {
    content: 'This is a tooltip',
  },
  render: (props) => {
    return (
      <Container>
        <Tooltip {...props}>
          <Button>Hover me</Button>
        </Tooltip>
      </Container>
    )
  },
} satisfies Meta<typeof Tooltip<'div'>>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Colors: Story = {
  render: (props) => {
    return (
      <Container>
        {COLORS.map((color) => (
          <Tooltip key={color} {...props} open color={color}>
            <Button>{upperFirst(color)}</Button>
          </Tooltip>
        ))}
      </Container>
    )
  },
}

export const Placements: Story = {
  render: (props) => {
    const renderTooltip = (placement: TooltipProps['placement']) => {
      return (
        <Tooltip {...props} placement={placement} open>
          <Button
            variant='faded'
            sx={{
              textTransform: 'capitalize',
            }}
          >
            {placement}
          </Button>
        </Tooltip>
      )
    }

    return (
      <Container>
        <Flex justify='center'>
          <Flex direction='column' gap='5' sx={{ maxW: 700, flex: 1 }}>
            <Flex gap='80px' justify='space-between'>
              {renderTooltip('top-start')}
              {renderTooltip('top')}
              {renderTooltip('top-end')}
            </Flex>
            <Flex justify='space-between'>
              <Flex direction='column' gap='5'>
                {renderTooltip('left-start')}
                {renderTooltip('left')}
                {renderTooltip('left-end')}
              </Flex>
              <Flex direction='column' gap='5'>
                {renderTooltip('right-start')}
                {renderTooltip('right')}
                {renderTooltip('right-end')}
              </Flex>
            </Flex>
            <Flex gap='80px' justify='space-between'>
              {renderTooltip('bottom-start')}
              {renderTooltip('bottom')}
              {renderTooltip('bottom-end')}
            </Flex>
          </Flex>
        </Flex>
      </Container>
    )
  },
}

export const DefaultOpen: Story = {
  args: {
    defaultOpen: true,
  },
}

function ControlledTooltip(props: TooltipProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Tooltip
        open={open}
        onOpenChange={(isOpen) => setOpen(isOpen)}
        {...props}
      >
        <Button>Hover me</Button>
      </Tooltip>
      <p>Open: {open ? 'open' : 'closed'}</p>
    </>
  )
}

export const Controlled: Story = {
  render: (props) => {
    return (
      <Container>
        <ControlledTooltip {...props} />
      </Container>
    )
  },
}

export const WithOffset: Story = {
  args: {
    offset: 0,
    placement: 'top',
    defaultOpen: true,
  },
  render: (props) => {
    return (
      <Container>
        <Tooltip {...props}>
          <Button>Offset is 0</Button>
        </Tooltip>
      </Container>
    )
  },
}

const FlipTemplate = (props: TooltipProps) => {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <Box
      sx={{
        w: 300,
        h: 200,
        overflow: 'auto',
      }}
    >
      <Box
        sx={{
          w: 800,
          h: 800,
          p: 100,
          position: 'relative',
        }}
        ref={ref}
      >
        <Tooltip container={() => ref.current} {...props}>
          <Button>Scroll the window</Button>
        </Tooltip>
      </Box>
    </Box>
  )
}

export const WithFlip: Story = {
  render: (props) => {
    return (
      <Container>
        <FlipTemplate {...props} />
      </Container>
    )
  },
  args: {
    placement: 'top-start',
    defaultOpen: true,
  },
}

export const WithDelay: Story = {
  render: (props) => {
    return (
      <Container>
        <Tooltip openDelay={500} closeDelay={0} {...props}>
          <Button>Delay open 500ms</Button>
        </Tooltip>
        <Tooltip openDelay={0} closeDelay={500} {...props}>
          <Button>Delay close 500ms</Button>
        </Tooltip>
      </Container>
    )
  },
}
