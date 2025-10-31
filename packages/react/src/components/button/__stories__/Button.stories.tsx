import { HeartFilled, LikeFilled, DislikeFilled } from '@nex-ui/icons'
import { Button } from '../Button'
import { Flex } from '../../flex'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/Button',
  component: Button<'button'>,
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    iconOnly: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
    variant: {
      options: ['solid', 'outlined', 'ghost', 'faded'],
      control: 'select',
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: 'select',
    },
    radius: {
      options: ['sm', 'md', 'lg', 'full'],
      control: 'select',
    },
    href: {
      control: 'text',
    },
    loading: {
      control: 'boolean',
    },
    disableRipple: {
      control: 'boolean',
    },
    spinnerPlacement: {
      options: ['start', 'end'],
      control: 'select',
    },
  },
  args: {
    children: 'Button',
    size: 'md',
    variant: 'solid',
    disabled: false,
    fullWidth: false,
    iconOnly: false,
    loading: false,
    spinnerPlacement: 'start',
  },
} satisfies Meta<typeof Button<'button'>>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const FullWidthButton: Story = {
  args: {
    fullWidth: true,
  },
}

export const Variants: Story = {
  render: (props) => {
    return (
      <Flex gap={30} wrap='wrap'>
        <Button {...props} variant='solid'>
          Solid
        </Button>
        <Button {...props} variant='outlined'>
          Outlined
        </Button>
        <Button {...props} variant='ghost'>
          Ghost
        </Button>
        <Button {...props} variant='faded'>
          Faded
        </Button>
      </Flex>
    )
  },
}

export const Colors: Story = {
  render: (props) => {
    return (
      <Flex gap={30} wrap='wrap'>
        <Button {...props} key='blue'>
          Blue
        </Button>
        <Button {...props} key='purple' color='purple'>
          Purple
        </Button>
        <Button {...props} key='gray' color='gray'>
          Gray
        </Button>
        <Button {...props} key='red' color='red'>
          Red
        </Button>
        <Button {...props} key='cyan' color='cyan'>
          Cyan
        </Button>
        <Button {...props} key='pink' color='pink'>
          Pink
        </Button>
        <Button {...props} key='yellow' color='yellow'>
          Yellow
        </Button>
        <Button {...props} key='green' color='green'>
          Green
        </Button>
        <Button {...props} key='orange' color='orange'>
          Orange
        </Button>
      </Flex>
    )
  },
}

export const LoadingButton: Story = {
  args: {
    loading: true,
    onClick: () => {},
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const IconButton: Story = {
  args: {
    iconOnly: true,
    children: <HeartFilled />,
    'aria-label': 'Like',
  },
}

export const LoadingIconButton: Story = {
  args: {
    iconOnly: true,
    loading: true,
    'aria-label': 'Loading',
    children: <HeartFilled />,
  },
}

export const WithIcons: Story = {
  args: {
    children: 'Button',
    startIcon: <LikeFilled />,
    endIcon: <DislikeFilled />,
  },
}

export const DisableRipple: Story = {
  args: {
    disableRipple: true,
  },
}
