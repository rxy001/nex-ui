import type { Meta, StoryObj } from '@storybook/react'
import { NexUIProvider } from '../NexUIProvider'

const meta = {
  title: 'Components/NexUIProvider',
  component: NexUIProvider,
  argTypes: {},
} satisfies Meta<typeof NexUIProvider>

export default meta

export type NexUIProviderStore = StoryObj<typeof meta>
