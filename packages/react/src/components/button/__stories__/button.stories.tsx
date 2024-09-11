import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../index'
import { Icon } from '../../icon'

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
      <>
        <Button {...args}>Button</Button>
        <Button {...args} color="purple">
          Button
        </Button>
        <Button {...args} color="gray">
          Button
        </Button>
        <Button {...args} color="red">
          Button
        </Button>
        <Button {...args} color="cyan">
          Button
        </Button>
        <Button {...args} color="pink">
          Button
        </Button>
        <Button {...args} color="yellow">
          Button
        </Button>
        <Button {...args} color="blue">
          Button
        </Button>
      </>
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
    children: <Icon icon="material-symbols:send-outline" />,
  },
}

export const WithIcons: Story = {
  args: {
    ...commonArgs,
    children: 'Button',
    startIcon: <Icon icon="eos-icons:loading" color="#fff" />,
    endIcon: <Icon icon="material-symbols:send-outline" />,
  },
}
