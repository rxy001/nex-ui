import { map } from '@nex-ui/utils'
import * as Icon from '../index'
import type { StoryObj } from '@storybook/react-vite'

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
        {map(Icon, (Component, index) => (
          <span title={`${Component.displayName}`}>
            <Component key={index} />
          </span>
        ))}
      </div>
    )
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Icons: Story = {}
