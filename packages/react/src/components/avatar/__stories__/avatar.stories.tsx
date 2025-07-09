import { UserOutlined } from '@nex-ui/icons'
import { Avatar } from '../Avatar'
import { Flex } from '../../flex'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/Avatar',
  component: Avatar<'div'>,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    radius: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
    },
    color: {
      options: [
        'blue',
        'orange',
        'cyan',
        'gray',
        'red',
        'green',
        'pink',
        'purple',
        'yellow',
      ],
      control: 'select',
    },
    outlined: {
      control: 'boolean',
    },
  },
  args: {
    color: 'gray',
    size: 'md',
    outlined: false,
  },
} satisfies Meta<typeof Avatar<'div'>>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

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
    children: <UserOutlined aria-hidden focusable={false} />,
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
        <UserOutlined aria-hidden focusable={false} />
      </Avatar>
      <Avatar {...args} />
    </Flex>
  ),
}
