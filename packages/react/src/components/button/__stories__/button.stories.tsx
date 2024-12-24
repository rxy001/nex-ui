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
        <Flex key="sm" gap={10} direction={args.fullWidth ? 'column' : 'row'}>
          <Button {...args} key="blue" size="sm" />
          <Button {...args} key="purple" size="sm" color="purple" />
          <Button {...args} key="gray" size="sm" color="gray" />
          <Button {...args} key="rose" size="sm" color="rose" />
          <Button {...args} key="cyan" size="sm" color="cyan" />
          <Button {...args} key="pink" size="sm" color="pink" />
          <Button {...args} key="yellow" size="sm" color="yellow" />
          <Button {...args} key="green" size="sm" color="green" />
          <Button {...args} key="orange" size="sm" color="orange" />
        </Flex>
        <Flex key="md" gap={10} direction={args.fullWidth ? 'column' : 'row'}>
          <Button {...args} key="blue" size="md" />
          <Button {...args} key="purple" size="md" color="purple" />
          <Button {...args} key="gray" size="md" color="gray" />
          <Button {...args} key="rose" size="md" color="rose" />
          <Button {...args} key="cyan" size="md" color="cyan" />
          <Button {...args} key="pink" size="md" color="pink" />
          <Button {...args} key="yellow" size="md" color="yellow" />
          <Button {...args} key="green" size="md" color="green" />
          <Button {...args} key="orange" size="md" color="orange" />
        </Flex>
        <Flex key="lg" gap={10} direction={args.fullWidth ? 'column' : 'row'}>
          <Button {...args} key="blue" size="lg" />
          <Button {...args} key="purple" size="lg" color="purple" />
          <Button {...args} key="gray" size="lg" color="gray" />
          <Button {...args} key="rose" size="lg" color="rose" />
          <Button {...args} key="cyan" size="lg" color="cyan" />
          <Button {...args} key="pink" size="lg" color="pink" />
          <Button {...args} key="yellow" size="lg" color="yellow" />
          <Button {...args} key="green" size="lg" color="green" />
          <Button {...args} key="orange" size="lg" color="orange" />
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
