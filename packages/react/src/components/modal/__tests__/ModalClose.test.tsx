import { fireEvent, waitFor, act } from '@testing-library/react'
import { renderWithNexUIProvider } from '~/tests/shared'
import { Modal, ModalPanel, ModalRoot, ModalClose } from '../index'

describe('ModalClose', () => {
  it('should close when the ModalClose is clicked', async () => {
    const { getByTestId, queryByTestId, user } = await renderWithNexUIProvider(
      <Modal defaultOpen>
        <ModalClose>
          <button data-testid='close-button'>Close Modal</button>
        </ModalClose>
        <ModalRoot data-testid='modal-root'>
          <ModalPanel />
        </ModalRoot>
      </Modal>,
      {
        useAct: true,
      },
    )

    expect(queryByTestId('modal-root')).toBeInTheDocument()
    const closeButton = getByTestId('close-button')

    await user.click(closeButton)
    expect(queryByTestId('modal-root')).toBeNull()
  })

  it("should return children as-is when ModalClose's children is not a valid React element", async () => {
    const { container } = await renderWithNexUIProvider(
      <Modal>
        <ModalClose>Child</ModalClose>
      </Modal>,
      {
        useAct: true,
      },
    )

    expect(container.textContent).toBe('Child')
  })

  it("should async close when the children's onClick returns a resolved Promise", async () => {
    jest.useFakeTimers()

    const { getByTestId, queryByTestId } = await renderWithNexUIProvider(
      <Modal defaultOpen>
        <ModalClose>
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
        </ModalClose>
        <ModalRoot data-testid='modal-root'>
          <ModalPanel />
        </ModalRoot>
      </Modal>,
      {
        useAct: true,
      },
    )

    expect(queryByTestId('modal-root')).toBeInTheDocument()
    const closeButton = getByTestId('close-button')

    fireEvent.click(closeButton)

    jest.runAllTimers()

    await waitFor(() => {
      expect(queryByTestId('modal-root')).toBeNull()
    })

    jest.useRealTimers()
  })

  it('should not close when the children onClick return a rejected Promise', async () => {
    const { getByTestId, queryByTestId, user } = await renderWithNexUIProvider(
      <Modal defaultOpen>
        <ModalClose>
          <button
            data-testid='close-button'
            onClick={() => {
              return Promise.reject()
            }}
          >
            Close Modal
          </button>
        </ModalClose>
        <ModalRoot data-testid='modal-root'>
          <ModalPanel />
        </ModalRoot>
      </Modal>,
      {
        useAct: true,
      },
    )

    expect(queryByTestId('modal-root')).toBeInTheDocument()
    const closeButton = getByTestId('close-button')

    await act(() => user.click(closeButton))

    await new Promise((resolve) => setTimeout(resolve, 500))

    expect(queryByTestId('modal-root')).toBeInTheDocument()
  })
})
