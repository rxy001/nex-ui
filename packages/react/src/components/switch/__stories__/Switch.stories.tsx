import { useState } from 'react'
import { MoonFilled, SunFilled } from '@nex-ui/icons'
import { COLORS, SIZES, toReadableSize } from '~/sb/utils'
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
  },
} satisfies Meta<typeof Switch<'input'>>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    'aria-label': 'Default Switch',
  },
}

export const Sizes: Story = {
  render: (props) => (
    <Flex gap='5'>
      {SIZES.map((size) => (
        <Switch {...props} key={size} size={size}>
          {toReadableSize(size)}
        </Switch>
      ))}
    </Flex>
  ),
}

export const Colors: Story = {
  render: (props) => (
    <Flex gap='5'>
      {COLORS.map((color) => (
        <Switch {...props} key={color} color={color} defaultChecked>
          {upperFirst(color)}
        </Switch>
      ))}
    </Flex>
  ),
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

function ControlledSwitch(props: SwitchProps<'input'>) {
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

export const DefaultChecked: Story = {
  args: {
    defaultChecked: true,
    children: 'Default Checked Switch',
  },
}

export const Controlled: Story = {
  render: ControlledSwitch,
}
