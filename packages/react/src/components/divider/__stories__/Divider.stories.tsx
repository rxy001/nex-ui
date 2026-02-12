import { WithLabel } from '~/sb/utils'
import { Divider } from '../Divider'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Divider',
  component: Divider<'hr'>,
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
  },
} satisfies Meta<typeof Divider<'hr'>>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
}

export const Chromatic: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', gap: 20, height: 200, width: 200 }}>
        <WithLabel label='Horizontal'>
          <Divider orientation='horizontal' />
        </WithLabel>
        <WithLabel label='Vertical'>
          <Divider orientation='vertical' />
        </WithLabel>
      </div>
    )
  },
  parameters: {
    chromatic: {
      disable: false,
    },
    controls: {
      disable: true,
    },
  },
}
