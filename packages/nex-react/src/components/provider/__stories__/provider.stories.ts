import type { Meta, StoryObj } from '@storybook/react'
import { NexProvider } from '../Provider'

const meta = {
  title: 'Components/NexProvider',
  component: NexProvider,
  argTypes: {},
} satisfies Meta<typeof NexProvider>

export default meta

export type NexUIProviderStore = StoryObj<typeof meta>
