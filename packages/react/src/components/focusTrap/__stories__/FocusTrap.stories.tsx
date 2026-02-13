import { useState } from 'react'
import { FocusTrap } from '../FocusTrap'
import type { Meta } from '@storybook/react-vite'

const meta: Meta = {
  title: 'Utilities/FocusTrap',
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export default meta

export const Default = () => {
  const [trapped, setTrapped] = useState(false)
  const [loop, setLoop] = useState(true)
  const [autoFocus, setAutoFocus] = useState(false)
  const [restoreFocus, setRestoreFocus] = useState(true)
  const [paused, setPaused] = useState(false)

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 10 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <label>
          <input
            type='checkbox'
            checked={loop}
            onChange={(event) => setLoop(event.target.checked)}
          />
          &nbsp;Loop around?
        </label>
        <label>
          <input
            type='checkbox'
            checked={autoFocus}
            onChange={(event) => setAutoFocus(event.target.checked)}
          />
          &nbsp;Auto focus on open?
        </label>
        <label>
          <input
            type='checkbox'
            checked={restoreFocus}
            onChange={(event) => setRestoreFocus(event.target.checked)}
          />
          &nbsp;Restore focus to trigger on close?
        </label>
        <label>
          <input
            type='checkbox'
            checked={paused}
            onChange={(event) => setPaused(event.target.checked)}
          />
          &nbsp;Paused?
        </label>
        <hr
          style={{
            width: '100%',
          }}
        />
      </div>
      <div>
        <button type='button' onClick={() => setTrapped(true)}>
          trap
        </button>
      </div>
      {trapped && (
        <FocusTrap
          loop={loop}
          active={trapped}
          autoFocus={autoFocus}
          restoreFocus={restoreFocus}
          paused={paused}
        >
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
            <h1>Focus Trap</h1>
            <input type='text' placeholder='First name' />
            <input type='text' placeholder='Last name' />
            <input type='number' placeholder='Age' />
            <button type='button' onClick={() => setTrapped(false)}>
              Close
            </button>
          </form>
        </FocusTrap>
      )}
      <label aria-label='input'>
        <input />
      </label>
    </div>
  )
}

export const MultipleTraps = () => {
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
        <label aria-label='input'>
          <input />
        </label>
      </div>
    </div>
  )
}
