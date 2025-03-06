import { map } from '@nex-ui/utils'
import type { StoryObj } from '@storybook/react'
import * as Icon from '../index'

const meta = {
  title: 'Components/Icon',
  argTypes: {},
  render: () => {
    return (
      <>
        {map(Icon, (Component, index) => (
          <Component key={index} />
        ))}
      </>
    )
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Icons: Story = {}
