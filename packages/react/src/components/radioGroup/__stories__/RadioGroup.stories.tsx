import { useState } from 'react'
import { Radio } from '../Radio'
import { RadioGroup } from '../RadioGroup'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup<string, 'input'>,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
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
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
  args: {
    children: 'Radio',
  },
  render: (props) => {
    return (
      <RadioGroup {...props}>
        <Radio value='apple'>Apple</Radio>
        <Radio value='banana'>Banana</Radio>
        <Radio value='cherry'>Cherry</Radio>
      </RadioGroup>
    )
  },
} satisfies Meta<typeof RadioGroup<string, 'input'>>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithLabel: Story = {
  args: {
    label: 'Select a fruit',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
}

export const DefaultValue: Story = {
  args: {
    defaultValue: 'apple',
  },
}

function ControlledTemplate() {
  const [value, setValue] = useState('apple')

  return (
    <>
      <RadioGroup value={value} onValueChange={setValue}>
        <Radio value='apple'>Apple</Radio>
        <Radio value='banana'>Banana</Radio>
        <Radio value='cherry'>Cherry</Radio>
      </RadioGroup>
      <p>Selected value: {value}</p>
    </>
  )
}

export const Controlled: Story = {
  render: ControlledTemplate,
}
