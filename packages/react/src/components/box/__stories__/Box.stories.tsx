import { Box } from '../Box'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Box',
  component: Box<'div'>,
} satisfies Meta<typeof Box<'div'>>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
