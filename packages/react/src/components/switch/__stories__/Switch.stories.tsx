import { useState } from 'react'
import { MoonFilled, SunFilled } from '@nex-ui/icons'
import {
  COLORS,
  SIZES,
  toReadableSize,
  WithLabel as WithLabelUtil,
} from '~/sb/utils'
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
  parameters: {
    controls: {
      exclude: ['startIcon', 'endIcon', 'thumbIcon', 'children'],
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

export function Sizes(props: SwitchProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {SIZES.map((size) => (
        <WithLabelUtil key={size} label={`${toReadableSize(size)}Size`}>
          <Switch {...props} aria-label='switch' size={size} />
        </WithLabelUtil>
      ))}
    </Flex>
  )
}

export function Colors(props: SwitchProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {COLORS.map((color) => (
        <WithLabelUtil key={color} label={`${upperFirst(color)}Color`}>
          <Switch {...props} aria-label='switch' color={color} defaultChecked />
        </WithLabelUtil>
      ))}
    </Flex>
  )
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

export function Controlled(props: SwitchProps) {
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

export const Chromatic: Story = {
  render: () => (
    <>
      <WithLabelUtil label='WithLabel'>
        <Switch {...WithLabel.args} />
      </WithLabelUtil>
      <WithLabelUtil label='WithIcons'>
        <Switch {...WithIcons.args} />
      </WithLabelUtil>
      <WithLabelUtil label='WithThumbIcon'>
        <Switch {...WithThumbIcon.args} />
      </WithLabelUtil>
      <WithLabelUtil label='Disabled'>
        <Switch {...Disabled.args} />
      </WithLabelUtil>
      <WithLabelUtil label='DefaultChecked'>
        <Switch {...DefaultChecked.args} />
      </WithLabelUtil>
      <Colors />
      <Sizes />
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
