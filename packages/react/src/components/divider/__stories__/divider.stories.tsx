import type { Meta, StoryObj } from '@storybook/react'
import { Divider } from '../Divider'

const meta = {
  title: 'Components/Divider',
  component: Divider,
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
  },
  args: {
    orientation: 'horizontal',
  },
} satisfies Meta<typeof Divider>

export default meta

type Story = StoryObj<typeof meta>

export const BasicDivider: Story = {
  render: (args) => (
    <div style={{ height: 400 }}>
      <Divider {...args} />
    </div>
  ),
}
