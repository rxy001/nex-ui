import { useState, useRef } from 'react'
import { DismissibleLayer } from '../index'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { DismissibleLayerProps } from '../index'

const DismissibleLayerTemplate = () => {
  const [open, setOpen] = useState(false)
  const openButtonRef = useRef(null)

  const [dismissOnEscape, setDismissOnEscape] = useState(false)
  const [dismissOnPointerDownOutside, setDismissOnPointerDownOutside] =
    useState(false)
  const [dismissOnFocusOutside, setDismissOnFocusOutside] = useState(false)

  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>DismissibleLayer</h1>
      <div
        style={{ display: 'inline-block', textAlign: 'left', marginBottom: 20 }}
      >
        <label style={{ display: 'block' }}>
          <input
            type='checkbox'
            checked={dismissOnEscape}
            onChange={(event) => setDismissOnEscape(event.target.checked)}
          />{' '}
          Dismiss on escape?
        </label>

        <label style={{ display: 'block' }}>
          <input
            type='checkbox'
            checked={dismissOnPointerDownOutside}
            onChange={(event) =>
              setDismissOnPointerDownOutside(event.target.checked)
            }
          />{' '}
          Dismiss on pointer down outside?
        </label>

        <label style={{ display: 'block' }}>
          <input
            type='checkbox'
            checked={dismissOnFocusOutside}
            onChange={(event) => setDismissOnFocusOutside(event.target.checked)}
          />{' '}
          Dismiss on focus outside?
        </label>

        <hr />
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

const meta = {
  title: 'Utilities/DismissibleLayer',
  component: DismissibleLayer,
  args: {},
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: () => <DismissibleLayerTemplate />,
} satisfies Meta<DismissibleLayerProps>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <div />,
  },
}
