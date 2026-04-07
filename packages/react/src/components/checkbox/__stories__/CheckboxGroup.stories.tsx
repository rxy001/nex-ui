import { useState } from 'react'
import { COLORS, SIZES, RADII, WithLabel as WithLabelUtil } from '~/sb/utils'
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
  parameters: {
    controls: {
      exclude: ['value', 'defaultValue', 'onValueChange'],
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

export function Controlled(props: CheckboxGroupProps<string>) {
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

export const Chromatic: Story = {
  render: () => (
    <>
      <WithLabelUtil label='Disabled'>
        <CheckboxGroupTemplate {...Disabled.args} />
      </WithLabelUtil>
      <WithLabelUtil label='Vertical'>
        <CheckboxGroupTemplate {...Vertical.args} />
      </WithLabelUtil>
      <WithLabelUtil label='DefaultValue'>
        <CheckboxGroupTemplate {...DefaultValue.args} />
      </WithLabelUtil>
      <WithLabelUtil label='WithLabel'>
        <CheckboxGroupTemplate {...WithLabel.args} />
      </WithLabelUtil>
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
