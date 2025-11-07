import { UserOutlined } from '@nex-ui/icons'
import {
  RADII as DEFAULT_RADII,
  SIZES as DEFAULT_SIZES,
  COLORS,
} from '~/sb/utils'
import { Avatar } from '../Avatar'
import { Flex } from '../../flex'
import type { Meta, StoryObj } from '@storybook/react-vite'

const RADII = [...DEFAULT_RADII, 'xl'] as const

const SIZES = [...DEFAULT_SIZES, 'xl'] as const

const meta = {
  title: 'Components/Avatar',
  component: Avatar<'div'>,
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
    outlined: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Avatar<'div'>>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const LetterAvatar: Story = {
  args: {
    children: 'XY',
  },
}

export const ImageAvatar: Story = {
  args: {
    src: 'https://avatars.githubusercontent.com/u/25546323?v=4',
    alt: 'XY',
  },
}

export const IconAvatar: Story = {
  args: {
    children: <UserOutlined />,
  },
}

export const Fallbacks: Story = {
  args: {
    src: 'https://xxx.com',
    alt: 'XY',
  },
  render: (args) => (
    <Flex gap='5'>
      <Avatar {...args}>
        <UserOutlined />
      </Avatar>
      <Avatar {...args} />
    </Flex>
  ),
}

export const Sizes: Story = {
  render: (props) => (
    <Flex gap='5' align='center'>
      {SIZES.map((size) => (
        <Avatar {...props} key={size} size={size}>
          {size.toUpperCase()}
        </Avatar>
      ))}
    </Flex>
  ),
}

export const Radii: Story = {
  render: (props) => (
    <Flex gap='5'>
      {RADII.map((radius) => (
        <Avatar {...props} key={radius} radius={radius}>
          {radius}
        </Avatar>
      ))}
    </Flex>
  ),
}

export const Colors: Story = {
  render: (props) => (
    <Flex gap='5'>
      {COLORS.map((color) => (
        <Avatar {...props} key={color} color={color}>
          {color.at(0)?.toUpperCase()}
        </Avatar>
      ))}
    </Flex>
  ),
}

export const Outlined: Story = {
  args: {
    outlined: true,
    children: 'XY',
  },
}
