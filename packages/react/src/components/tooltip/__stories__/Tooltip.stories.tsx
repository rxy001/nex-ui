import { useRef, useState } from 'react'
import { Box } from '../../box'
import { Tooltip } from '../Tooltip'
import { Button } from '../../button'
import { Flex } from '../../flex'
import type { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import type { DOMMotionComponents } from 'motion/react'
import type { TooltipProps } from '../types'
import type { ButtonProps } from '../../button'

function Container({ children }: { children: ReactNode }) {
  return (
    <Flex
      sx={{
        w: '100vw',
        h: '100vh',
      }}
      justify='center'
      align='center'
      wrap='wrap'
      gap='4'
    >
      {children}
    </Flex>
  )
}

function Trigger(props: ButtonProps) {
  return (
    <Button
      sx={{
        textTransform: 'capitalize',
      }}
      {...props}
    />
  )
}

const colors = [
  'default',
  'blue',
  'orange',
  'cyan',
  'gray',
  'red',
  'green',
  'pink',
  'purple',
  'yellow',
] as const

const placements = [
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
  component: Tooltip<DOMMotionComponents['div']>,
  argTypes: {
    color: {
      options: colors,
      control: 'select',
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: 'select',
    },
    radius: {
      options: ['none', 'sm', 'md', 'lg', 'full'],
      control: 'select',
    },
    placement: {
      options: placements,
      control: 'select',
    },
    action: {
      options: ['hover', 'click', 'focus'],
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
  },
  args: {
    size: 'md',
    radius: 'md',
    placement: 'bottom',
    action: 'hover',
    closeOnEscape: true,
  },
  render: (props) => {
    return (
      <Container>
        <Tooltip content='This is a tooltip' {...props}>
          <Trigger>trigger</Trigger>
        </Tooltip>
      </Container>
    )
  },
} satisfies Meta<typeof Tooltip<DOMMotionComponents['div']>>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Colors: Story = {
  render: (props) => {
    return (
      <Flex
        sx={{
          w: '100vw',
          h: '100vh',
        }}
        justify='center'
        align='center'
        gap='5'
        wrap='wrap'
      >
        {colors.map((color) => (
          <Tooltip
            key={color}
            content='This is a tooltip'
            {...props}
            color={color}
          >
            <Trigger>{color}</Trigger>
          </Tooltip>
        ))}
      </Flex>
    )
  },
}

export const Placements: Story = {
  render: (props) => {
    return (
      <Container>
        <Box
          sx={{
            display: 'grid',
            gap: '5',
            gridTemplateColumns: 'repeat(3, max-content)',
          }}
        >
          {placements.map((placement) => (
            <Tooltip
              key={placement}
              content='This is a tooltip'
              {...props}
              placement={placement}
            >
              <Trigger>{placement}</Trigger>
            </Tooltip>
          ))}
        </Box>
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
    <Tooltip
      content='This is a tooltip'
      open={open}
      onOpenChange={(isOpen) => setOpen(isOpen)}
      {...props}
    >
      <Trigger onClick={() => setOpen(!open)}>
        {open ? 'close' : 'open'}
      </Trigger>
    </Tooltip>
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
    content: 'Offset is 0',
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
        <Tooltip
          container={() => ref.current}
          content='This is a tooltip'
          {...props}
        >
          <Trigger>Scroll down</Trigger>
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
        <Tooltip
          content='This is a tooltip'
          openDelay={500}
          closeDelay={0}
          {...props}
        >
          <Trigger>Delay Open 500ms</Trigger>
        </Tooltip>
        <Tooltip
          content='This is a tooltip'
          openDelay={0}
          closeDelay={500}
          {...props}
        >
          <Trigger>Delay Close 500ms</Trigger>
        </Tooltip>
      </Container>
    )
  },
}
