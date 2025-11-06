import * as AllIcons from '../index'
import type { StoryObj } from '@storybook/react-vite'
import type { ComponentType } from 'react'

const meta = {
  title: 'Components/Icon',
  argTypes: {},
  render: () => {
    return (
      <div
        style={{
          display: 'flex',
          fontSize: '30px',
          gap: '15px',
          flexWrap: 'wrap',
        }}
      >
        {Object.entries(AllIcons as Record<string, ComponentType<any>>).map(
          ([name, Component]) => (
            <span key={name} title={(Component as any).displayName || name}>
              <Component />
            </span>
          ),
        )}
      </div>
    )
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Icons: Story = {}
