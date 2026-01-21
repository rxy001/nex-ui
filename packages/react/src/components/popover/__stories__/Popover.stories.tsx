import { useRef, useState } from 'react'
import { COLORS as DEFAULT_COLORS, RADII } from '~/sb/utils'
import { Box } from '../../box'
import { Popover, PopoverTrigger, PopoverContent } from '../index'
import { Button } from '../../button'
import { Flex } from '../../flex'
import { Input } from '../../input'
import type { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { PopoverContentProps, PopoverProps } from '../types'

function Container({ children }: { children: ReactNode }) {
  return (
    <Flex
      sx={{
        w: '100%',
        h: '100%',
      }}
      justify='center'
      align='center'
      wrap='wrap'
      gap='5'
    >
      {children}
    </Flex>
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

const COLORS = ['default', ...DEFAULT_COLORS] as const

type PopoverTemplateProps = PopoverProps &
  Pick<
    PopoverContentProps,
    'restoreFocus' | 'loop' | 'maxHeight' | 'maxWidth' | 'color' | 'radius'
  > & {
    triggerText?: ReactNode
  }

function PopoverTemplate(props: PopoverTemplateProps) {
  const {
    triggerText,
    restoreFocus,
    loop,
    maxHeight,
    maxWidth,
    color,
    radius,
    ...other
  } = props

  return (
    <Popover {...other}>
      <PopoverTrigger>
        <Button
          sx={{
            textTransform: 'capitalize',
          }}
        >
          {triggerText ?? 'Click me'}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        restoreFocus={restoreFocus}
        loop={loop}
        maxHeight={maxHeight}
        maxWidth={maxWidth}
        color={color}
        radius={radius}
      >
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
      options: RADII,
      control: 'select',
    },
    loop: {
      control: 'boolean',
    },
    restoreFocus: {
      control: 'boolean',
    },
    maxWidth: {
      control: 'number',
    },
    maxHeight: {
      control: 'number',
    },
    offset: {
      control: 'number',
    },
    shift: {
      control: 'boolean',
    },
  },
  render: (props) => (
    <Container>
      <PopoverTemplate {...props} />
    </Container>
  ),
} satisfies Meta<PopoverTemplateProps>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

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
          {PLACEMENTS.map((placement) => (
            <PopoverTemplate
              key={placement}
              placement={placement}
              triggerText={placement}
              {...props}
            />
          ))}
        </Box>
      </Container>
    )
  },
}

export const Colors: Story = {
  render: (props) => {
    return (
      <Container>
        {COLORS.map((color) => (
          <PopoverTemplate
            key={color}
            color={color}
            triggerText={color}
            {...props}
          />
        ))}
      </Container>
    )
  },
}

export const DefaultOpen: Story = {
  args: {
    defaultOpen: true,
  },
}

function ControlledPopover(props: PopoverTemplateProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <PopoverTemplate {...props} open={open} onOpenChange={setOpen} />
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
        <PopoverTemplate {...props} triggerText='Offset is 0' />
      </Container>
    )
  },
}

const FlipTemplate = (props: PopoverTemplateProps) => {
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

export const WithForm: Story = {
  render: (props) => {
    const { restoreFocus, loop, maxHeight, maxWidth, color, radius, ...other } =
      props

    return (
      <Container>
        <Popover {...other}>
          <PopoverTrigger>
            <Button
              sx={{
                textTransform: 'capitalize',
              }}
            >
              Click me
            </Button>
          </PopoverTrigger>
          <PopoverContent
            restoreFocus={restoreFocus}
            loop={loop}
            maxHeight={maxHeight}
            maxWidth={maxWidth}
            color={color}
            radius={radius}
          >
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
