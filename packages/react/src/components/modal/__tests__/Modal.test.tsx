import { renderWithNexUIProvider, testComponentStability } from '~/tests/shared'
import { useState } from 'react'
import { fireEvent, act, waitFor } from '@testing-library/react'
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalPanel,
  ModalRoot,
  ModalTrigger,
} from '../index'
import type { ModalProps } from '../index'

describe('Modal', () => {
  function TestModal(props: ModalProps) {
    return (
      <Modal {...props}>
        <ModalRoot data-testid='modal-root'>
          <ModalBackdrop data-testid='modal-backdrop' />
          <ModalPanel data-testid='modal-panel'>
            <ModalContent data-testid='modal-content'>
              <ModalHeader data-testid='modal-header'>Test Modal</ModalHeader>
              <ModalBody data-testid='modal-body'>
                This is a test modal body.
              </ModalBody>
              <ModalFooter data-testid='modal-footer'>
                Test Modal Footer
              </ModalFooter>
            </ModalContent>
          </ModalPanel>
        </ModalRoot>
      </Modal>
    )
  }

  const ControlledModal = ({ defaultOpen = false, ...props }: ModalProps) => {
    const [open, setOpen] = useState(defaultOpen)

    return (
      <>
        <TestModal open={open} onOpenChange={setOpen} {...props} />
        <button
          data-testid='toggle-button'
          onClick={() => setOpen((prev) => !prev)}
        >
          Toggle Modal
        </button>
      </>
    )
  }

  testComponentStability(<TestModal open />, {
    useAct: true,
  })

  it('should not render children by default', async () => {
    const { queryByTestId } = await renderWithNexUIProvider(<TestModal />, {
      useAct: true,
    })
    expect(queryByTestId('modal-root')).toBeNull()
  })

  it('should render into document.body via Portal when open', async () => {
    const { container, getByTestId } = await renderWithNexUIProvider(
      <TestModal open />,
      {
        useAct: true,
      },
    )

    expect(container.firstChild).toBeNull()

    const modalRoot = getByTestId('modal-root')
    expect(modalRoot.parentElement).toBe(document.body)

    const modalHeader = getByTestId('modal-header')
    expect(modalRoot).toContainElement(modalHeader)

    const modalBody = getByTestId('modal-body')
    expect(modalRoot).toContainElement(modalBody)

    const modalFooter = getByTestId('modal-footer')
    expect(modalRoot).toContainElement(modalFooter)
  })

  it('should render into document.body via Portal when defaultOpen', async () => {
    const { container, getByTestId } = await renderWithNexUIProvider(
      <TestModal defaultOpen />,
      {
        useAct: true,
      },
    )

    expect(container.firstChild).toBeNull()

    const modalRoot = getByTestId('modal-root')
    expect(modalRoot.parentElement).toBe(document.body)
  })

  it('should render into custom container when container prop is provided', async () => {
    const container = document.createElement('div')
    document.body.appendChild(container)

    const { getByTestId } = await renderWithNexUIProvider(
      <TestModal open container={container} />,
      {
        useAct: true,
      },
    )

    expect(container.firstChild).not.toBeNull()

    const modalRoot = getByTestId('modal-root')
    expect(modalRoot.parentElement).toBe(container)

    container.remove()
  })

  it('should be controlled by open prop', async () => {
    const { queryByTestId, getByTestId } = await renderWithNexUIProvider(
      <ControlledModal />,
      {
        useAct: true,
      },
    )
    expect(queryByTestId('modal-root')).toBeNull()

    const toggleButton = getByTestId('toggle-button')

    await act(async () => {
      fireEvent.click(toggleButton)
    })
    expect(queryByTestId('modal-root')).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(toggleButton)
    })
    expect(queryByTestId('modal-root')).toBeNull()
  })

  it('should close when clicking outside the modal', async () => {
    const { getByTestId, queryByTestId, rerender } =
      await renderWithNexUIProvider(<ControlledModal defaultOpen />, {
        useAct: true,
      })

    expect(queryByTestId('modal-root')).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(getByTestId('modal-panel'))
    })

    expect(queryByTestId('modal-root')).toBeNull()

    // test uncontrolled behavior
    rerender(<TestModal defaultOpen />)
    expect(queryByTestId('modal-root')).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(getByTestId('modal-panel'))
    })
    expect(queryByTestId('modal-root')).toBeNull()
  })

  it('should not close when clicking its panel and closeOnInteractOutside=false', async () => {
    const { getByTestId, queryByTestId, rerender } =
      await renderWithNexUIProvider(
        <ControlledModal closeOnInteractOutside={false} defaultOpen />,
        {
          useAct: true,
        },
      )

    expect(queryByTestId('modal-root')).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(getByTestId('modal-panel'))
    })
    expect(queryByTestId('modal-root')).toBeInTheDocument()

    // test uncontrolled behavior
    rerender(<TestModal defaultOpen closeOnInteractOutside={false} />)
    expect(queryByTestId('modal-root')).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(getByTestId('modal-panel'))
    })
    expect(queryByTestId('modal-root')).toBeInTheDocument()
  })

  it('should close when pressing Escape key', async () => {
    const { queryByTestId, rerender, user } = await renderWithNexUIProvider(
      <ControlledModal defaultOpen />,
      {
        useAct: true,
      },
    )

    expect(queryByTestId('modal-root')).toBeInTheDocument()

    await user.keyboard('[Escape]')
    expect(queryByTestId('modal-root')).toBeNull()

    // test uncontrolled behavior
    rerender(<TestModal defaultOpen />)
    expect(queryByTestId('modal-root')).toBeInTheDocument()

    await user.keyboard('[Escape]')
    expect(queryByTestId('modal-root')).toBeNull()
  })

  it('should not close when pressing Escape key if closeOnEscape=false', async () => {
    const { queryByTestId, rerender, user } = await renderWithNexUIProvider(
      <ControlledModal closeOnEscape={false} defaultOpen />,
      {
        useAct: true,
      },
    )

    expect(queryByTestId('modal-root')).toBeInTheDocument()

    await user.keyboard('[Escape]')
    expect(queryByTestId('modal-root')).toBeInTheDocument()

    // test uncontrolled behavior
    rerender(<TestModal defaultOpen closeOnEscape={false} />)
    expect(queryByTestId('modal-root')).toBeInTheDocument()

    await user.keyboard('[Escape]')
    expect(queryByTestId('modal-root')).toBeInTheDocument()
  })

  it('should alway keep the children in the DOM when keepMounted=true', async () => {
    const { getByTestId, rerender } = await renderWithNexUIProvider(
      <TestModal keepMounted open={false} />,
      {
        useAct: true,
      },
    )
    const modalRoot = getByTestId('modal-root')

    expect(modalRoot).toHaveStyle({
      opacity: '0',
      display: 'none',
    })

    rerender(<TestModal keepMounted open />)
    waitFor(
      () =>
        expect(modalRoot.parentElement).toHaveStyle({
          display: 'block',
          opacity: '1',
        }),
      {
        timeout: 1000,
      },
    )

    rerender(<TestModal keepMounted open={false} />)
    waitFor(
      () => {
        return expect(modalRoot).toHaveStyle({
          display: 'none',
          opacity: '0',
        })
      },
      {
        timeout: 1000,
      },
    )
  })

  it('should prevent page scrolling when preventScroll=true', async () => {
    await renderWithNexUIProvider(<TestModal preventScroll open />, {
      useAct: true,
    })

    expect(document.body.style.overflow).toBe('hidden')
  })

  it('should not prevent page scrolling when preventScroll=false', async () => {
    await renderWithNexUIProvider(<TestModal preventScroll={false} open />, {
      useAct: true,
    })

    expect(document.body.style.overflow).not.toBe('hidden')
  })

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

  describe('Accessibility', () => {
    it("should have tabIndex=-1 on the Modal's root element", async () => {
      const { getByTestId } = await renderWithNexUIProvider(
        <TestModal open />,
        {
          useAct: true,
        },
      )
      const root = getByTestId('modal-root')
      expect(root).toHaveAttribute('tabIndex', '-1')
      expect(root).not.toHaveAttribute('role')
    })

    it('should have role="dialog" on the ModalContent element', async () => {
      const { getByTestId } = await renderWithNexUIProvider(
        <TestModal open />,
        {
          useAct: true,
        },
      )
      const content = getByTestId('modal-content')
      expect(content).toHaveAttribute('role', 'dialog')
    })

    it('should have aria-modal="true" on the ModalContent element', async () => {
      const { getByTestId } = await renderWithNexUIProvider(
        <TestModal open />,
        {
          useAct: true,
        },
      )
      const content = getByTestId('modal-content')
      expect(content).toHaveAttribute('aria-modal', 'true')
    })

    it('should have aria-labelledby and aria-describedby attributes on the ModalContent element', async () => {
      const { getByTestId } = await renderWithNexUIProvider(
        <TestModal open />,
        {
          useAct: true,
        },
      )
      const content = getByTestId('modal-content')
      const header = getByTestId('modal-header')
      const body = getByTestId('modal-body')

      expect(content).toHaveAttribute('aria-labelledby', header.id)
      expect(content).toHaveAttribute('aria-describedby', body.id)
    })

    it('should have aria-labelledby and aria-describedby attributes on the ModalContent element when provided', async () => {
      const { getByTestId } = await renderWithNexUIProvider(
        <TestModal
          open
          aria-labelledby='custom-label'
          aria-describedby='custom-description'
        />,
        {
          useAct: true,
        },
      )
      const content = getByTestId('modal-content')

      expect(content).toHaveAttribute('aria-labelledby', 'custom-label')
      expect(content).toHaveAttribute('aria-describedby', 'custom-description')
    })

    it('should have tabIndex=-1 on the ModalContent element', async () => {
      const { getByTestId } = await renderWithNexUIProvider(
        <TestModal open />,
        {
          useAct: true,
        },
      )
      const content = getByTestId('modal-content')
      expect(content).toHaveAttribute('tabIndex', '-1')
    })

    it('should have aria-hidden=true on the ModalBackdrop element', async () => {
      const { getByTestId } = await renderWithNexUIProvider(
        <TestModal open />,
        {
          useAct: true,
        },
      )
      const backdrop = getByTestId('modal-backdrop')
      expect(backdrop).toHaveAttribute('aria-hidden', 'true')
    })

    it('should automatically focus the ModalContent when opened', async () => {
      const { getByRole } = await renderWithNexUIProvider(<TestModal open />, {
        useAct: true,
      })

      const content = getByRole('dialog')
      expect(document.activeElement).toBe(content)
    })

    it('should restore focus to previously focused element when closed with restoreFocus=true', async () => {
      const { getByTestId, user } = await renderWithNexUIProvider(
        <ControlledModal restoreFocus />,
        {
          useAct: true,
        },
      )

      const toggleButton = getByTestId('toggle-button')

      await user.click(toggleButton)
      await user.keyboard('[Escape]')
      expect(document.activeElement).toBe(toggleButton)
    })
  })
})
