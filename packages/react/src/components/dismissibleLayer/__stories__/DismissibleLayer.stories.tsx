import { useState, useRef } from 'react'
import { DismissibleLayer } from '../index'
import type { Meta } from '@storybook/react-vite'

const meta: Meta = {
  title: 'Utilities/DismissibleLayer',
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export default meta

export function Default() {
  const [open, setOpen] = useState(false)
  const openButtonRef = useRef(null)
  const [dismissOnEscape, setDismissOnEscape] = useState(false)
  const [dismissOnPointerDownOutside, setDismissOnPointerDownOutside] =
    useState(false)
  const [dismissOnFocusOutside, setDismissOnFocusOutside] = useState(false)

  return (
    <div>
      <div
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          textAlign: 'left',
          marginBottom: 20,
        }}
      >
        <label>
          <input
            type='checkbox'
            checked={dismissOnEscape}
            onChange={(event) => setDismissOnEscape(event.target.checked)}
          />
          &nbsp;Dismiss on escape?
        </label>
        <label>
          <input
            type='checkbox'
            checked={dismissOnPointerDownOutside}
            onChange={(event) =>
              setDismissOnPointerDownOutside(event.target.checked)
            }
          />
          &nbsp;Dismiss on pointer down outside?
        </label>
        <label>
          <input
            type='checkbox'
            checked={dismissOnFocusOutside}
            onChange={(event) => setDismissOnFocusOutside(event.target.checked)}
          />
          &nbsp;Dismiss on focus outside?
        </label>
        <hr style={{ width: '100%' }} />
      </div>
      <div style={{ marginBottom: 20 }}>
        <button
          ref={openButtonRef}
          type='button'
          onClick={() => setOpen((open) => !open)}
        >
          {open ? 'Close' : 'Open'} layer
        </button>
      </div>
      {open ? (
        <DismissibleLayer
          onEscapeKeyDown={(event) => {
            if (dismissOnEscape === false) {
              event.preventDefault()
            }
          }}
          onPointerDownOutside={(event) => {
            if (
              dismissOnPointerDownOutside === false ||
              event.target === openButtonRef.current
            ) {
              event.preventDefault()
            }
          }}
          onFocusOutside={(event) => {
            if (dismissOnFocusOutside === false) {
              event.preventDefault()
            }
          }}
          onDismiss={() => setOpen(false)}
        >
          <div
            style={{
              display: 'inline-flex',
              justifyContent: 'center',
              alignItems: 'center',
              verticalAlign: 'middle',
              width: 400,
              height: 300,
              backgroundColor: 'black',
              borderRadius: 10,
              marginBottom: 20,
            }}
          >
            <input type='text' />
          </div>
        </DismissibleLayer>
      ) : null}
      <div style={{ marginBottom: 20 }}>
        <input type='text' defaultValue='hello' style={{ marginRight: 20 }} />
        <button type='button' onMouseDown={() => alert('hey!')}>
          hey!
        </button>
      </div>
    </div>
  )
}
