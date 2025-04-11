import type { Meta, StoryObj } from '@storybook/react'
import { SearchOutlined } from '@nex-ui/icons'
import { Input } from '../Input'
import { Flex } from '../../flex'
import { Icon } from '../../icon'

const meta = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    variant: {
      options: ['filled', 'outlined', 'borderless'],
      control: 'select',
    },
    fullWidth: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
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
    size: {
      options: ['sm', 'md', 'lg'],
      control: 'select',
    },
    radius: {
      options: ['sm', 'md', 'lg', 'full'],
      control: 'select',
    },
    clearable: {
      control: 'boolean',
    },
  },
  args: {
    variant: 'outlined',
    disabled: false,
    fullWidth: false,
    size: 'md',
    color: 'blue',
    error: false,
    clearable: false,
    placeholder: 'Input Text',
  },
  render: (args) => {
    return <Input {...args} />
  },
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const BasicInput: Story = {}

export const InputWithIcons: Story = {
  render: (args) => {
    return (
      <Flex gap='4'>
        <Input {...args} suffix={<Icon as={SearchOutlined} />} />
        <Input {...args} prefix={<Icon as={SearchOutlined} />} />
      </Flex>
    )
  },
}
