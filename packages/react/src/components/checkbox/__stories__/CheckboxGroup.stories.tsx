import { useState } from 'react'
import { COLORS, SIZES, RADII } from '~/sb/utils'
import { CheckboxGroup } from '../CheckboxGroup'
import { Checkbox } from '../Checkbox'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { CheckboxGroupProps } from '../types'

const meta = {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroup<string, 'div'>,
  argTypes: {
    color: {
      options: COLORS,
      control: 'select',
    },
    size: {
      options: SIZES,
      control: 'select',
    },
    radius: {
      options: RADII,
      control: 'select',
    },
    disabled: {
      control: 'boolean',
    },
    orientation: {
      options: ['vertical', 'horziontal'],
      control: 'select',
    },
  },
  render: (props) => (
    <CheckboxGroup {...props}>
      <Checkbox value='apple'>Apple</Checkbox>
      <Checkbox value='pear'>Pear</Checkbox>
      <Checkbox value='orange'>Orange</Checkbox>
    </CheckboxGroup>
  ),
} satisfies Meta<typeof CheckboxGroup<string, 'div'>>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

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

export const WithLabel: Story = {
  args: {
    label: 'Select fruits',
  },
}

export const Controlled: Story = {
  render: ControlledTemplate,
}
