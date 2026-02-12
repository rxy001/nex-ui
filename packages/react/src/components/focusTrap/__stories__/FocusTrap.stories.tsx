import { useState } from 'react'
import { Flex } from '../../flex'
import { FocusTrap } from '../FocusTrap'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { FocusTrapProps } from '../types'

const meta = {
  title: 'Utilities/FocusTrap',
  component: FocusTrap,
  argTypes: {},
  args: {
    children: (
      <Flex gap='5'>
        <button>Button 1</button>
        <button>Button 2</button>
        <button>Button 3</button>
      </Flex>
    ),
    active: true,
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
} satisfies Meta<FocusTrapProps>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    loop: false,
  },
}

export const LoopFocus: Story = {
  args: {
    loop: true,
  },
}

const MultipleTemplate = () => {
  const [trapped1, setTrapped1] = useState(false)
  const [trapped2, setTrapped2] = useState(false)

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 10 }}>
      <div>
        <button type='button' onClick={() => setTrapped1(true)}>
          Trap 1
        </button>
      </div>
      {trapped1 ? (
        <FocusTrap loop={trapped1} active={trapped1}>
          <form
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              gap: 20,
              padding: 20,
              maxWidth: 500,
              border: '2px solid',
            }}
          >
            <h1>One</h1>
            <input type='text' placeholder='First name' />
            <input type='text' placeholder='Last name' />
            <input type='number' placeholder='Age' />
            <button type='button' onClick={() => setTrapped1(false)}>
              Close
            </button>
          </form>
        </FocusTrap>
      ) : null}
      <div>
        <button type='button' onClick={() => setTrapped2(true)}>
          Trap 2
        </button>
      </div>
      {trapped2 ? (
        <FocusTrap loop={trapped2} active={trapped2}>
          <form
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              gap: 20,
              padding: 20,
              maxWidth: 500,
              border: '2px solid',
            }}
          >
            <h1>Two</h1>
            <input type='text' placeholder='First name' />
            <input type='text' placeholder='Last name' />
            <input type='number' placeholder='Age' />
            <button type='button' onClick={() => setTrapped2(false)}>
              Close
            </button>
          </form>
        </FocusTrap>
      ) : null}
      <div>
        <input />
      </div>
    </div>
  )
}

export const MultipleTraps: Story = {
  render: () => <MultipleTemplate />,
}
