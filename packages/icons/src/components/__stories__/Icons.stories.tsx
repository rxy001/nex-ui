import { map } from '@nex-ui/utils'
import * as Icon from '../index'
import type { StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/Icon',
  argTypes: {},
  render: () => {
    return (
      <div
        style={{
          display: 'flex',
          fontSize: '30px',
          gap: '10px',
          flexWrap: 'wrap',
        }}
      >
        {map(Icon, (Component, index) => (
          <Component key={index} />
        ))}
      </div>
    )
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Icons: Story = {}
