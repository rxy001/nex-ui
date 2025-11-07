import { GithubOutlined } from '@nex-ui/icons'
import { upperFirst } from '@nex-ui/utils'
import {
  COLORS,
  SIZES as DEFAULT_SIZES,
  RADII as DEFAULT_RADII,
  toReadableSize,
} from '~/sb/utils'
import { Badge } from '../Badge'
import { Flex } from '../../flex'
import type { Meta, StoryObj } from '@storybook/react-vite'

const SIZES = ['xs', ...DEFAULT_SIZES] as const
const RADII = ['xs', ...DEFAULT_RADII] as const
const VARIANTS = ['solid', 'subtle', 'outlined', 'faded'] as const

const meta = {
  title: 'Components/Badge',
  component: Badge<'span'>,
  argTypes: {
    size: {
      control: 'select',
      options: SIZES,
    },
    radius: {
      control: 'select',
      options: RADII,
    },
    color: {
      options: COLORS,
      control: 'select',
    },
    variant: {
      control: 'select',
      options: VARIANTS,
    },
    closable: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    children: 'Badge',
  },
} satisfies Meta<typeof Badge<'span'>>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Colors: Story = {
  render: (args) => (
    <Flex gap='5'>
      {COLORS.map((color) => (
        <Badge {...args} key={color} color={color}>
          {upperFirst(color)}
        </Badge>
      ))}
    </Flex>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <Flex gap='5' align='center'>
      {SIZES.map((size) => (
        <Badge {...args} key={size} size={size}>
          {toReadableSize(size)}
        </Badge>
      ))}
    </Flex>
  ),
}

export const Radius: Story = {
  render: (args) => (
    <Flex gap='5' align='center'>
      {RADII.map((radius) => (
        <Badge {...args} key={radius} radius={radius}>
          {toReadableSize(radius)}
        </Badge>
      ))}
    </Flex>
  ),
}

export const Variants: Story = {
  render: (args) => (
    <Flex gap='5' align='center'>
      {VARIANTS.map((variant) => (
        <Badge {...args} key={variant} variant={variant}>
          {upperFirst(variant)}
        </Badge>
      ))}
    </Flex>
  ),
}

export const Closable: Story = {
  render: (args) => (
    <Badge {...args} closable>
      Closable Badge
    </Badge>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const WithIcons: Story = {
  render: (args) => (
    <Flex gap='4'>
      <Badge startIcon={<GithubOutlined />} {...args}>
        Github
      </Badge>
      <Badge endIcon={<GithubOutlined />} {...args}>
        Github
      </Badge>
    </Flex>
  ),
}
