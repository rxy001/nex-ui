import { withLabel } from '~/sb/utils'
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

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
}

export const Chromatic: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', gap: 20, height: 200, width: 200 }}>
        {withLabel('Horizontal')(<Divider orientation='horizontal' />)}
        {withLabel('Vertical')(<Divider orientation='vertical' />)}
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
