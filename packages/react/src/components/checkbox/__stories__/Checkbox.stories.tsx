import { useState } from 'react'
import { HeartFilled } from '@nex-ui/icons'
import {
  COLORS,
  SIZES,
  RADII,
  toReadableSize,
  toReadableRadius,
  WithLabel,
} from '~/sb/utils'
import { upperFirst } from '@nex-ui/utils'
import { Checkbox } from '../Checkbox'
import { Flex } from '../../flex'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { CheckboxProps } from '../types'

function CheckboxTemplate(props: CheckboxProps) {
  return <Checkbox {...props}>Checkbox</Checkbox>
}

const meta = {
  title: 'Components/Checkbox',
  component: CheckboxTemplate,
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
    indeterminate: {
      control: 'boolean',
    },
    disableAnimation: {
      control: 'boolean',
    },
  },
  parameters: {
    controls: {
      exclude: ['icon'],
    },
  },
} satisfies Meta<typeof CheckboxTemplate>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export function Colors(props: CheckboxProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {COLORS.map((color) => (
        <WithLabel key={color} label={`${upperFirst(color)}Color`}>
          <CheckboxTemplate defaultChecked {...props} color={color} />
        </WithLabel>
      ))}
    </Flex>
  )
}

export function Sizes(props: CheckboxProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {SIZES.map((size) => (
        <WithLabel key={size} label={`${toReadableSize(size)}Size`}>
          <CheckboxTemplate {...props} size={size} />
        </WithLabel>
      ))}
    </Flex>
  )
}

export function Radii(props: CheckboxProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {RADII.map((radius) => (
        <WithLabel key={radius} label={`${toReadableRadius(radius)}Radius`}>
          <CheckboxTemplate {...props} radius={radius} />
        </WithLabel>
      ))}
    </Flex>
  )
}

export const Disabled: Story = {
  args: {
    disabled: true,
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

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
}

export function Controlled(props: CheckboxProps) {
  const [checked, setChecked] = useState(false)

  return (
    <div>
      <CheckboxTemplate
        {...props}
        checked={checked}
        onCheckedChange={setChecked}
      />
      <p>checked: {checked ? 'true' : 'false'}</p>
    </div>
  )
}

export const Chromatic: Story = {
  render: () => (
    <>
      <Flex gap='5' wrap='wrap'>
        <WithLabel label='Disabled'>
          <CheckboxTemplate {...Disabled.args} />
        </WithLabel>
        <WithLabel label='DefaultChecked'>
          <CheckboxTemplate {...DefaultChecked.args} />
        </WithLabel>
        <WithLabel label='Indeterminate'>
          <CheckboxTemplate {...Indeterminate.args} defaultChecked />
        </WithLabel>
        <WithLabel label='CustomCheckIcon'>
          <CheckboxTemplate {...CustomCheckIcon.args} />
        </WithLabel>
      </Flex>
      <Colors />
      <Sizes />
      <Radii />
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
