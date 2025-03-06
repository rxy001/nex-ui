import type { Meta, StoryObj } from '@storybook/react'
import { SearchOutlined } from '@nex-ui/icons'
import { InputText } from '../InputText'
import { Flex } from '../../flex'
import { Icon } from '../../icon'

const meta = {
  title: 'Components/InputText',
  component: InputText,
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
    return <InputText {...args} />
  },
} satisfies Meta<typeof InputText>

export default meta

type Story = StoryObj<typeof meta>

export const BasicInputText: Story = {}

export const InputTextWithIcons: Story = {
  render: (args) => {
    return (
      <Flex gap='4'>
        <InputText {...args} suffix={<Icon component={SearchOutlined} />} />
        <InputText {...args} prefix={<Icon component={SearchOutlined} />} />
      </Flex>
    )
  },
}
