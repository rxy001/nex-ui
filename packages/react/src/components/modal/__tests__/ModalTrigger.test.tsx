import { renderWithNexUIProvider } from '~/tests/shared'
import { Modal, ModalPanel, ModalRoot, ModalTrigger } from '../index'

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
})
