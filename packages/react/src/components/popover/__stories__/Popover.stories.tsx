import { useRef, useState } from 'react'
import { Box } from '../../box'
import { Popover, PopoverTrigger, PopoverContent } from '../index'
import { Button } from '../../button'
import { Flex } from '../../flex'
import { Input } from '../../input'
import type { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { DOMMotionComponents } from 'motion/react'
import type { PopoverContentProps, PopoverProps } from '../types'
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

const Content = (props: PopoverContentProps) => (
  <PopoverContent {...props}>
    <Box
      sx={{
        fontWeight: 'bold',
      }}
    >
      Popover Content
    </Box>
    <Box
      sx={{
        fs: 'sm',
      }}
    >
      This is the popover content
    </Box>
  </PopoverContent>
)

const meta = {
  title: 'Components/Popover',
  component: Popover<DOMMotionComponents['div']>,
  argTypes: {
    placement: {
      options: placements,
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
    closeOnDetached: {
      control: 'boolean',
    },
  },
  args: {
    placement: 'top',
    closeOnEscape: true,
    closeOnDetached: true,
  },
  render: (props) => {
    return (
      <Container>
        <Popover {...props}>
          <PopoverTrigger>
            <Trigger>click me</Trigger>
          </PopoverTrigger>
          <Content />
        </Popover>
      </Container>
    )
  },
} satisfies Meta<typeof Popover<DOMMotionComponents['div']>>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
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
            <Popover {...props} key={placement} placement={placement}>
              <PopoverTrigger>
                <Trigger>{placement}</Trigger>
              </PopoverTrigger>
              <Content />
            </Popover>
          ))}
        </Box>
      </Container>
    )
  },
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
          <Popover key={color} {...props}>
            <PopoverTrigger>
              <Trigger>{color}</Trigger>
            </PopoverTrigger>
            <Content color={color} />
          </Popover>
        ))}
      </Flex>
    )
  },
}

export const DefaultOpen: Story = {
  args: {
    defaultOpen: true,
  },
}

function ControlledPopover(props: PopoverProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Popover
        open={open}
        onOpenChange={(isOpen) => setOpen(isOpen)}
        {...props}
      >
        <PopoverTrigger>
          <Trigger>click me</Trigger>
        </PopoverTrigger>
        <Content />
      </Popover>
      <p>Open: {open ? 'open' : 'closed'}</p>
    </>
  )
}

export const Controlled: Story = {
  render: (props) => {
    return (
      <Container>
        <ControlledPopover {...props} />
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
        <Popover {...props}>
          <PopoverTrigger>
            <Trigger>offset is 0</Trigger>
          </PopoverTrigger>
          <Content />
        </Popover>
      </Container>
    )
  },
}

const FlipTemplate = (props: PopoverProps) => {
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
        <Popover container={() => ref.current} {...props}>
          <PopoverTrigger>
            <Trigger>scroll the window</Trigger>
          </PopoverTrigger>
          <Content />
        </Popover>
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
        <Popover openDelay={500} closeDelay={0} {...props}>
          <PopoverTrigger>
            <Trigger>Delay Open 500ms</Trigger>
          </PopoverTrigger>
          <PopoverContent>This is the content of the popover.</PopoverContent>
        </Popover>
        <Popover openDelay={0} closeDelay={500} {...props}>
          <PopoverTrigger>
            <Trigger>Delay Close 500ms</Trigger>
          </PopoverTrigger>
          <PopoverContent>This is the content of the popover.</PopoverContent>
        </Popover>
      </Container>
    )
  },
}

export const WithForm: Story = {
  render: (props) => {
    return (
      <Container>
        <Popover {...props}>
          <PopoverTrigger>
            <Trigger>click me</Trigger>
          </PopoverTrigger>
          <PopoverContent>
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
                    fs: 'md',
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
      </Container>
    )
  },
}
