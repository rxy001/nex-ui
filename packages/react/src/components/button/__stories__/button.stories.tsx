import type { Meta, StoryObj } from '@storybook/react'
import { AppleOutlined } from '@nex-ui/icons'
import { Button } from '../index'
import { Flex } from '../../flex'

const meta = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['solid', 'outline', 'text', 'link'],
      control: {
        type: 'select',
      },
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: {
        type: 'select',
      },
    },
    radius: {
      options: ['sm', 'md', 'lg', 'full'],
      control: {
        type: 'select',
      },
    },
    href: {
      type: 'string',
    },
    iconOnly: {
      type: 'boolean',
    },
  },
  render: (args) => {
    return (
      <Flex gap={10} direction={args.block ? 'column' : 'row'}>
        <Button {...args} />
        <Button {...args} color="purple" />
        <Button {...args} color="gray" />
        <Button {...args} color="red" />
        <Button {...args} color="cyan" />
        <Button {...args} color="pink" />
        <Button {...args} color="yellow" />
        <Button {...args} color="green" />
        <Button {...args} color="orange" />
      </Flex>
    )
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

const commonArgs: Story['args'] = {
  children: 'Button',
  disabled: false,
  block: false,
  size: 'lg',
  variant: 'solid',
}

export const Basic: Story = {
  args: {
    ...commonArgs,
  },
}

export const Disabled: Story = {
  args: {
    ...commonArgs,
    disabled: true,
  },
}

export const Block: Story = {
  args: {
    ...commonArgs,
    block: true,
  },
}

export const LoadingButton: Story = {
  args: {
    ...commonArgs,
    loading: true,
    onClick: () => {},
  },
}

export const IconButton: Story = {
  args: {
    ...commonArgs,
    iconOnly: true,
    children: <AppleOutlined />,
  },
}

export const WithIcons: Story = {
  args: {
    ...commonArgs,
    children: 'Button',
    startIcon: <AppleOutlined />,
    endIcon: <AppleOutlined />,
  },
}
