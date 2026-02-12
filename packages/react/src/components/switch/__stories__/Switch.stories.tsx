import { useState } from 'react'
import { MoonFilled, SunFilled } from '@nex-ui/icons'
import { COLORS, SIZES, toReadableSize, withLabel } from '~/sb/utils'
import { upperFirst } from '@nex-ui/utils'
import { Switch } from '../Switch'
import { Flex } from '../../flex'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { SwitchProps } from '../types'

const meta = {
  title: 'Components/Switch',
  component: Switch<'input'>,
  argTypes: {
    color: {
      options: COLORS,
      control: 'select',
    },
    size: {
      options: SIZES,
      control: 'select',
    },
    disabled: {
      control: 'boolean',
    },
    disableAnimation: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Switch<'input'>>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    'aria-label': 'Default Switch',
  },
}

function renderSizes(props?: SwitchProps) {
  return (
    <Flex gap='5'>
      {SIZES.map((size) =>
        withLabel(`${toReadableSize(size)}Size`)(
          <Switch {...props} key={size} size={size} />,
        ),
      )}
    </Flex>
  )
}
export const Sizes: Story = {
  render: renderSizes,
}

function renderColors(props?: SwitchProps) {
  return (
    <Flex gap='5'>
      {COLORS.map((color) =>
        withLabel(`${upperFirst(color)}Color`)(
          <Switch {...props} key={color} color={color} defaultChecked />,
        ),
      )}
    </Flex>
  )
}
export const Colors: Story = {
  render: renderColors,
}

export const WithLabel: Story = {
  args: {
    children: 'Switch',
  },
}

export const WithIcons: Story = {
  args: {
    startIcon: <SunFilled />,
    endIcon: <MoonFilled />,
    size: 'lg',
    color: 'green',
    defaultChecked: true,
    'aria-label': 'Switch with icons',
  },
}

export const WithThumbIcon: Story = {
  args: {
    thumbIcon: (e) => (e.checked ? <SunFilled /> : <MoonFilled />),
    size: 'lg',
    color: 'purple',
    'aria-label': 'Switch with thumb icon',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Switch',
  },
}

export const DefaultChecked: Story = {
  args: {
    defaultChecked: true,
    children: 'Default Checked Switch',
  },
}

function ControlledSwitch(props: SwitchProps) {
  const [checked, setChecked] = useState(false)

  return (
    <>
      <Switch checked={checked} onCheckedChange={setChecked} {...props}>
        Controlled Switch
      </Switch>
      <p>checked: {checked ? 'true' : 'false'}</p>
    </>
  )
}
export const Controlled: Story = {
  render: (props) => <ControlledSwitch {...props} />,
}

export const Chromatic: Story = {
  render: () => (
    <>
      {withLabel('WithLabel')(<Switch {...WithLabel.args} />)}
      {withLabel('WithIcons')(<Switch {...WithIcons.args} />)}
      {withLabel('WithThumbIcon')(<Switch {...WithThumbIcon.args} />)}
      {withLabel('Disabled')(<Switch {...Disabled.args} />)}
      {withLabel('DefaultChecked')(<Switch {...DefaultChecked.args} />)}
      {renderColors()}
      {renderSizes()}
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
