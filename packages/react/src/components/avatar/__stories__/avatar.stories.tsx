import { UserOutlined } from '@nex-ui/icons'
import type { Meta, StoryObj } from '@storybook/react'
import { Flex } from '../../flex'
import { Avatar } from '../Avatar'

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
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
  },
  args: {
    color: 'gray',
    size: 'md',
  },
} satisfies Meta<typeof Avatar>

export default meta

type Story = StoryObj<typeof meta>

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
  render: (args) => (
    <Flex gap='5'>
      <Avatar {...args} key={0} />
      <Avatar {...args} src='/avatar.png' key={2} />
      <Avatar {...args} src='/avatar.png' key={3}>
        <UserOutlined />
      </Avatar>
    </Flex>
  ),
}

export const IconAvatar: Story = {
  args: {
    children: <UserOutlined />,
  },
}
