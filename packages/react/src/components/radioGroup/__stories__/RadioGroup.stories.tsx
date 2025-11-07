import { useState } from 'react'
import { COLORS, SIZES } from '~/sb/utils'
import { Radio } from '../Radio'
import { RadioGroup } from '../RadioGroup'
import { Flex } from '../../flex'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { RadioGroupProps } from '../types'

function RadioGroupTemplate(props: RadioGroupProps<string, 'div'>) {
  return (
    <RadioGroup defaultValue='apple' {...props}>
      <Radio value='apple'>Apple</Radio>
      <Radio value='banana'>Banana</Radio>
      <Radio value='cherry'>Cherry</Radio>
    </RadioGroup>
  )
}

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup<string, 'div'>,
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
  },
  args: {
    children: 'Radio',
  },
  render: (props) => {
    return <RadioGroupTemplate {...props} />
  },
} satisfies Meta<typeof RadioGroup<string, 'div'>>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Colors: Story = {
  render: (props) => (
    <Flex gap='5' wrap='wrap'>
      {COLORS.map((color) => (
        <RadioGroupTemplate {...props} key={color} color={color} />
      ))}
    </Flex>
  ),
}

export const Sizes: Story = {
  render: (props) => (
    <Flex gap='5' wrap='wrap' align='center'>
      {SIZES.map((size) => (
        <RadioGroupTemplate {...props} key={size} size={size} />
      ))}
    </Flex>
  ),
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
      <RadioGroupTemplate value={value} onValueChange={setValue} />
      <p>Selected value: {value}</p>
    </>
  )
}

export const Controlled: Story = {
  render: ControlledTemplate,
}
