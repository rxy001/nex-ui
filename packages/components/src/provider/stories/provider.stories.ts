import type { Meta, StoryObj } from '@storybook/react'
import { AntUIProvider } from '../AntUIProvider'

const meta = {
  title: 'Components/AntUIProvider',
  component: AntUIProvider,
  argTypes: {},
} satisfies Meta<typeof AntUIProvider>

export default meta

export type AntUIProviderStore = StoryObj<typeof meta>
