import { useState } from 'react'
import { COLORS, SIZES, RADII, withLabel } from '~/sb/utils'
import { CheckboxGroup } from '../CheckboxGroup'
import { Checkbox } from '../Checkbox'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { CheckboxGroupProps } from '../types'

function CheckboxGroupTemplate(props: CheckboxGroupProps<string>) {
  return (
    <CheckboxGroup {...props}>
      <Checkbox value='apple'>Apple</Checkbox>
      <Checkbox value='pear'>Pear</Checkbox>
      <Checkbox value='orange'>Orange</Checkbox>
    </CheckboxGroup>
  )
}

const meta = {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroupTemplate,
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
      options: ['vertical', 'horizontal'],
      control: 'select',
    },
    disableAnimation: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof CheckboxGroupTemplate>

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

export const WithLabel: Story = {
  args: {
    label: 'Select fruits',
  },
}

function ControlledTemplate(props: CheckboxGroupProps<string>) {
  const [value, setValue] = useState(['pear'])

  return (
    <>
      <CheckboxGroupTemplate
        {...props}
        value={value}
        onValueChange={setValue}
      />
      <p>Selected: {value.join(', ')}</p>
    </>
  )
}
export const Controlled: Story = {
  render: (props) => <ControlledTemplate {...props} />,
}

export const Chromatic: Story = {
  render: () => (
    <>
      {withLabel('Disabled')(<CheckboxGroupTemplate {...Disabled.args} />)}
      {withLabel('Vertical')(<CheckboxGroupTemplate {...Vertical.args} />)}
      {withLabel('DefaultValue')(
        <CheckboxGroupTemplate {...DefaultValue.args} />,
      )}
      {withLabel('WithLabel')(<CheckboxGroupTemplate {...WithLabel.args} />)}
    </>
  ),
  parameters: {
    chromatic: {
      disable: false,
    },
    controls: {
      disable: true,
    },
  },
}
