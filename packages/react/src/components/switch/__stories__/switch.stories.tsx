import type { Meta, StoryObj } from '@storybook/react'
import { MoonFilled, SunFilled } from '@nex-ui/icons'
import { Switch } from '../Switch'

const meta = {
  title: 'Components/Switch',
  component: Switch,
  argTypes: {
    color: {
      options: [
        'blue',
        'orange',
        'cyan',
        'gray',
        'red',
        'green',
        'pink',
        'purple',
        'yellow',
      ],
      control: 'select',
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: 'select',
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    disabled: false,
    color: 'blue',
    size: 'md',
  },
} satisfies Meta<typeof Switch>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
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
