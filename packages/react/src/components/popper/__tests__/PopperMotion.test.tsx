import { act } from '@testing-library/react'
import { renderWithNexUIProvider, testVariantDataAttrs } from '~/tests/shared'
import {
  Popper,
  PopperRoot,
  PopperContent,
  PopperTrigger,
  PopperPortal,
  PopperMotion,
} from '../index'
import type { PopperProps } from '../index'
import type { PopperMotionProps } from '../types'

type TestPopperProps = PopperProps & PopperMotionProps

function TestPopper({
  open,
  defaultOpen,
  openDelay = 0,
  closeDelay = 0,
  onOpenChange,
  ...props
}: TestPopperProps) {
  return (
    <Popper
      open={open}
      onOpenChange={onOpenChange}
      defaultOpen={defaultOpen}
      openDelay={openDelay}
      closeDelay={closeDelay}
    >
      <PopperTrigger>
        <button data-testid='popper-trigger'>Trigger</button>
      </PopperTrigger>
      <PopperPortal>
        <PopperMotion {...props} data-testid='popper-motion'>
          <PopperRoot data-testid='popper-root'>
            <PopperContent data-testid='popper-content'>
              Popper Content
            </PopperContent>
          </PopperRoot>
        </PopperMotion>
      </PopperPortal>
    </Popper>
  )
}

describe('PopperMotion', () => {
  testVariantDataAttrs(<TestPopper open />, ['keepMounted', [true, false]], {
    useAct: true,
  })

  it('should always keep the children in the DOM when keepMounted=true', async () => {
    const { getByTestId, rerender } = await renderWithNexUIProvider(
      <TestPopper keepMounted open={false} />,
      {
        useAct: true,
      },
    )

    const popperMotion = getByTestId('popper-motion')
    expect(popperMotion).toBeInTheDocument()

    await act(async () => {
      rerender(<TestPopper keepMounted open />)
    })

    expect(popperMotion).toBeInTheDocument()
  })

  describe('Accessibility', () => {
    it('should be aria-hidden when the popper is closed and keepMounted is true', async () => {
      const { getByTestId } = await renderWithNexUIProvider(
        <TestPopper open={false} keepMounted />,
        {
          useAct: true,
        },
      )
      const popperMotion = getByTestId('popper-motion')
      expect(popperMotion).toHaveAttribute('aria-hidden', 'true')
    })
  })
})
