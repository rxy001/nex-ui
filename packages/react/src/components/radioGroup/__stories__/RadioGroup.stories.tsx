import { useState } from 'react'
import { upperFirst } from '@nex-ui/utils'
import { COLORS, SIZES, withLabel } from '~/sb/utils'
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

function renderColors(props?: RadioGroupProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {COLORS.map((color) =>
        withLabel(`${upperFirst(color)}Color`)(
          <RadioGroupTemplate
            {...props}
            defaultValue='apple'
            key={color}
            color={color}
          />,
        ),
      )}
    </Flex>
  )
}

export const Colors: Story = {
  render: renderColors,
}

function renderSizes(props?: RadioGroupProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {SIZES.map((size) =>
        withLabel(`${upperFirst(size)}Size`)(
          <RadioGroupTemplate {...props} key={size} size={size} />,
        ),
      )}
    </Flex>
  )
}
export const Sizes: Story = {
  render: renderSizes,
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

function ControlledTemplate(props: RadioGroupProps) {
  const [value, setValue] = useState<string | number>('apple')

  return (
    <>
      <RadioGroupTemplate value={value} onValueChange={setValue} {...props} />
      <p>Selected value: {value}</p>
    </>
  )
}

export const Controlled: Story = {
  render: (props) => <ControlledTemplate {...props} />,
}

export const Chromatic: Story = {
  render: () => {
    return (
      <>
        {withLabel('WithLabel')(<RadioGroupTemplate {...WithLabel.args} />)}
        {withLabel('Disabled')(<RadioGroupTemplate {...Disabled.args} />)}
        {withLabel('Vertical')(<RadioGroupTemplate {...Vertical.args} />)}
        {withLabel('DefaultValue')(
          <RadioGroupTemplate {...DefaultValue.args} />,
        )}
        {renderColors()}
        {renderSizes()}
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
