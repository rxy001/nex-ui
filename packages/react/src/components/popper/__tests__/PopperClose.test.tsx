import { waitForElementToBeRemoved } from '@testing-library/react'
import { renderWithNexUIProvider } from '~/tests/shared'
import { Popper, PopperClose, PopperContent, PopperRoot } from '../index'
import type { ReactNode } from 'react'

function TestPopper({ children }: { children?: ReactNode }) {
  return (
    <Popper defaultOpen openDelay={0} closeDelay={0}>
      <PopperRoot data-testid='popper-root'>
        <PopperContent data-testid='popper-content'>
          <PopperClose>{children}</PopperClose>
        </PopperContent>
      </PopperRoot>
    </Popper>
  )
}

describe('PopperClose', () => {
  it('should close when the PopperClose is clicked', async () => {
    const { getByTestId, queryByTestId, user } = await renderWithNexUIProvider(
      <TestPopper>
        <button data-testid='close-button'>Close Popper</button>
      </TestPopper>,
      {
        useAct: true,
      },
    )

    expect(queryByTestId('popper-root')).toBeInTheDocument()
    const closeButton = getByTestId('close-button')

    await user.click(closeButton)

    await waitForElementToBeRemoved(() => queryByTestId('popper-root'))

    expect(queryByTestId('popper-root')).toBeNull()
  })

  it("should return children as-is when PopperClose's children is not a valid React element", async () => {
    const { getByTestId } = await renderWithNexUIProvider(
      <TestPopper>
        <PopperClose>Close</PopperClose>
      </TestPopper>,
      {
        useAct: true,
      },
    )

    expect(getByTestId('popper-content').textContent).toBe('Close')
  })

  it("should async close when the children's onClick returns a resolved Promise", async () => {
    jest.useFakeTimers()

    const { getByTestId, queryByTestId, user } = await renderWithNexUIProvider(
      <TestPopper>
        <button
          data-testid='close-button'
          onClick={() => {
            return new Promise<void>((res) => {
              setTimeout(() => {
                res()
              }, 2000)
            })
          }}
        >
          Close Popper
        </button>
      </TestPopper>,
      {
        useAct: true,
        userEventOptions: { advanceTimers: jest.advanceTimersByTime },
      },
    )

    expect(queryByTestId('popper-root')).toBeInTheDocument()
    const closeButton = getByTestId('close-button')

    await user.click(closeButton)

    jest.advanceTimersByTime(1000)

    expect(queryByTestId('popper-root')).toBeInTheDocument()

    jest.advanceTimersByTime(2000)

    await waitForElementToBeRemoved(() => queryByTestId('popper-root'))

    expect(queryByTestId('popper-root')).toBeNull()

    jest.useRealTimers()
  })

  it('should not close when the children onClick return a rejected Promise', async () => {
    const { getByTestId, queryByTestId, user } = await renderWithNexUIProvider(
      <TestPopper>
        <button
          data-testid='close-button'
          onClick={() => {
            return Promise.reject()
          }}
        >
          Close Popper
        </button>
      </TestPopper>,
      {
        useAct: true,
      },
    )

    expect(queryByTestId('popper-root')).toBeInTheDocument()
    const closeButton = getByTestId('close-button')

    await user.click(closeButton)

    await new Promise((resolve) => setTimeout(resolve, 500))

    expect(queryByTestId('popper-root')).toBeInTheDocument()
  })

  describe('Accessibility', () => {
    it('should have aria-label="Close" by default', async () => {
      const { getByTestId } = await renderWithNexUIProvider(
        <TestPopper>
          <PopperClose>
            <button data-testid='close-button'>Close Popper</button>
          </PopperClose>
        </TestPopper>,
        {
          useAct: true,
        },
      )

      const closeButton = getByTestId('close-button')

      expect(closeButton).toHaveAttribute('aria-label', 'Close')
    })
  })
})
