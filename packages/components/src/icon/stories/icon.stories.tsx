import type { Meta, StoryObj } from '@storybook/react'
import { Icon } from '../Icon'

const meta = {
  title: 'Components/Icon',
  component: Icon,
} satisfies Meta<typeof Icon>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    icon: 'eos-icons:loading',
    color: '#1677ff',
    width: 50,
    height: 50,
  },
}
