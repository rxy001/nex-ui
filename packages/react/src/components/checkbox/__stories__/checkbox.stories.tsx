import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from '../Checkbox'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    color: {
      options: [
        'blue',
        'orange',
        'cyan',
        'gray',
        'rose',
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
    radius: {
      options: ['sm', 'md', 'lg', 'full', 'none'],
      control: 'select',
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    color: 'blue',
    size: 'md',
    disabled: false,
    children: 'Checkbox',
  },
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {},
}
