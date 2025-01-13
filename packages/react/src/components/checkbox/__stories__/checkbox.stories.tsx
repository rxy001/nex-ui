import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from '../Checkbox'
import { CheckboxGroup as CheckboxGroupComponent } from '../CheckboxGroup'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    color: {
      options: [
        'blue',
        'orange',
        'cyan',
        'gray',
        'rose',
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
      options: ['sm', 'md', 'lg', 'full', 'none'],
      control: 'select',
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    color: 'blue',
    size: 'md',
    disabled: false,
    children: 'Checkbox',
  },
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

export const BasicCheckbox: Story = {
  args: {},
}

export const CheckboxGroup: Story = {
  render: ({ color, size, disabled, radius }) => (
    <CheckboxGroupComponent
      radius={radius}
      color={color}
      size={size}
      disabled={disabled}
    >
      <Checkbox value="apple">Apple</Checkbox>
      <Checkbox value="pear">Pear</Checkbox>
      <Checkbox value="orange">Orange</Checkbox>
    </CheckboxGroupComponent>
  ),
}
