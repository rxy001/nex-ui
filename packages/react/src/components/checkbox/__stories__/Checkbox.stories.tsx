import { useState } from 'react'
import { HeartFilled } from '@nex-ui/icons'
import {
  COLORS,
  SIZES,
  RADII,
  toReadableSize,
  toReadableRadius,
  withLabel,
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
} satisfies Meta<typeof CheckboxTemplate>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

function renderColors(props?: CheckboxProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {COLORS.map((color) =>
        withLabel(`${upperFirst(color)}Color`)(
          <CheckboxTemplate
            defaultChecked
            {...props}
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

function renderSizes(props?: CheckboxProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {SIZES.map((size) =>
        withLabel(`${toReadableSize(size)}Size`)(
          <CheckboxTemplate {...props} key={size} size={size} />,
        ),
      )}
    </Flex>
  )
}
export const Sizes: Story = {
  render: renderSizes,
}

function renderRadii(props?: CheckboxProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {RADII.map((radius) =>
        withLabel(`${toReadableRadius(radius)}Radius`)(
          <CheckboxTemplate {...props} key={radius} radius={radius} />,
        ),
      )}
    </Flex>
  )
}
export const Radius: Story = {
  render: renderRadii,
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const Indeterminate: Story = {
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
      <CheckboxTemplate
        {...props}
        checked={checked}
        onCheckedChange={setChecked}
      >
        Controlled Checkbox
      </CheckboxTemplate>
      <p>checked: {checked ? 'true' : 'false'}</p>
    </div>
  )
}

export const Controlled: Story = {
  render: (props) => <ControlledTemplate {...props} />,
}

export const Chromatic: Story = {
  render: () => (
    <>
      <Flex gap='5' wrap='wrap'>
        {withLabel('Disabled')(<CheckboxTemplate {...Disabled.args} />)}
        {withLabel('DefaultChecked')(
          <CheckboxTemplate {...DefaultChecked.args} />,
        )}
        {withLabel('Indeterminate')(
          <CheckboxTemplate {...Indeterminate.args} defaultChecked />,
        )}
        {withLabel('CustomCheckIcon')(
          <CheckboxTemplate {...CustomCheckIcon.args} defaultChecked />,
        )}
      </Flex>
      {renderColors()}
      {renderSizes()}
      {renderRadii()}
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
