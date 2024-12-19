import type { Meta, StoryObj } from '@storybook/react'
import { AppleOutlined } from '@nex-ui/icons'
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
      description: 'The age of the person',
    },
    // size: {
    //   options: ['sm', 'md', 'lg'],
    //   control: 'select',
    // },
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
    // size: 'lg',
    variant: 'filled',
    disabled: false,
    fullWidth: false,
    iconOnly: false,
    loading: false,
  },
  render: (args) => {
    return (
      <Flex gap={50} direction="column">
        <Flex gap={10} direction={args.fullWidth ? 'column' : 'row'}>
          <Button {...args} size="sm" />
          <Button {...args} size="sm" color="purple" />
          <Button {...args} size="sm" color="gray" />
          <Button {...args} size="sm" color="red" />
          <Button {...args} size="sm" color="cyan" />
          <Button {...args} size="sm" color="pink" />
          <Button {...args} size="sm" color="yellow" />
          <Button {...args} size="sm" color="green" />
          <Button {...args} size="sm" color="orange" />
        </Flex>
        <Flex gap={10} direction={args.fullWidth ? 'column' : 'row'}>
          <Button {...args} size="md" />
          <Button {...args} size="md" color="purple" />
          <Button {...args} size="md" color="gray" />
          <Button {...args} size="md" color="red" />
          <Button {...args} size="md" color="cyan" />
          <Button {...args} size="md" color="pink" />
          <Button {...args} size="md" color="yellow" />
          <Button {...args} size="md" color="green" />
          <Button {...args} size="md" color="orange" />
        </Flex>
        <Flex gap={10} direction={args.fullWidth ? 'column' : 'row'}>
          <Button {...args} size="lg" />
          <Button {...args} size="lg" color="purple" />
          <Button {...args} size="lg" color="gray" />
          <Button {...args} size="lg" color="red" />
          <Button {...args} size="lg" color="cyan" />
          <Button {...args} size="lg" color="pink" />
          <Button {...args} size="lg" color="yellow" />
          <Button {...args} size="lg" color="green" />
          <Button {...args} size="lg" color="orange" />
        </Flex>
      </Flex>
    )
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {},
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const Block: Story = {
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
    children: <AppleOutlined />,
  },
}

export const WithIcons: Story = {
  args: {
    children: 'Button',
    startIcon: <AppleOutlined />,
    endIcon: <AppleOutlined />,
  },
}
