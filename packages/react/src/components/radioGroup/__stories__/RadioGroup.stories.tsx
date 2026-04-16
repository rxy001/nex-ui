import { useState } from 'react'
import { upperFirst } from '@nex-ui/utils'
import {
  COLORS,
  SIZES,
  toReadableSize,
  WithLabel as WithLabelUtil,
} from '~/sb/utils'
import { Radio } from '../Radio'
import { RadioGroup } from '../RadioGroup'
import { Flex } from '../../flex'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { RadioGroupProps } from '../types'

function RadioGroupTemplate(props: RadioGroupProps) {
  return (
    <RadioGroup {...props}>
      <Radio value='apple'>Apple</Radio>
      <Radio value='banana'>Banana</Radio>
      <Radio value='cherry'>Cherry</Radio>
    </RadioGroup>
  )
}

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroupTemplate,
  argTypes: {
    size: {
      control: 'select',
      options: SIZES,
    },
    disabled: {
      control: 'boolean',
    },
    color: {
      options: COLORS,
      control: 'select',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    disableAnimation: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof RadioGroupTemplate>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export function Colors(props: RadioGroupProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {COLORS.map((color) => (
        <WithLabelUtil key={color} label={`${upperFirst(color)}Color`}>
          <RadioGroupTemplate {...props} defaultValue='apple' color={color} />
        </WithLabelUtil>
      ))}
    </Flex>
  )
}

export function Sizes(props: RadioGroupProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {SIZES.map((size) => (
        <WithLabelUtil key={size} label={`${toReadableSize(size)}Size`}>
          <RadioGroupTemplate {...props} size={size} />
        </WithLabelUtil>
      ))}
    </Flex>
  )
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

export function Controlled(props: RadioGroupProps) {
  const [value, setValue] = useState('apple')

  return (
    <>
      <RadioGroupTemplate value={value} onValueChange={setValue} {...props} />
      <p>Selected value: {value}</p>
    </>
  )
}

export const Chromatic: Story = {
  render: () => {
    return (
      <>
        <WithLabelUtil label='WithLabel'>
          <RadioGroupTemplate {...WithLabel.args} />
        </WithLabelUtil>
        <WithLabelUtil label='Disabled'>
          <RadioGroupTemplate {...Disabled.args} />
        </WithLabelUtil>
        <WithLabelUtil label='Vertical'>
          <RadioGroupTemplate {...Vertical.args} />
        </WithLabelUtil>
        <WithLabelUtil label='DefaultValue'>
          <RadioGroupTemplate {...DefaultValue.args} />
        </WithLabelUtil>
        <Colors />
        <Sizes />
      </>
    )
  },
  parameters: {
    chromatic: {
      disable: false,
    },
    controls: {
      disable: true,
    },
  },
}
