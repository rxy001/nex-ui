import { renderWithNexUIProvider } from '~/tests/shared'
import {
  Modal,
  ModalContent,
  ModalPanel,
  ModalRoot,
  ModalTrigger,
} from '../index'

describe('ModalTrigger', () => {
  it('should open when the ModalTrigger is clicked', async () => {
    const { getByTestId, queryByTestId, user } = await renderWithNexUIProvider(
      <Modal>
        <ModalTrigger>
          <button data-testid='open-button'>Open Modal</button>
        </ModalTrigger>
        <ModalRoot data-testid='modal-root'>
          <ModalPanel />
        </ModalRoot>
      </Modal>,
      {
        useAct: true,
      },
    )

    expect(queryByTestId('modal-root')).toBeNull()
    const openButton = getByTestId('open-button')

    await user.click(openButton)
    expect(queryByTestId('modal-root')).toBeInTheDocument()
  })

  it("should return children as-is when ModalTrigger's children is not a valid React element", async () => {
    const { container } = await renderWithNexUIProvider(
      <Modal>
        <ModalTrigger>Child</ModalTrigger>
      </Modal>,
      {
        useAct: true,
      },
    )

    expect(container.textContent).toBe('Child')
  })

  describe('Accessibility', () => {
    it('should have aria-haspopup attribute', async () => {
      const { getByTestId } = await renderWithNexUIProvider(
        <Modal>
          <ModalTrigger>
            <button data-testid='open-button'>Open Modal</button>
          </ModalTrigger>
        </Modal>,
        {
          useAct: true,
        },
      )

      const openButton = getByTestId('open-button')
      expect(openButton).toHaveAttribute('aria-haspopup', 'dialog')
    })

    it('should have aria-expanded={open} attribute', async () => {
      const { getByTestId, user } = await renderWithNexUIProvider(
        <Modal>
          <ModalTrigger>
            <button data-testid='open-button'>Open Modal</button>
          </ModalTrigger>
          <ModalRoot data-testid='modal-root'>
            <ModalPanel />
          </ModalRoot>
        </Modal>,
        {
          useAct: true,
        },
      )

      const openButton = getByTestId('open-button')
      expect(openButton).toHaveAttribute('aria-expanded', 'false')

      await user.click(openButton)
      expect(openButton).toHaveAttribute('aria-expanded', 'true')
    })

    it('should always have aria-controls={modalContentId} attribute when the keepMounted is true', async () => {
      const { getByTestId, user } = await renderWithNexUIProvider(
        <Modal keepMounted>
          <ModalTrigger>
            <button data-testid='open-button'>Open Modal</button>
          </ModalTrigger>
          <ModalRoot>
            <ModalPanel>
              <ModalContent data-testid='modal-content'>Content</ModalContent>
            </ModalPanel>
          </ModalRoot>
        </Modal>,
        {
          useAct: true,
        },
      )

      const openButton = getByTestId('open-button')
      const modalContent = getByTestId('modal-content')

      expect(openButton).toHaveAttribute('aria-controls', modalContent.id)
      expect(modalContent).toBeInTheDocument()

      await user.click(openButton)
      expect(openButton).toHaveAttribute('aria-controls', modalContent.id)
    })

    it('should have aria-controls={modalContentId} attribute when the keepMounted is false and the modal is open', async () => {
      const { getByTestId, queryByTestId, user } =
        await renderWithNexUIProvider(
          <Modal keepMounted={false}>
            <ModalTrigger>
              <button data-testid='open-button'>Open Modal</button>
            </ModalTrigger>
            <ModalRoot>
              <ModalPanel>
                <ModalContent data-testid='modal-content'>Content</ModalContent>
              </ModalPanel>
            </ModalRoot>
          </Modal>,
          {
            useAct: true,
          },
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
