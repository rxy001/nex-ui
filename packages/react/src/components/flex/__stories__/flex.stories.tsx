import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../../button'
import { Flex } from '../Flex'

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
  },
  args: {
    gap: '20px',
  },
  render: (args) => {
    return (
      <Flex {...args}>
        <Button key='blue'>Button</Button>
        <Button key='purple' color='purple'>
          Button
        </Button>
        <Button key='gray' color='gray'>
          Button
        </Button>
        <Button key='red' color='red'>
          Button
        </Button>
        <Button key='cyan' color='cyan'>
          Button
        </Button>
        <Button key='pink' color='pink'>
          Button
        </Button>
        <Button key='yellow' color='yellow'>
          Button
        </Button>
        <Button key='green' color='green'>
          Button
        </Button>
        <Button key='orange' color='orange'>
          Button
        </Button>
      </Flex>
    )
  },
} satisfies Meta<typeof Flex>

export default meta

type Story = StoryObj<typeof meta>

export const FlexRow: Story = {
  args: {
    direction: 'row',
  },
}

export const FlexColumn: Story = {
  args: {
    direction: 'column',
  },
}
