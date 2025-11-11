import { HeartFilled, LikeFilled, DislikeFilled } from '@nex-ui/icons'
import { upperFirst } from '@nex-ui/utils'
import {
  SIZES,
  COLORS,
  RADII,
  toReadableSize,
  toReadableRadius,
} from '~/sb/utils'
import { Button } from '../Button'
import { Flex } from '../../flex'
import type { Meta, StoryObj } from '@storybook/react-vite'

const VARIANTS = ['solid', 'outlined', 'ghost', 'faded'] as const

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
      options: VARIANTS,
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
    href: {
      control: 'text',
    },
    color: {
      options: COLORS,
      control: 'select',
    },
    loading: {
      control: 'boolean',
    },
    rippleDisabled: {
      control: 'boolean',
    },
    spinnerPlacement: {
      options: ['start', 'end'],
      control: 'select',
    },
  },
  args: {
    children: 'Button',
  },
} satisfies Meta<typeof Button<'button'>>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const FullWidthButton: Story = {
  args: {
    fullWidth: true,
  },
}

export const Variants: Story = {
  render: (props) => {
    return (
      <Flex gap='5' wrap='wrap'>
        {VARIANTS.map((variant) => (
          <Button {...props} key={variant} variant={variant}>
            {upperFirst(variant)}
          </Button>
        ))}
      </Flex>
    )
  },
}

export const Colors: Story = {
  render: (props) => {
    return (
      <Flex gap='5' wrap='wrap'>
        {COLORS.map((color) => (
          <Button {...props} key={color} color={color}>
            {upperFirst(color)}
          </Button>
        ))}
      </Flex>
    )
  },
}

export const Sizes: Story = {
  render: (props) => {
    return (
      <Flex gap='5' align='center'>
        {SIZES.map((size) => (
          <Button {...props} key={size} size={size}>
            {toReadableSize(size)}
          </Button>
        ))}
      </Flex>
    )
  },
}

export const Radius: Story = {
  render: (props) => {
    return (
      <Flex gap='5' align='center'>
        {RADII.map((radius) => (
          <Button {...props} key={radius} radius={radius}>
            {toReadableRadius(radius)}
          </Button>
        ))}
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

export const rippleDisabled: Story = {
  args: {
    rippleDisabled: true,
  },
}
