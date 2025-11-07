import { COLORS, SIZES } from '~/sb/utils'
import { AvatarGroup } from '../AvatarGroup'
import { Avatar } from '../Avatar'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/AvatarGroup',
  component: AvatarGroup,
  argTypes: {
    size: {
      control: 'select',
      options: SIZES,
    },
    radius: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
    },
    color: {
      options: COLORS,
      control: 'select',
    },
    outlined: {
      control: 'boolean',
    },
    max: {
      control: 'number',
    },
    spacing: {
      control: 'number',
    },
  },
  render: (props) => {
    return (
      <AvatarGroup {...props}>
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarGroup>
    )
  },
} satisfies Meta<typeof AvatarGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithMaxCount: Story = {
  args: {
    max: 3,
  },
}

export const WithTotal: Story = {
  args: {
    total: 10,
  },
}

export const CustomSurplus: Story = {
  args: {
    renderSurplus: (surplus) => {
      return <div style={{ marginLeft: 10 }}>+{surplus}</div>
    },
    total: 10,
  },
}

export const WithSpacing: Story = {
  args: {
    spacing: 10,
  },
}
