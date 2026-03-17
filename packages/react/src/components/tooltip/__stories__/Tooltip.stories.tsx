import { useRef, useState } from 'react'
import { COLORS as DEFAULT_COLORS, RADII, SIZES } from '~/sb/utils'
import { Box } from '../../box'
import { Tooltip } from '../Tooltip'
import { Button } from '../../button'
import { Flex } from '../../flex'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { TooltipProps } from '../types'

const COLORS = ['default', ...DEFAULT_COLORS] as const

type TooltipTemplateProps = TooltipProps & {
  triggerText?: string
}
function TooltipTemplate({
  triggerText = 'hover me',
  ...props
}: TooltipTemplateProps) {
  return (
    <Tooltip content='This is a tooltip' {...props}>
      <Button
        sx={{
          textTransform: 'capitalize',
        }}
      >
        {triggerText}
      </Button>
    </Tooltip>
  )
}

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
  component: TooltipTemplate,
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
    closeOnDetached: {
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
    disableAnimation: {
      control: 'boolean',
    },
    keepMounted: {
      control: 'boolean',
    },
    closeOnClick: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof TooltipTemplate>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Colors = (props: TooltipProps) => {
  return (
    <Flex wrap='wrap' gap='5'>
      {COLORS.map((color) => (
        <TooltipTemplate
          {...props}
          key={color}
          color={color}
          placement='bottom'
          triggerText={color}
        />
      ))}
    </Flex>
  )
}

export const Placements = (props: TooltipProps) => {
  return (
    <Flex
      sx={{
        w: '100%',
        h: '100%',
      }}
      justify='center'
      align='center'
      wrap='wrap'
    >
      <Box
        sx={{
          display: 'grid',
          gap: '5',
          gridTemplateColumns: 'repeat(3, max-content)',
        }}
      >
        {PLACEMENTS.map((placement) => (
          <TooltipTemplate
            {...props}
            key={placement}
            placement={placement}
            triggerText={placement}
          />
        ))}
      </Box>
    </Flex>
  )
}

export const DefaultOpen: Story = {
  args: {
    defaultOpen: true,
  },
}

export const Controlled = (props: TooltipProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Flex gap='5'>
      <TooltipTemplate
        {...props}
        open={open}
        onOpenChange={(isOpen) => setOpen(isOpen)}
      />
      <p>Open: {open ? 'open' : 'closed'}</p>
    </Flex>
  )
}

export const WithOffset = (props: TooltipProps) => {
  return (
    <TooltipTemplate
      {...props}
      defaultOpen
      offset={0}
      triggerText='Offset is 0'
    />
  )
}

export const WithFlip = (props: TooltipProps) => {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <Box
      sx={{
        w: 300,
        h: 200,
        overflow: 'auto',
        border: '1px solid #000',
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
        <TooltipTemplate
          {...props}
          container={() => ref.current}
          triggerText='Scroll the window'
        />
      </Box>
    </Box>
  )
}

export const WithDelay = (props: TooltipProps) => (
  <Flex gap='5'>
    <TooltipTemplate
      {...props}
      openDelay={500}
      closeDelay={0}
      triggerText='Delay open 500ms'
    />
    <TooltipTemplate
      {...props}
      openDelay={0}
      closeDelay={500}
      triggerText='Delay close 500ms'
    />
  </Flex>
)
