import { waitForElementToBeRemoved } from '@testing-library/react'
import { renderWithNexUIProvider } from '~/tests/shared'
import { Modal, ModalPanel, ModalRoot, ModalClose, ModalPortal } from '../index'
import type { ModalCloseProps } from '../index'

function TestModal(props: ModalCloseProps) {
  return (
    <Modal defaultOpen>
      <ModalClose {...props} />
      <ModalPortal animateDisabled>
        <ModalRoot data-testid='modal-root'>
          <ModalPanel />
        </ModalRoot>
      </ModalPortal>
    </Modal>
  )
}

describe('ModalClose', () => {
  it('should close when the ModalClose is clicked', async () => {
    const { getByTestId, queryByTestId, user } = renderWithNexUIProvider(
      <TestModal>
        <button data-testid='close-button'>Close Modal</button>
      </TestModal>,
    )

    const modalRoot = queryByTestId('modal-root')
    expect(modalRoot).toBeInTheDocument()
    const closeButton = getByTestId('close-button')

    await user.click(closeButton)
    expect(modalRoot).not.toBeInTheDocument()
  })

  it("should return children as-is when ModalClose's children is not a valid React element", () => {
    const { container } = renderWithNexUIProvider(<TestModal>Child</TestModal>)

    expect(container.textContent).toBe('Child')
  })

  it("should async close when the children's onClick returns a resolved Promise", async () => {
    jest.useFakeTimers()

    const { getByTestId, queryByTestId, user } = renderWithNexUIProvider(
      <TestModal>
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
          Close Modal
        </button>
      </TestModal>,
      {
        userEventOptions: {
          advanceTimers: jest.advanceTimersByTime,
        },
      },
    )

    const modalRoot = queryByTestId('modal-root')
    expect(modalRoot).toBeInTheDocument()
    const closeButton = getByTestId('close-button')

    await user.click(closeButton)

    jest.advanceTimersByTime(1000)

    expect(modalRoot).toBeInTheDocument()

    jest.advanceTimersByTime(2100)

    await waitForElementToBeRemoved(() => queryByTestId('modal-root'))

    expect(modalRoot).not.toBeInTheDocument()

    jest.useRealTimers()
  })

  it('should not close when the children onClick return a rejected Promise', async () => {
    const { getByTestId, queryByTestId, user } = renderWithNexUIProvider(
      <TestModal>
        <button
          data-testid='close-button'
          onClick={() => {
            return Promise.reject()
          }}
        >
          Close Modal
        </button>
      </TestModal>,
    )

    const modalRoot = queryByTestId('modal-root')
    expect(modalRoot).toBeInTheDocument()
    const closeButton = getByTestId('close-button')

    await user.click(closeButton)

    await new Promise((resolve) => setTimeout(resolve, 500))

    expect(modalRoot).toBeInTheDocument()
  })

  describe('Accessibility', () => {
    it('should have aria-label="Close" by default', () => {
      const { getByTestId } = renderWithNexUIProvider(
        <TestModal>
          <button data-testid='close-button'>Close Modal</button>
        </TestModal>,
      )

      const closeButton = getByTestId('close-button')

      expect(closeButton).toHaveAttribute('aria-label', 'Close')
    })
  })
})
