import { useState } from 'react'
import { CheckboxGroup } from '../CheckboxGroup'
import { Checkbox } from '../Checkbox'
import type { Meta, StoryObj } from '@storybook/react'
import type { CheckboxGroupProps } from '../types'

const meta = {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroup<string>,
  argTypes: {
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
  },

  render: (props) => (
    <CheckboxGroup {...props}>
      <Checkbox value='apple'>Apple</Checkbox>
      <Checkbox value='pear'>Pear</Checkbox>
      <Checkbox value='orange'>Orange</Checkbox>
    </CheckboxGroup>
  ),
} satisfies Meta<typeof CheckboxGroup<string>>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const DefaultValue: Story = {
  args: {
    defaultValue: ['apple'],
  },
}

function ControlledTemplate(props: CheckboxGroupProps<string>) {
  const [value, setValue] = useState(['pear'])

  return (
    <>
      <CheckboxGroup {...props} value={value} onValueChange={setValue}>
        <Checkbox value='apple'>Apple</Checkbox>
        <Checkbox value='pear'>Pear</Checkbox>
        <Checkbox value='orange'>Orange</Checkbox>
      </CheckboxGroup>
      <p>Selected: {value.join(', ')}</p>
    </>
  )
}

export const Controlled: Story = {
  render: ControlledTemplate,
}
