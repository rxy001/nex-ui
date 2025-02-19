import type { Meta, StoryObj } from '@storybook/react'
import { AppleOutlined, HeartFilled, LikeFilled } from '@nex-ui/icons'
import { Button } from '../Button'
import { Flex } from '../../flex'

const meta = {
  title: 'Components/Button',
  component: Button,
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
      options: ['filled', 'outlined', 'text', 'link'],
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
  },
  args: {
    children: 'Button',
    size: 'md',
    variant: 'filled',
    disabled: false,
    fullWidth: false,
    iconOnly: false,
    loading: false,
  },
  render: (args) => {
    return (
      <Flex gap={30} wrap='wrap'>
        <Button {...args} key='blue' />
        <Button {...args} key='purple' color='purple' />
        <Button {...args} key='gray' color='gray' />
        <Button {...args} key='rose' color='rose' />
        <Button {...args} key='cyan' color='cyan' />
        <Button {...args} key='pink' color='pink' />
        <Button {...args} key='yellow' color='yellow' />
        <Button {...args} key='green' color='green' />
        <Button {...args} key='orange' color='orange' />
      </Flex>
    )
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const BasicButton: Story = {
  args: {},
}

export const FullWidthButton: Story = {
  args: {
    fullWidth: true,
  },
}

export const LoadingButton: Story = {
  args: {
    loading: true,
    onClick: () => {},
  },
}

export const IconButton: Story = {
  args: {
    iconOnly: true,
    children: <HeartFilled />,
  },
}

export const ButtonWithIcons: Story = {
  args: {
    children: 'Button',
    startIcon: <AppleOutlined />,
    endIcon: <LikeFilled />,
  },
}
