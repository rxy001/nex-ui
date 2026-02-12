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
          fontSize: 30,
          gap: 20,
          flexWrap: 'wrap',
        }}
      >
        {Object.entries(AllIcons as Record<string, ComponentType<any>>).map(
          ([name, Component]) => (
            <button
              key={name}
              title={(Component as any).displayName || name}
              style={{
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                padding: 0,
                display: 'flex',
                fontSize: 30,
              }}
              onClick={async () => {
                try {
                  await window.navigator.clipboard.writeText(`<${name} />`)
                  alert(`Copied <${name} /> to clipboard`)
                } catch {
                  alert(`Failed to copy <${name} /> to clipboard`)
                }
              }}
            >
              <Component />
            </button>
          ),
        )}
      </div>
    )
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Icons: Story = {}
