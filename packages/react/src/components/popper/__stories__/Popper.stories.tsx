import { useEffect, useRef, useState } from 'react'
import { Popper, PopperAnchor, PopperContent, PopperPortal } from '../index'
import type { Meta } from '@storybook/react-vite'
import type { PopperContentProps } from '../types'

const PLACEMENTS = [
  'top-start',
  'top',
  'top-end',
  'right-start',
  'right',
  'right-end',
  'bottom-start',
  'bottom',
  'bottom-end',
  'left-start',
  'left',
  'left-end',
] as const

const meta: Meta = {
  title: 'Utilities/Popper',
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export default meta

export function Default() {
  const [open, setOpen] = useState(false)
  const innerRef = useRef<HTMLDivElement>(null)
  const outerRef = useRef<HTMLDivElement>(null)
  const [shift, setShift] = useState(true)
  const [placement, setPlacement] =
    useState<PopperContentProps['placement']>('top')
  const [offset, setOffset] = useState(5)
  const [advancedOffset, setAdvancedOffset] = useState({
    mainAxis: 5,
    crossAxis: 5,
  })
  const [useAdvancedOffset, setUseAdvancedOffset] = useState(false)
  const [flip, setFlip] = useState({
    mainAxis: true,
    crossAxis: true,
  })
  const [closeOnDetached, setCloseOnDetached] = useState(true)
  const [closeOnEscape, setCloseOnEscape] = useState(true)

  useEffect(() => {
    outerRef.current?.scrollTo(400, 400)
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        gap: 50,
      }}
    >
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
            checked={shift}
            onChange={(e) => setShift(e.target.checked)}
          />
          &nbsp;Shift to keep in view?
        </label>
        <label>
          <input
            type='checkbox'
            checked={closeOnEscape}
            onChange={(e) => setCloseOnEscape(e.target.checked)}
          />
          &nbsp;Dismiss on escape?
        </label>
        <label>
          <input
            type='checkbox'
            checked={closeOnDetached}
            onChange={(e) => setCloseOnDetached(e.target.checked)}
          />
          &nbsp;Dismiss on detached from viewport?
        </label>
        <div>
          Flip options:&nbsp;
          <label>
            <input
              type='checkbox'
              checked={flip.mainAxis}
              onChange={(e) =>
                setFlip((prev) => ({ ...prev, mainAxis: e.target.checked }))
              }
            />
            &nbsp;Flip on main axis?
          </label>
          <label>
            <input
              type='checkbox'
              checked={flip.crossAxis}
              onChange={(e) =>
                setFlip((prev) => ({ ...prev, crossAxis: e.target.checked }))
              }
            />
            &nbsp;Flip on cross axis?
          </label>
        </div>
        <label>
          Placement:&nbsp;
          <select
            value={placement}
            onChange={(e) => setPlacement(e.target.value as any)}
          >
            {PLACEMENTS.map((pl) => (
              <option key={pl} value={pl}>
                {pl}
              </option>
            ))}
          </select>
        </label>
        <label>
          <input
            type='checkbox'
            checked={useAdvancedOffset}
            onChange={(e) => setUseAdvancedOffset(e.target.checked)}
          />
          &nbsp;Use advanced offset options?
        </label>
        {useAdvancedOffset ? (
          <>
            <label>
              Main Axis Offset:&nbsp;
              <input
                type='number'
                value={advancedOffset.mainAxis}
                onChange={(e) =>
                  setAdvancedOffset((prev) => ({
                    ...prev,
                    mainAxis: Number(e.target.value),
                  }))
                }
              />
            </label>
            <label>
              Cross Axis Offset:&nbsp;
              <input
                type='number'
                value={advancedOffset.crossAxis}
                onChange={(e) =>
                  setAdvancedOffset((prev) => ({
                    ...prev,
                    crossAxis: Number(e.target.value),
                  }))
                }
              />
            </label>
          </>
        ) : (
          <label>
            Offset:&nbsp;
            <input
              type='number'
              value={offset as number}
              onChange={(e) => setOffset(Number(e.target.value))}
            />
          </label>
        )}
      </div>
      <div
        style={{
          width: 400,
          height: 400,
          overflow: 'auto',
          border: '1px solid #000',
        }}
        ref={outerRef}
      >
        <div
          style={{
            height: 1200,
            width: 1200,
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          ref={innerRef}
        >
          <Popper open={open} onOpenChange={setOpen}>
            <PopperAnchor>
              <button
                onClick={() => {
                  setOpen(true)
                }}
              >
                Open Popper
              </button>
            </PopperAnchor>
            <PopperPortal container={() => innerRef.current}>
              <PopperContent
                closeOnDetached={closeOnDetached}
                closeOnEscape={closeOnEscape}
                placement={placement}
                offset={useAdvancedOffset ? advancedOffset : offset}
                flip={flip}
                shift={shift}
              >
                <div
                  style={{
                    border: '1px solid #000',
                  }}
                >
                  This is the popper content.
                </div>
              </PopperContent>
            </PopperPortal>
          </Popper>
        </div>
      </div>
    </div>
  )
}
