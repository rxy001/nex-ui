import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../../button'
import { Flex } from '../index'

const meta = {
  title: 'Components/Flex',
  component: Flex,
  argTypes: {
    direction: {
      options: ['row', 'column', 'column-reverse', 'row-reverse', 'revert'],
      control: {
        type: 'select',
      },
    },
    justify: {
      options: [
        'start',
        'end',
        'flex-start',
        'flex-end',
        'center',
        'left',
        'right',
        'space-between',
        'space-around',
        'space-evenly',
        'stretch',
      ],
      control: {
        type: 'select',
      },
    },
    align: {
      options: [
        'normal',
        'flex-start',
        'flex-end',
        'center',
        'start',
        'end',
        'self-start',
        'self-end',
      ],
      control: {
        type: 'select',
      },
    },
    wrap: {
      options: ['nowrap', 'wrap', 'wrap-reverse'],
      control: {
        type: 'select',
      },
    },
    gap: {
      options: ['10px', '20px', '30px'],
      control: {
        type: 'select',
      },
    },
    grow: {
      options: [1, 3, 5],
      control: {
        type: 'select',
      },
    },
    shrink: {
      options: [1, 3, 5],
      control: {
        type: 'select',
      },
    },
    basis: {
      options: ['200px', '0', 'autp'],
      control: {
        type: 'select',
      },
    },
  },
  render: (args) => {
    return (
      <Flex {...args}>
        <Button>Button</Button>
        <Button color="purple">Button</Button>
        <Button color="gray">Button</Button>
        <Button color="red">Button</Button>
        <Button color="cyan">Button</Button>
        <Button color="pink">Button</Button>
        <Button color="yellow">Button</Button>
        <Button color="green">Button</Button>
        <Button color="orange">Button</Button>
      </Flex>
    )
  },
} satisfies Meta<typeof Flex>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {},
}
