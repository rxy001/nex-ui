import { Divider } from '../Divider'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/Divider',
  component: Divider<'hr'>,
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
  },
  args: {
    orientation: 'horizontal',
  },
} satisfies Meta<typeof Divider<'hr'>>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div style={{ height: 400 }}>
      <Divider {...args} />
    </div>
  ),
}
