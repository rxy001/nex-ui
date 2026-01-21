import { waitForElementToBeRemoved } from '@testing-library/react'
import { useState } from 'react'
import { renderWithNexUIProvider } from '~/tests/shared'
import {
  Modal,
  ModalRoot,
  ModalClose,
  ModalPortal,
  ModalContent,
} from '../index'
import type { ModalCloseProps } from '../index'

function TestModal(props: ModalCloseProps) {
  const [open, setOpen] = useState(true)

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalPortal disablePresence>
        <ModalRoot data-testid='modal-root'>
          <ModalContent>
            <ModalClose {...props} />
          </ModalContent>
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
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
    const { container } = renderWithNexUIProvider(
      // @ts-expect-error
      <TestModal>Invalid Element</TestModal>,
      {
        container: document.body,
      },
    )

    expect(container.textContent).toBe('Invalid Element')
    expect(consoleSpy).toHaveBeenCalled()
    consoleSpy.mockRestore()
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
