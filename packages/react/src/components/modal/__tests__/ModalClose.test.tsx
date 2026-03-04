import { useState } from 'react'
import { renderWithNexUIProvider } from '~/tests/shared'
import { Modal, ModalClose, ModalPortal, ModalContent } from '../index'
import type { ModalCloseProps } from '../index'

function TestModal(props: ModalCloseProps) {
  const [open, setOpen] = useState(true)

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalPortal disablePresence>
        <ModalContent data-testid='modal-content'>
          <ModalClose {...props} />
        </ModalContent>
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

    const modalContent = queryByTestId('modal-content')
    expect(modalContent).toBeInTheDocument()
    const closeButton = getByTestId('close-button')

    await user.click(closeButton)
    expect(modalContent).not.toBeInTheDocument()
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

  it('should close when the children onClick does not prevent default', async () => {
    const { getByTestId, queryByTestId, user } = renderWithNexUIProvider(
      <TestModal>
        <button data-testid='close-button' onClick={() => {}}>
          Close Modal
        </button>
      </TestModal>,
    )

    const modalContent = queryByTestId('modal-content')
    const closeButton = getByTestId('close-button')

    expect(modalContent).toBeInTheDocument()

    await user.click(closeButton)

    expect(modalContent).not.toBeInTheDocument()
  })

  it('should not close when the children onClick prevents default', async () => {
    const { getByTestId, queryByTestId, user } = renderWithNexUIProvider(
      <TestModal>
        <button
          data-testid='close-button'
          onClick={(event) => {
            event.preventDefault()
          }}
        >
          Close Modal
        </button>
      </TestModal>,
    )

    const modalContent = queryByTestId('modal-content')
    const closeButton = getByTestId('close-button')

    expect(modalContent).toBeInTheDocument()

    await user.click(closeButton)

    expect(modalContent).toBeInTheDocument()
  })

  it('should not close when the children onClick is async and calls preventDefault', async () => {
    const { getByTestId, queryByTestId, user, rerender } =
      renderWithNexUIProvider(
        <TestModal>
          <button
            data-testid='close-button'
            onClick={async (event) => {
              event.preventDefault()
              return Promise.resolve()
            }}
          >
            Close Modal
          </button>
        </TestModal>,
      )

    const modalContent = queryByTestId('modal-content')
    const closeButton = getByTestId('close-button')
    expect(modalContent).toBeInTheDocument()

    await user.click(closeButton)

    expect(modalContent).toBeInTheDocument()

    rerender(
      <TestModal>
        <button
          data-testid='close-button'
          onClick={async (event) => {
            event.preventDefault()
            return Promise.reject()
          }}
        >
          Close Modal
        </button>
      </TestModal>,
    )

    await user.click(closeButton)

    expect(modalContent).toBeInTheDocument()
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
