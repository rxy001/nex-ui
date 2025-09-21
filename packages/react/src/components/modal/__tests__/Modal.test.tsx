import { renderWithNexUIProvider, testComponentStability } from '~/tests/shared'
import { useState } from 'react'
import { fireEvent, act, waitFor } from '@testing-library/react'
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalPanel,
  ModalRoot,
} from '../index'
import { getScrollBarWidth } from '../ModalRoot'
import type { ModalProps } from '../index'

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

describe('Modal', () => {
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
      <TestModal open container={() => container} />,
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
      <ControlledModal defaultOpen={false} />,
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
    await act(async () => {
      rerender(<TestModal defaultOpen />)
    })
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
    await act(async () => {
      rerender(<TestModal defaultOpen closeOnInteractOutside={false} />)
    })
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
    await act(async () => {
      rerender(<TestModal defaultOpen />)
    })
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
    await act(async () => {
      rerender(<TestModal defaultOpen closeOnEscape={false} />)
    })
    expect(queryByTestId('modal-root')).toBeInTheDocument()

    await user.keyboard('[Escape]')
    expect(queryByTestId('modal-root')).toBeInTheDocument()
  })

  it('should always keep the children in the DOM when keepMounted=true', async () => {
    const { getByTestId, rerender } = await renderWithNexUIProvider(
      <TestModal keepMounted open={false} />,
      {
        useAct: true,
      },
    )

    let modalRoot = getByTestId('modal-root')
    expect(modalRoot).toHaveStyle({
      display: 'none',
      opacity: '0',
    })

    await act(async () => {
      rerender(<TestModal keepMounted open={true} />)
    })

    modalRoot = getByTestId('modal-root')

    await waitFor(() => {
      expect(modalRoot).toHaveStyle({
        display: 'block',
        opacity: '1',
      })
    })
  })

  it('should onClose callback be called when modal is closed', async () => {
    const onClose = jest.fn()
    const { queryByTestId, rerender } = await renderWithNexUIProvider(
      <TestModal open onClose={onClose} />,
      {
        useAct: true,
      },
    )

    expect(queryByTestId('modal-root')).toBeInTheDocument()

    rerender(<TestModal open={false} onClose={onClose} />)

    await waitFor(() => {
      expect(queryByTestId('modal-root')).toBeNull()
      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })

  describe('PreventScroll', () => {
    it('should prevent container scrolling when container is overflowing', async () => {
      const container = document.createElement('div')
      container.style.paddingRight = '20px'
      Object.defineProperties(container, {
        scrollHeight: {
          value: 100,
        },
        clientHeight: {
          value: 90,
        },
        offsetWidth: {
          value: 100,
        },
        clientWidth: {
          value: 90,
        },
      })
      document.body.appendChild(container)
      // -------Custom container--------
      const { rerender } = await renderWithNexUIProvider(
        <TestModal preventScroll open container={container} />,
        {
          useAct: true,
        },
      )

      expect(container.style.overflow).toBe('hidden')
      expect(container.style.paddingRight).toBe(
        `${20 + getScrollBarWidth(container)}px`,
      )

      await act(async () => {
        rerender(<TestModal preventScroll open={false} container={container} />)
      })

      expect(container.style.overflow).toBe('')
      expect(container.style.paddingRight).toBe('20px')
      container.remove()
    })

    // FIXME: https://github.com/testing-library/dom-testing-library/issues/1363
    it('should prevent body scrolling when and body is overflowing', async () => {
      document.body.style.paddingRight = '20px'
      Object.defineProperty(document.documentElement, 'clientWidth', {
        value: 100,
      })
      Object.defineProperty(window, 'innerWidth', {
        value: 110,
      })
      const container = document.body
      document.body.style.paddingRight = ''
      const { rerender } = await renderWithNexUIProvider(
        <TestModal preventScroll open />,
        {
          useAct: true,
        },
      )
      expect(container.style.overflow).toBe('hidden')
      expect(container.style.paddingRight).toBe(
        `${20 + getScrollBarWidth(container)}px`,
      )

      await act(async () => {
        rerender(<TestModal preventScroll open={false} />)
      })

      expect(container.style.overflow).toBe('')
      expect(container.style.paddingRight).toBe('20px')
    })

    it('should set overflow="hidden" on the container, regardless of whether the container overflows', async () => {
      const container = document.createElement('div')
      container.style.overflowY = 'auto'
      container.style.paddingRight = '20px'
      Object.defineProperties(container, {
        scrollHeight: {
          value: 100,
        },
        clientHeight: {
          value: 100,
        },
      })
      document.body.appendChild(container)

      const { rerender } = await renderWithNexUIProvider(
        <TestModal preventScroll open container={container} />,
        {
          useAct: true,
        },
      )
      expect(container.style.overflow).toBe('hidden')
      expect(container.style.paddingRight).toBe('20px')

      await act(async () => {
        rerender(<TestModal preventScroll open={false} container={container} />)
      })

      expect(container.style.overflow).toBe('')
      expect(container.style.paddingRight).toBe('20px')
      expect(container.style.overflowY).toBe('auto')
      container.remove()
    })

    it('should restore styles after closing', async () => {
      const container = document.createElement('div')
      container.style.padding = '20px'
      container.style.overflow = 'scroll'
      Object.defineProperties(container, {
        scrollHeight: {
          value: 100,
        },
        clientHeight: {
          value: 90,
        },
      })
      document.body.appendChild(container)

      const { rerender } = await renderWithNexUIProvider(
        <TestModal preventScroll open container={container} />,
        {
          useAct: true,
        },
      )
      expect(container.style.overflow).toBe('hidden')
      expect(container.style.paddingRight).toBe(
        `${20 + getScrollBarWidth(container)}px`,
      )

      await act(async () => {
        rerender(<TestModal preventScroll open={false} container={container} />)
      })
      expect(container.style.overflow).toBe('scroll')
      expect(container.style.paddingRight).toBe('20px')

      container.style.padding = ''
      container.style.overflow = ''

      container.style.paddingRight = '30px'
      container.style.overflowY = 'auto'
      container.style.overflowX = 'scroll'

      await act(async () => {
        rerender(<TestModal preventScroll open container={container} />)
      })

      expect(container.style.overflow).toBe('hidden')
      expect(container.style.paddingRight).toBe(
        `${30 + getScrollBarWidth(container)}px`,
      )

      await act(async () => {
        rerender(<TestModal preventScroll open={false} container={container} />)
      })

      expect(container.style.overflow).toBe('')
      expect(container.style.paddingRight).toBe('30px')
      expect(container.style.overflowY).toBe('auto')
      expect(container.style.overflowX).toBe('scroll')
      container.remove()
    })
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
      const { getByTestId } = await renderWithNexUIProvider(
        <TestModal open />,
        {
          useAct: true,
        },
      )

      const content = getByTestId('modal-content')
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

    it('should not restore focus when restoreFocus=false', async () => {
      const { getByTestId, user } = await renderWithNexUIProvider(
        <ControlledModal restoreFocus={false} />,
        {
          useAct: true,
        },
      )

      const toggleButton = getByTestId('toggle-button')

      await user.click(toggleButton)
      await user.keyboard('[Escape]')
      expect(document.activeElement).not.toBe(toggleButton)
    })

    it('should set aria-hidden on root element when keepMount=true and open=false', async () => {
      const { getByTestId, rerender } = await renderWithNexUIProvider(
        <TestModal keepMounted open={false} />,
        {
          useAct: true,
        },
      )
      const root = getByTestId('modal-root')
      expect(root).toHaveAttribute('aria-hidden', 'true')

      await act(async () => {
        rerender(<TestModal keepMounted open />)
      })
      expect(root).not.toHaveAttribute('aria-hidden')
    })

    describe('Multiple Modals', () => {
      it('should set aria-hidden="true" on root element of non-topmost modals, keepMount=false', async () => {
        const { getAllByTestId, rerender } = await renderWithNexUIProvider(
          <>
            <TestModal open />
            <TestModal open />
          </>,
          {
            useAct: true,
          },
        )
        let roots = getAllByTestId('modal-root')
        expect(roots[0]).toHaveAttribute('aria-hidden', 'true')
        expect(roots[1]).not.toHaveAttribute('aria-hidden')

        await act(async () => {
          rerender(
            <>
              <TestModal open />
              <TestModal open />
              <TestModal open />
            </>,
          )
        })

        roots = getAllByTestId('modal-root')
        expect(roots[0]).toHaveAttribute('aria-hidden', 'true')
        expect(roots[1]).toHaveAttribute('aria-hidden', 'true')
        expect(roots[2]).not.toHaveAttribute('aria-hidden')

        await act(async () => {
          rerender(
            <>
              <TestModal open />
              <TestModal open={false} />
            </>,
          )
        })
        roots = getAllByTestId('modal-root')
        expect(roots[0]).not.toHaveAttribute('aria-hidden')
        expect(roots[1]).toBeUndefined()
      })

      it('should set aria-hidden="true" on root element of non-topmost modals, keepMount=true', async () => {
        const { getAllByTestId, rerender } = await renderWithNexUIProvider(
          <>
            <TestModal keepMounted open={false} />
            <TestModal keepMounted open={false} />
          </>,
          {
            useAct: true,
          },
        )
        let roots = getAllByTestId('modal-root')
        expect(roots[0]).toHaveAttribute('aria-hidden', 'true')
        expect(roots[1]).toHaveAttribute('aria-hidden', 'true')

        await act(async () => {
          rerender(
            <>
              <TestModal keepMounted open />
              <TestModal keepMounted open={false} />
            </>,
          )
        })

        roots = getAllByTestId('modal-root')
        expect(roots[0]).not.toHaveAttribute('aria-hidden')
        expect(roots[1]).toHaveAttribute('aria-hidden', 'true')

        await act(async () => {
          rerender(
            <>
              <TestModal keepMounted open />
              <TestModal keepMounted open />
            </>,
          )
        })

        roots = getAllByTestId('modal-root')
        expect(roots[0]).toHaveAttribute('aria-hidden', 'true')
        expect(roots[1]).not.toHaveAttribute('aria-hidden')

        await act(async () => {
          rerender(
            <>
              <TestModal keepMounted open={false} />
              <TestModal keepMounted open />
            </>,
          )
        })

        roots = getAllByTestId('modal-root')
        expect(roots[0]).toHaveAttribute('aria-hidden', 'true')
        expect(roots[1]).not.toHaveAttribute('aria-hidden')

        await act(async () => {
          rerender(
            <>
              <TestModal keepMounted open={false} />
              <TestModal keepMounted open={false} />
            </>,
          )
        })

        expect(roots[0]).toHaveAttribute('aria-hidden', 'true')
        expect(roots[1]).toHaveAttribute('aria-hidden', 'true')
      })
    })

    describe('Nested Modals', () => {
      const ParentModal = ({ children, ...props }: ModalProps) => {
        return (
          <Modal {...props}>
            <ModalRoot data-testid='parent-modal'>
              <ModalBackdrop />
              <ModalPanel>
                <ModalContent>
                  <ModalHeader>Test Modal</ModalHeader>
                  <ModalBody>{children}</ModalBody>
                  <ModalFooter>Test Modal Footer</ModalFooter>
                </ModalContent>
              </ModalPanel>
            </ModalRoot>
          </Modal>
        )
      }

      const ChildModal = (props: ModalProps) => {
        return (
          <Modal {...props}>
            <ModalRoot data-testid='child-modal'>
              <ModalBackdrop />
              <ModalPanel>
                <ModalContent>
                  <ModalHeader>Test Modal</ModalHeader>
                  <ModalBody>This is a test modal body.</ModalBody>
                  <ModalFooter>Test Modal Footer</ModalFooter>
                </ModalContent>
              </ModalPanel>
            </ModalRoot>
          </Modal>
        )
      }

      it('should set aria-hidden="true" on root element of non-topmost modals, keepMount=false', async () => {
        const { getByTestId, rerender, queryByTestId } =
          await renderWithNexUIProvider(
            <>
              <ParentModal open>
                <ChildModal open />
              </ParentModal>
            </>,
            {
              useAct: true,
            },
          )

        let parentModal = getByTestId('parent-modal')
        let childModal: HTMLElement | null = getByTestId('child-modal')
        expect(parentModal).toHaveAttribute('aria-hidden', 'true')
        expect(childModal).not.toHaveAttribute('aria-hidden')

        await act(async () => {
          rerender(
            <>
              <ParentModal open>
                <ChildModal open={false} />
              </ParentModal>
            </>,
          )
        })
        parentModal = getByTestId('parent-modal')
        childModal = queryByTestId('child-modal')
        expect(parentModal).not.toHaveAttribute('aria-hidden')
        expect(childModal).toBeNull()
      })

      it('should set aria-hidden="true" on root element of non-topmost modals, keepMount=true', async () => {
        const { getByTestId, rerender } = await renderWithNexUIProvider(
          <>
            <ParentModal open={false} keepMounted>
              <ChildModal open={false} keepMounted />
            </ParentModal>
          </>,
          {
            useAct: true,
          },
        )

        let parentModal = getByTestId('parent-modal')
        let childModal = getByTestId('child-modal')
        expect(parentModal).toHaveAttribute('aria-hidden', 'true')
        expect(childModal).toHaveAttribute('aria-hidden', 'true')

        await act(async () => {
          rerender(
            <>
              <ParentModal open keepMounted>
                <ChildModal open={false} keepMounted />
              </ParentModal>
            </>,
          )
        })

        parentModal = getByTestId('parent-modal')
        childModal = getByTestId('child-modal')
        expect(parentModal).not.toHaveAttribute('aria-hidden')
        expect(childModal).toHaveAttribute('aria-hidden', 'true')

        await act(async () => {
          rerender(
            <>
              <ParentModal open keepMounted>
                <ChildModal open keepMounted />
              </ParentModal>
            </>,
          )
        })

        parentModal = getByTestId('parent-modal')
        childModal = getByTestId('child-modal')
        expect(parentModal).toHaveAttribute('aria-hidden', 'true')
        expect(childModal).not.toHaveAttribute('aria-hidden')

        await act(async () => {
          rerender(
            <>
              <ParentModal open={false} keepMounted>
                <ChildModal open keepMounted />
              </ParentModal>
            </>,
          )
        })

        parentModal = getByTestId('parent-modal')
        childModal = getByTestId('child-modal')
        expect(parentModal).toHaveAttribute('aria-hidden', 'true')
        expect(childModal).not.toHaveAttribute('aria-hidden')

        await act(async () => {
          rerender(
            <>
              <ParentModal open={false} keepMounted>
                <ChildModal open={false} keepMounted />
              </ParentModal>
            </>,
          )
        })

        parentModal = getByTestId('parent-modal')
        childModal = getByTestId('child-modal')
        expect(parentModal).toHaveAttribute('aria-hidden', 'true')
        expect(childModal).toHaveAttribute('aria-hidden', 'true')
      })
    })
  })
})
