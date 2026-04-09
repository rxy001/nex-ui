import { useRef, useState } from 'react'
import { COLORS as DEFAULT_COLORS, SIZES } from '~/sb/utils'
import { Box } from '../../box'
import { Popover, PopoverTrigger, PopoverContent } from '../index'
import { Button } from '../../button'
import { Flex } from '../../flex'
import { Input } from '../../input'
import type { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { PopoverContentProps, PopoverProps } from '../types'

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

const COLORS = ['default', ...DEFAULT_COLORS] as const

type PopoverTemplateProps = PopoverProps &
  PopoverContentProps & {
    triggerText?: ReactNode
  }

function PopoverTemplate(props: PopoverTemplateProps) {
  const {
    open,
    onOpenChange,
    defaultOpen,
    triggerText = 'Click me',
    ...other
  } = props

  return (
    <Popover open={open} onOpenChange={onOpenChange} defaultOpen={defaultOpen}>
      <PopoverTrigger>
        <Button
          sx={{
            textTransform: 'capitalize',
          }}
        >
          {triggerText}
        </Button>
      </PopoverTrigger>
      <PopoverContent {...other}>
        <Box
          sx={{
            fontWeight: 'bold',
          }}
        >
          Popover Content
        </Box>
        <Box
          sx={{
            fs: '0.85em',
          }}
        >
          This is the popover content.
        </Box>
      </PopoverContent>
    </Popover>
  )
}

const meta = {
  title: 'Components/Popover',
  component: PopoverTemplate,
  argTypes: {
    placement: {
      options: PLACEMENTS,
      control: 'select',
    },
    disableAnimation: {
      control: 'boolean',
    },
    keepMounted: {
      control: 'boolean',
    },
    closeOnEscape: {
      control: 'boolean',
    },
    closeOnDetached: {
      control: 'boolean',
    },
    color: {
      options: COLORS,
      control: 'select',
    },
    radius: {
      options: ['none', 'sm', 'md', 'lg'],
      control: 'select',
    },
    loopFocus: {
      control: 'boolean',
    },
    restoreFocus: {
      control: 'boolean',
    },
    offset: {
      control: 'number',
    },
    shift: {
      control: 'boolean',
    },
    size: {
      options: SIZES,
      control: 'select',
    },
  },
} satisfies Meta<PopoverTemplateProps>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export function Placements(props: PopoverTemplateProps) {
  return (
    <Flex
      sx={{
        w: 'full',
        h: 'full',
      }}
      justify='center'
      align='center'
      wrap='wrap'
      gap='5'
    >
      <Box
        sx={{
          display: 'grid',
          gap: '5',
          gridTemplateColumns: 'repeat(3, max-content)',
        }}
      >
        {PLACEMENTS.map((placement) => (
          <PopoverTemplate
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

export function Colors(props: PopoverTemplateProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {COLORS.map((color) => (
        <PopoverTemplate
          {...props}
          key={color}
          color={color}
          triggerText={color}
        />
      ))}
    </Flex>
  )
}

export const DefaultOpen: Story = {
  args: {
    defaultOpen: true,
  },
}

export function Controlled(props: PopoverTemplateProps) {
  const [open, setOpen] = useState(false)

  return (
    <Flex gap='5'>
      <PopoverTemplate {...props} open={open} onOpenChange={setOpen} />
      <p>Open: {open ? 'open' : 'closed'}</p>
    </Flex>
  )
}

export function WithOffset(props: PopoverTemplateProps) {
  return (
    <PopoverTemplate
      {...props}
      offset={0}
      defaultOpen
      triggerText='Offset is 0'
    />
  )
}

export function WithFlip(props: PopoverTemplateProps) {
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
        <PopoverTemplate
          container={() => ref.current}
          triggerText='Scroll the window'
          {...props}
        />
      </Box>
    </Box>
  )
}

export function WithForm(props: PopoverTemplateProps) {
  const { open, onOpenChange, defaultOpen, ...other } = props

  return (
    <Popover open={open} onOpenChange={onOpenChange} defaultOpen={defaultOpen}>
      <PopoverTrigger>
        <Button>Click Me</Button>
      </PopoverTrigger>
      <PopoverContent {...other}>
        <Box as='form'>
          <Flex
            direction='column'
            gap='2'
            sx={{
              py: '2',
            }}
          >
            <Box
              sx={{
                fs: 'sm',
                fontWeight: 'bold',
              }}
            >
              Profile
            </Box>
            <Input
              label='First Name'
              labelPlacement='float-inside'
              defaultValue='Ren'
              size='sm'
            />
            <Input
              label='Last Name'
              labelPlacement='float-inside'
              defaultValue='XY'
              size='sm'
            />
            <Input
              label='Country'
              labelPlacement='float-inside'
              defaultValue='China'
              size='sm'
            />
          </Flex>
        </Box>
      </PopoverContent>
    </Popover>
  )
}
