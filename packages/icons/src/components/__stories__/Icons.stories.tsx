import { map } from '@nex-ui/utils'
import type { Meta, StoryObj } from '@storybook/react'
import * as Icon from '../index'
import type { IconProps } from '../../types'

const meta = {
  title: 'Components/Icon',
  argTypes: {
    fontSize: {
      options: ['sm', 'md', 'lg', '50px'],
      control: {
        type: 'select',
      },
    },
    color: {
      options: ['orange.500', 'blue.500', 'purple', '#eeeeee'],
      control: {
        type: 'select',
      },
    },
  },
  render: (args) => {
    return (
      <>
        {map(Icon, (C) => (
          <C {...args} />
        ))}
      </>
    )
  },
} satisfies Meta<IconProps>

export default meta

type Story = StoryObj<typeof meta>

export const Icons: Story = {}
