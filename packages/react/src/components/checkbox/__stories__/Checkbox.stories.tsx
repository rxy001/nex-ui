import { useState } from 'react'
import { HeartFilled } from '@nex-ui/icons'
import { COLORS, SIZES, RADII, toReadableSize } from '~/sb/utils'
import { upperFirst } from '@nex-ui/utils'
import { Checkbox } from '../Checkbox'
import { Flex } from '../../flex'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { CheckboxProps } from '../types'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox<'input'>,
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
    defaultChecked: {
      control: 'boolean',
    },
  },
  args: {
    children: 'Checkbox',
  },
} satisfies Meta<typeof Checkbox<'input'>>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Colors: Story = {
  render: (props) => {
    return (
      <Flex gap='50' wrap='wrap'>
        {COLORS.map((color) => (
          <Checkbox defaultChecked {...props} key={color} color={color}>
            {upperFirst(color)}
          </Checkbox>
        ))}
      </Flex>
    )
  },
}

export const Sizes: Story = {
  render: (props) => {
    return (
      <Flex gap='5' align='center'>
        {SIZES.map((size) => (
          <Checkbox {...props} key={size} size={size}>
            {toReadableSize(size)}
          </Checkbox>
        ))}
      </Flex>
    )
  },
}

export const Radius: Story = {
  render: (props) => {
    return (
      <Flex gap='5'>
        {RADII.map((radius) => (
          <Checkbox {...props} key={radius} radius={radius}>
            {toReadableSize(radius)}
          </Checkbox>
        ))}
      </Flex>
    )
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const indeterminate: Story = {
  args: {
    indeterminate: true,
  },
}

export const DefaultChecked: Story = {
  args: {
    defaultChecked: true,
  },
}

export const CustomCheckIcon: Story = {
  args: {
    icon: <HeartFilled />,
  },
}

function ControlledTemplate(props: CheckboxProps) {
  const [checked, setChecked] = useState(false)

  return (
    <div>
      <Checkbox {...props} checked={checked} onCheckedChange={setChecked}>
        Controlled Checkbox
      </Checkbox>
      <p>checked: {checked ? 'true' : 'false'}</p>
    </div>
  )
}

export const Controlled: Story = {
  render: ControlledTemplate,
}
