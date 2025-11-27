import {
  renderWithNexUIProvider,
  testComponentStability,
  testStateDataAttrs,
  testVariantDataAttrs,
} from '~/tests/shared'
import { useState } from 'react'
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalPanel,
  ModalPortal,
  ModalRoot,
} from '../index'
import { getScrollBarWidth } from '../ModalRoot'
import type { ModalProps } from '../index'
import type { ModalPortalProps } from '../types'

function TestModal({
  container,
  keepMounted,
  children,
  animateDisabled = true,
  'data-testid': testid = 'modal-root',
  ...props
}: ModalProps &
  ModalPortalProps & {
    className?: string
    'data-testid'?: string
  }) {
  return (
    <Modal {...props}>
      <ModalPortal
        keepMounted={keepMounted}
        container={container}
        animateDisabled={animateDisabled}
      >
        <ModalRoot data-testid={testid} className={props.className}>
          <ModalBackdrop data-testid='modal-backdrop' />
          <ModalPanel data-testid='modal-panel'>
            <ModalContent data-testid='modal-content'>
              <ModalHeader data-testid='modal-header'>Test Modal</ModalHeader>
              <ModalBody data-testid='modal-body'>{children}</ModalBody>
              <ModalFooter data-testid='modal-footer'>
                Test Modal Footer
              </ModalFooter>
            </ModalContent>
          </ModalPanel>
        </ModalRoot>
      </ModalPortal>
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
  testComponentStability(<TestModal open />)

  testStateDataAttrs(<TestModal keepMounted />)

  testVariantDataAttrs(<TestModal open />, ['closeOnEscape', [true, false]])

  testVariantDataAttrs(<TestModal open />, ['preventScroll', [true, false]])

  testVariantDataAttrs(<TestModal open />, ['keepMounted', [true, false]])

  testVariantDataAttrs(<TestModal open />, ['animateDisabled', [true, false]])

  it('should not render children by default', () => {
    const { queryByTestId } = renderWithNexUIProvider(<TestModal />)
    expect(queryByTestId('modal-root')).toBeNull()
  })

  it('should render into document.body via Portal when open', () => {
    const { container, getByTestId } = renderWithNexUIProvider(
      <TestModal open />,
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

  it('should render into document.body via Portal when defaultOpen', () => {
    const { container, getByTestId } = renderWithNexUIProvider(
      <TestModal defaultOpen />,
    )

    expect(container.firstChild).toBeNull()

    const modalRoot = getByTestId('modal-root')
    expect(modalRoot.parentElement).toBe(document.body)
  })

  it('should render into custom container when container prop is provided', () => {
    const container = document.createElement('div')
    document.body.appendChild(container)

    const { getByTestId } = renderWithNexUIProvider(
      <TestModal open container={() => container} />,
    )

    expect(container.firstChild).not.toBeNull()

    const modalRoot = getByTestId('modal-root')
    expect(modalRoot.parentElement).toBe(container)

    container.remove()
  })

  it('should be controlled by open prop', async () => {
    const { queryByTestId, getByTestId, user } = renderWithNexUIProvider(
      <ControlledModal defaultOpen={false} />,
    )

    expect(queryByTestId('modal-root')).toBeNull()

    const toggleButton = getByTestId('toggle-button')

    await user.click(toggleButton)
    const modalRoot = queryByTestId('modal-root')

    expect(modalRoot).toBeInTheDocument()

    await user.click(toggleButton)

    expect(modalRoot).not.toBeInTheDocument()
  })

  it('should close when clicking outside the modal', async () => {
    const { getByTestId, queryByTestId, rerender, user } =
      renderWithNexUIProvider(<ControlledModal defaultOpen />)

    let modalRoot = queryByTestId('modal-root')
    expect(modalRoot).toBeInTheDocument()

    await user.click(getByTestId('modal-panel'))

    expect(modalRoot).not.toBeInTheDocument()

    // test uncontrolled behavior
    rerender(<TestModal defaultOpen />)
    modalRoot = queryByTestId('modal-root')
    expect(modalRoot).toBeInTheDocument()

    await user.click(getByTestId('modal-panel'))
    expect(modalRoot).not.toBeInTheDocument()
  })

  it('should not close when clicking its panel and closeOnInteractOutside=false', async () => {
    const { getByTestId, queryByTestId, rerender, user } =
      renderWithNexUIProvider(
        <ControlledModal closeOnInteractOutside={false} defaultOpen />,
      )
    let modalRoot = queryByTestId('modal-root')
    expect(modalRoot).toBeInTheDocument()

    await user.click(getByTestId('modal-panel'))
    expect(modalRoot).toBeInTheDocument()

    // test uncontrolled behavior
    rerender(<TestModal defaultOpen closeOnInteractOutside={false} />)
    modalRoot = queryByTestId('modal-root')
    expect(modalRoot).toBeInTheDocument()

    await user.click(getByTestId('modal-panel'))
    expect(modalRoot).toBeInTheDocument()
  })

  it('should close when pressing Escape key', async () => {
    const { queryByTestId, rerender, user } = renderWithNexUIProvider(
      <ControlledModal defaultOpen />,
    )

    let modalRoot = queryByTestId('modal-root')
    expect(modalRoot).toBeInTheDocument()

    await user.keyboard('[Escape]')
    expect(modalRoot).not.toBeInTheDocument()

    // test uncontrolled behavior
    rerender(<TestModal defaultOpen />)
    modalRoot = queryByTestId('modal-root')
    expect(modalRoot).toBeInTheDocument()

    await user.keyboard('[Escape]')
    expect(modalRoot).not.toBeInTheDocument()
  })

  it('should not close when pressing Escape key if closeOnEscape=false', async () => {
    const { queryByTestId, rerender, user } = renderWithNexUIProvider(
      <ControlledModal closeOnEscape={false} defaultOpen />,
    )

    let modalRoot = queryByTestId('modal-root')
    expect(modalRoot).toBeInTheDocument()

    await user.keyboard('[Escape]')
    expect(modalRoot).toBeInTheDocument()

    // test uncontrolled behavior
    rerender(<TestModal defaultOpen closeOnEscape={false} />)
    modalRoot = queryByTestId('modal-root')
    expect(modalRoot).toBeInTheDocument()

    await user.keyboard('[Escape]')
    expect(modalRoot).toBeInTheDocument()
  })

  it('should always keep the children in the DOM when keepMounted=true', () => {
    const { getByTestId } = renderWithNexUIProvider(
      <TestModal keepMounted open={false} />,
    )

    const modalRoot = getByTestId('modal-root')
    expect(modalRoot).toBeInTheDocument()
  })

  it('should have correct style on root element when keepMounted=true', () => {
    const { getByTestId, rerender } = renderWithNexUIProvider(
      <TestModal keepMounted open={false} />,
    )

    const modalRoot = getByTestId('modal-root')
    expect(modalRoot).toHaveStyle('display: none')

    rerender(<TestModal keepMounted open />)

    expect(modalRoot).toHaveStyle('display: block')
  })

  it('should onClose callback be called when modal is closed', () => {
    const onClose = jest.fn()
    const { queryByTestId, rerender } = renderWithNexUIProvider(
      <TestModal open onClose={onClose} />,
    )

    const modalRoot = queryByTestId('modal-root')
    expect(modalRoot).toBeInTheDocument()

    rerender(<TestModal open={false} onClose={onClose} />)

    expect(modalRoot).not.toBeInTheDocument()
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  describe('PreventScroll', () => {
    it('should prevent container scrolling when container is overflowing', () => {
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
      const { rerender } = renderWithNexUIProvider(
        <TestModal preventScroll open container={container} />,
      )

      expect(container.style.overflow).toBe('hidden')
      expect(container.style.paddingRight).toBe(
        `${20 + getScrollBarWidth(container)}px`,
      )

      rerender(<TestModal preventScroll open={false} container={container} />)

      expect(container.style.overflow).toBe('')
      expect(container.style.paddingRight).toBe('20px')
      container.remove()
    })

    // FIXME: https://github.com/testing-library/dom-testing-library/issues/1363
    it('should prevent body scrolling when and body is overflowing', () => {
      document.body.style.paddingRight = '20px'
      Object.defineProperty(document.documentElement, 'clientWidth', {
        value: 100,
      })
      Object.defineProperty(window, 'innerWidth', {
        value: 110,
      })
      const container = document.body
      document.body.style.paddingRight = ''
      const { rerender } = renderWithNexUIProvider(
        <TestModal preventScroll open />,
      )
      expect(container.style.overflow).toBe('hidden')
      expect(container.style.paddingRight).toBe(
        `${20 + getScrollBarWidth(container)}px`,
      )

      rerender(<TestModal preventScroll open={false} />)

      expect(container.style.overflow).toBe('')
      expect(container.style.paddingRight).toBe('20px')
    })

    it('should set overflow="hidden" on the container, regardless of whether the container overflows', () => {
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

      const { rerender } = renderWithNexUIProvider(
        <TestModal preventScroll open container={container} />,
      )
      expect(container.style.overflow).toBe('hidden')
      expect(container.style.paddingRight).toBe('20px')

      rerender(<TestModal preventScroll open={false} container={container} />)

      expect(container.style.overflow).toBe('')
      expect(container.style.paddingRight).toBe('20px')
      expect(container.style.overflowY).toBe('auto')
      container.remove()
    })

    it('should restore styles after closing', () => {
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

      const { rerender } = renderWithNexUIProvider(
        <TestModal preventScroll open container={container} />,
      )
      expect(container.style.overflow).toBe('hidden')
      expect(container.style.paddingRight).toBe(
        `${20 + getScrollBarWidth(container)}px`,
      )

      rerender(<TestModal preventScroll open={false} container={container} />)

      expect(container.style.overflow).toBe('scroll')
      expect(container.style.paddingRight).toBe('20px')

      container.style.padding = ''
      container.style.overflow = ''

      container.style.paddingRight = '30px'
      container.style.overflowY = 'auto'
      container.style.overflowX = 'scroll'

      rerender(<TestModal preventScroll open container={container} />)

      expect(container.style.overflow).toBe('hidden')
      expect(container.style.paddingRight).toBe(
        `${30 + getScrollBarWidth(container)}px`,
      )

      rerender(<TestModal preventScroll open={false} container={container} />)

      expect(container.style.overflow).toBe('')
      expect(container.style.paddingRight).toBe('30px')
      expect(container.style.overflowY).toBe('auto')
      expect(container.style.overflowX).toBe('scroll')
      container.remove()
    })
  })

  describe('Accessibility', () => {
    it('should have role="dialog" on the ModalContent element', () => {
      const { getByTestId } = renderWithNexUIProvider(<TestModal open />)
      const content = getByTestId('modal-content')
      expect(content).toHaveAttribute('role', 'dialog')
    })

    it('should have aria-modal="true" on the ModalContent element', () => {
      const { getByTestId } = renderWithNexUIProvider(<TestModal open />)
      const content = getByTestId('modal-content')
      expect(content).toHaveAttribute('aria-modal', 'true')
    })

    it('should have aria-labelledby and aria-describedby attributes on the ModalContent element', () => {
      const { getByTestId } = renderWithNexUIProvider(<TestModal open />)
      const content = getByTestId('modal-content')
      const header = getByTestId('modal-header')
      const body = getByTestId('modal-body')

      expect(content).toHaveAttribute('aria-labelledby', header.id)
      expect(content).toHaveAttribute('aria-describedby', body.id)
    })

    it('should have tabIndex=-1 on the ModalContent element', () => {
      const { getByTestId } = renderWithNexUIProvider(<TestModal open />)
      const content = getByTestId('modal-content')
      expect(content).toHaveAttribute('tabIndex', '-1')
    })

    it('should have aria-hidden=true on the ModalBackdrop element', () => {
      const { getByTestId } = renderWithNexUIProvider(<TestModal open />)
      const backdrop = getByTestId('modal-backdrop')
      expect(backdrop).toHaveAttribute('aria-hidden', 'true')
    })

    it('should automatically focus the ModalContent when opened', () => {
      const { getByTestId } = renderWithNexUIProvider(<TestModal open />)

      const content = getByTestId('modal-content')
      expect(document.activeElement).toBe(content)
    })

    it('should restore focus to previously focused element when closed with restoreFocus=true', async () => {
      const { getByTestId, user } = renderWithNexUIProvider(
        <ControlledModal restoreFocus />,
      )

      const toggleButton = getByTestId('toggle-button')

      await user.click(toggleButton)
      await user.keyboard('[Escape]')
      expect(document.activeElement).toBe(toggleButton)
    })

    it('should not restore focus when restoreFocus=false', async () => {
      const { getByTestId, user } = renderWithNexUIProvider(
        <ControlledModal restoreFocus={false} />,
      )

      const toggleButton = getByTestId('toggle-button')

      await user.click(toggleButton)
      await user.keyboard('[Escape]')
      expect(document.activeElement).not.toBe(toggleButton)
    })

    it('should set aria-hidden on root element when keepMounted=true and open=false', () => {
      const { getByTestId, rerender } = renderWithNexUIProvider(
        <TestModal keepMounted open={false} />,
      )
      const root = getByTestId('modal-root')
      expect(root).toHaveAttribute('aria-hidden', 'true')

      rerender(<TestModal keepMounted open />)

      expect(root).not.toHaveAttribute('aria-hidden')
    })

    describe('Multiple Modals', () => {
      it('should set aria-hidden="true" on root element of non-topmost modals, keepMounted=false', () => {
        const { getAllByTestId, rerender } = renderWithNexUIProvider(
          <>
            <TestModal open />
            <TestModal open />
          </>,
        )
        let roots = getAllByTestId('modal-root')
        expect(roots[0]).toHaveAttribute('aria-hidden', 'true')
        expect(roots[1]).not.toHaveAttribute('aria-hidden')

        rerender(
          <>
            <TestModal open />
            <TestModal open />
            <TestModal open />
          </>,
        )

        roots = getAllByTestId('modal-root')
        expect(roots[0]).toHaveAttribute('aria-hidden', 'true')
        expect(roots[1]).toHaveAttribute('aria-hidden', 'true')
        expect(roots[2]).not.toHaveAttribute('aria-hidden')

        rerender(
          <>
            <TestModal open />
            <TestModal open={false} />
          </>,
        )
        roots = getAllByTestId('modal-root')
        expect(roots[0]).not.toHaveAttribute('aria-hidden')
        expect(roots[1]).toBeUndefined()
      })

      it('should set aria-hidden="true" on root element of non-topmost modals, keepMounted=true', () => {
        const { getAllByTestId, rerender } = renderWithNexUIProvider(
          <>
            <TestModal keepMounted open={false} />
            <TestModal keepMounted open={false} />
          </>,
        )
        let roots = getAllByTestId('modal-root')
        expect(roots[0]).toHaveAttribute('aria-hidden', 'true')
        expect(roots[1]).toHaveAttribute('aria-hidden', 'true')

        rerender(
          <>
            <TestModal keepMounted open />
            <TestModal keepMounted open={false} />
          </>,
        )

        roots = getAllByTestId('modal-root')
        expect(roots[0]).not.toHaveAttribute('aria-hidden')
        expect(roots[1]).toHaveAttribute('aria-hidden', 'true')

        rerender(
          <>
            <TestModal keepMounted open />
            <TestModal keepMounted open />
          </>,
        )

        roots = getAllByTestId('modal-root')
        expect(roots[0]).toHaveAttribute('aria-hidden', 'true')
        expect(roots[1]).not.toHaveAttribute('aria-hidden')

        rerender(
          <>
            <TestModal keepMounted open={false} />
            <TestModal keepMounted open />
          </>,
        )

        roots = getAllByTestId('modal-root')
        expect(roots[0]).toHaveAttribute('aria-hidden', 'true')
        expect(roots[1]).not.toHaveAttribute('aria-hidden')

        rerender(
          <>
            <TestModal keepMounted open={false} />
            <TestModal keepMounted open={false} />
          </>,
        )

        expect(roots[0]).toHaveAttribute('aria-hidden', 'true')
        expect(roots[1]).toHaveAttribute('aria-hidden', 'true')
      })
    })

    describe('Nested Modals', () => {
      it('should set aria-hidden="true" on root element of non-topmost modals, keepMounted=false', () => {
        const { getByTestId, rerender, queryByTestId } =
          renderWithNexUIProvider(
            <>
              <TestModal data-testid='parent-modal' open>
                <TestModal data-testid='child-modal' open />
              </TestModal>
            </>,
          )

        let parentModal = getByTestId('parent-modal')
        let childModal: HTMLElement | null = getByTestId('child-modal')
        expect(parentModal).toHaveAttribute('aria-hidden', 'true')
        expect(childModal).not.toHaveAttribute('aria-hidden')

        rerender(
          <>
            <TestModal data-testid='parent-modal' open>
              <TestModal data-testid='child-modal' open={false} />
            </TestModal>
          </>,
        )
        parentModal = getByTestId('parent-modal')
        childModal = queryByTestId('child-modal')
        expect(parentModal).not.toHaveAttribute('aria-hidden')
        expect(childModal).toBeNull()
      })

      it('should set aria-hidden="true" on root element of non-topmost modals, keepMounted=true', () => {
        const { getByTestId, rerender } = renderWithNexUIProvider(
          <>
            <TestModal data-testid='parent-modal' open={false} keepMounted>
              <TestModal data-testid='child-modal' open={false} keepMounted />
            </TestModal>
          </>,
        )

        let parentModal = getByTestId('parent-modal')
        let childModal = getByTestId('child-modal')
        expect(parentModal).toHaveAttribute('aria-hidden', 'true')
        expect(childModal).toHaveAttribute('aria-hidden', 'true')

        rerender(
          <>
            <TestModal data-testid='parent-modal' open keepMounted>
              <TestModal data-testid='child-modal' open={false} keepMounted />
            </TestModal>
          </>,
        )

        parentModal = getByTestId('parent-modal')
        childModal = getByTestId('child-modal')
        expect(parentModal).not.toHaveAttribute('aria-hidden')
        expect(childModal).toHaveAttribute('aria-hidden', 'true')

        rerender(
          <>
            <TestModal data-testid='parent-modal' open keepMounted>
              <TestModal data-testid='child-modal' open keepMounted />
            </TestModal>
          </>,
        )
        parentModal = getByTestId('parent-modal')
        childModal = getByTestId('child-modal')
        expect(parentModal).toHaveAttribute('aria-hidden', 'true')
        expect(childModal).not.toHaveAttribute('aria-hidden')

        rerender(
          <>
            <TestModal data-testid='parent-modal' open={false} keepMounted>
              <TestModal data-testid='child-modal' open keepMounted />
            </TestModal>
          </>,
        )

        parentModal = getByTestId('parent-modal')
        childModal = getByTestId('child-modal')
        expect(parentModal).toHaveAttribute('aria-hidden', 'true')
        expect(childModal).not.toHaveAttribute('aria-hidden')

        rerender(
          <>
            <TestModal data-testid='parent-modal' open={false} keepMounted>
              <TestModal data-testid='child-modal' open={false} keepMounted />
            </TestModal>
          </>,
        )

        parentModal = getByTestId('parent-modal')
        childModal = getByTestId('child-modal')
        expect(parentModal).toHaveAttribute('aria-hidden', 'true')
        expect(childModal).toHaveAttribute('aria-hidden', 'true')
      })
    })
  })
})
