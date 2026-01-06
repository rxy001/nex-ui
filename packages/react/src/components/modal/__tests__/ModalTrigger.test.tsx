import { renderWithNexUIProvider } from '~/tests/shared'
import { useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalPanel,
  ModalRoot,
  ModalTrigger,
  ModalPortal,
} from '../index'
import type { ModalTriggerProps } from '../types'

function TestModal(props: ModalTriggerProps) {
  const [open, setOpen] = useState(false)

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger {...props} />
      <ModalPortal disableAnimation>
        <ModalRoot data-testid='modal-root'>
          <ModalPanel>
            <ModalContent data-testid='modal-content'>Content</ModalContent>
          </ModalPanel>
        </ModalRoot>
      </ModalPortal>
    </Modal>
  )
}

describe('ModalTrigger', () => {
  it('should open when the ModalTrigger is clicked', async () => {
    const { getByTestId, queryByTestId, user } = renderWithNexUIProvider(
      <TestModal>
        <button data-testid='open-button'>Open Modal</button>
      </TestModal>,
    )

    expect(queryByTestId('modal-root')).toBeNull()
    const openButton = getByTestId('open-button')

    await user.click(openButton)
    expect(queryByTestId('modal-root')).toBeInTheDocument()
  })

  it("should return children as-is when ModalTrigger's children is not a valid React element", () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
    const { container } = renderWithNexUIProvider(
      <TestModal>Invalid Element</TestModal>,
    )
    expect(container.textContent).toBe('Invalid Element')
    expect(consoleSpy).toHaveBeenCalled()
    consoleSpy.mockRestore()
  })

  describe('Accessibility', () => {
    it('should have aria-haspopup attribute', () => {
      const { getByTestId } = renderWithNexUIProvider(
        <TestModal>
          <button data-testid='open-button'>Open Modal</button>
        </TestModal>,
      )

      const openButton = getByTestId('open-button')
      expect(openButton).toHaveAttribute('aria-haspopup', 'dialog')
    })

    it('should have aria-expanded={open} attribute', async () => {
      const { getByTestId, user } = renderWithNexUIProvider(
        <TestModal>
          <button data-testid='open-button'>Open Modal</button>
        </TestModal>,
      )

      const openButton = getByTestId('open-button')
      expect(openButton).toHaveAttribute('aria-expanded', 'false')

      await user.click(openButton)
      expect(openButton).toHaveAttribute('aria-expanded', 'true')
    })

    it('should have aria-controls={modalContentId} attribute when the modal is open', async () => {
      const { getByTestId, queryByTestId, user } = renderWithNexUIProvider(
        <TestModal>
          <button data-testid='open-button'>Open Modal</button>
        </TestModal>,
      )

      const openButton = getByTestId('open-button')

      expect(queryByTestId('modal-content')).toBeNull()
      expect(openButton).not.toHaveAttribute('aria-controls')

      await user.click(openButton)
      const modalContent = getByTestId('modal-content')
      expect(openButton).toHaveAttribute('aria-controls', modalContent.id)
      expect(queryByTestId('modal-content')).toBeInTheDocument()
    })
  })
})
