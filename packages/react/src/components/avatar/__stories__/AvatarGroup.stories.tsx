import { COLORS, SIZES, WithLabel } from '~/sb/utils'
import { AvatarGroup } from '../AvatarGroup'
import { Avatar } from '../Avatar'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { AvatarGroupProps } from '../types'

function AvatarGroupTemplate(props: AvatarGroupProps) {
  return (
    <AvatarGroup {...props}>
      <Avatar src='https://i.pravatar.cc/150?img=53' />
      <Avatar src='https://i.pravatar.cc/150?img=54' />
      <Avatar src='https://i.pravatar.cc/150?img=55' />
      <Avatar src='https://i.pravatar.cc/150?img=56' />
      <Avatar src='https://i.pravatar.cc/150?img=57' />
    </AvatarGroup>
  )
}

const meta = {
  title: 'Components/AvatarGroup',
  component: AvatarGroupTemplate,
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
    disableAnimation: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof AvatarGroupTemplate>

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

export const Chromatic: Story = {
  render: () => (
    <>
      <WithLabel label='WithMaxCount (max: 3)'>
        <AvatarGroupTemplate {...WithMaxCount.args} />
      </WithLabel>
      <WithLabel label='WithTotal (total: 10)'>
        <AvatarGroupTemplate {...WithTotal.args} />
      </WithLabel>
      <WithLabel label='CustomSurplus'>
        <AvatarGroupTemplate {...CustomSurplus.args} />
      </WithLabel>
      <WithLabel label='WithSpacing (spacing: 10)'>
        <AvatarGroupTemplate {...WithSpacing.args} />
      </WithLabel>
    </>
  ),
  parameters: {
    chromatic: {
      disable: false,
    },
    controls: {
      disable: true,
    },
  },
}
