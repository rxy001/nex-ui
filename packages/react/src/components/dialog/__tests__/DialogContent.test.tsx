import { createRef } from 'react'
import { renderWithNexUIProvider } from '~/tests/shared'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogBody,
} from '../index'
import { dialogContentClasses, dialogContentDataAttrs } from './constants'
import type { DialogContentProps } from '../index'

function TestDialog(props: DialogContentProps) {
  return (
    <Dialog data-testid='dialog-root' defaultOpen>
      <DialogContent data-testid='dialog-content' {...props}>
        <DialogHeader data-testid='dialog-header'>Dialog Header</DialogHeader>
        <DialogBody data-testid='dialog-body'>Dialog Body</DialogBody>
        <DialogFooter data-testid='dialog-footer'>Dialog Footer</DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

describe('DialogContent', () => {
  it('should render with default props', async () => {
    const { getByTestId } = await renderWithNexUIProvider(<TestDialog />, {
      useAct: true,
    })

    const dialogContentRoot = getByTestId('dialog-content')

    expect(dialogContentRoot).toHaveAttribute(
      ...dialogContentDataAttrs['size-md'],
    )
    expect(dialogContentRoot).toHaveAttribute(
      ...dialogContentDataAttrs['placement-top'],
    )
    expect(dialogContentRoot).toHaveAttribute(
      ...dialogContentDataAttrs['fullScreen-false'],
    )
    expect(dialogContentRoot).toHaveAttribute(
      ...dialogContentDataAttrs['scroll-outside'],
    )
    expect(dialogContentRoot).toHaveAttribute(
      ...dialogContentDataAttrs['hideCloseButton-false'],
    )
  })

  it("should forward ref to DialogContent's root element", async () => {
    const ref = createRef<HTMLDivElement>()
    const { getByTestId } = await renderWithNexUIProvider(
      <TestDialog ref={ref} />,
      {
        useAct: true,
      },
    )

    const dialogContentRoot = getByTestId('dialog-content')
    expect(dialogContentRoot).toBe(ref.current)
  })

  it(`should add the appropriate data-size-* to DialogContent's root element based on size prop`, async () => {
    const { getByTestId, rerender } = await renderWithNexUIProvider(
      <TestDialog size='sm' />,
      {
        useAct: true,
      },
    )

    const dialogContentRoot = getByTestId('dialog-content')

    expect(dialogContentRoot).toHaveAttribute(
      ...dialogContentDataAttrs['size-sm'],
    )

    rerender(<TestDialog size='xs' />)
    expect(dialogContentRoot).toHaveAttribute(
      ...dialogContentDataAttrs['size-xs'],
    )

    rerender(<TestDialog size='md' />)
    expect(dialogContentRoot).toHaveAttribute(
      ...dialogContentDataAttrs['size-md'],
    )

    rerender(<TestDialog size='lg' />)
    expect(dialogContentRoot).toHaveAttribute(
      ...dialogContentDataAttrs['size-lg'],
    )
    rerender(<TestDialog size='xl' />)
    expect(dialogContentRoot).toHaveAttribute(
      ...dialogContentDataAttrs['size-xl'],
    )

    rerender(<TestDialog size='full' />)
    expect(dialogContentRoot).toHaveAttribute(
      ...dialogContentDataAttrs['size-full'],
    )
  })

  it(`should add the appropriate data-full-screen-* to DialogContent's root element based on fullScreen prop`, async () => {
    const { getByTestId, rerender } = await renderWithNexUIProvider(
      <TestDialog />,
      {
        useAct: true,
      },
    )

    const dialogContentRoot = getByTestId('dialog-content')

    expect(dialogContentRoot).toHaveAttribute(
      ...dialogContentDataAttrs['fullScreen-false'],
    )

    rerender(<TestDialog fullScreen />)
    expect(dialogContentRoot).toHaveAttribute(
      ...dialogContentDataAttrs['fullScreen-true'],
    )
  })

  it('should forward classNames to paper and closeButton slots', async () => {
    const classNames = {
      paper: 'test-dialog-content-paper',
      closeButton: 'test-dialog-content-close-button',
    }
    const { getByTestId } = await renderWithNexUIProvider(
      <TestDialog classNames={classNames} />,
      {
        useAct: true,
      },
    )

    const dialogContentRoot = getByTestId('dialog-content')
    expect(
      dialogContentRoot.querySelector(`.${dialogContentClasses.paper}`),
    ).toHaveClass(classNames.paper)
    expect(
      dialogContentRoot.querySelector(
        `.${dialogContentClasses['close-button']}`,
      ),
    ).toHaveClass(classNames.closeButton)
  })

  it('should forward slotProps to backdrop slots', async () => {
    const slotProps = {
      paper: { className: 'test-dialog-content-paper' },
      closeButton: { className: 'test-dialog-content-close-button' },
    }
    const { getByTestId } = await renderWithNexUIProvider(
      <TestDialog slotProps={slotProps} />,
      {
        useAct: true,
      },
    )

    const dialogContentRoot = getByTestId('dialog-content')
    expect(
      dialogContentRoot.querySelector(`.${dialogContentClasses.paper}`),
    ).toHaveClass(slotProps.paper.className)
    expect(
      dialogContentRoot.querySelector(
        `.${dialogContentClasses['close-button']}`,
      ),
    ).toHaveClass(slotProps.closeButton.className)
  })

  it('should forward motionProps to paper slot', async () => {
    const { getByTestId, rerender } = await renderWithNexUIProvider(
      <TestDialog
        motionProps={{
          className: 'test-dialog-content-paper-1',
        }}
      />,
      {
        useAct: true,
      },
    )

    const dialogContentRoot = getByTestId('dialog-content')

    const paper = dialogContentRoot.querySelector(
      `.${dialogContentClasses.paper}`,
    )

    expect(paper).toHaveClass('test-dialog-content-paper-1')

    rerender(
      <TestDialog
        motionProps={() => ({
          className: 'test-dialog-content-paper-2',
        })}
      />,
    )

    expect(paper).toHaveClass('test-dialog-content-paper-2')
  })

  it('should not render close button when hideCloseButton=true', async () => {
    const { queryByRole } = await renderWithNexUIProvider(
      <TestDialog hideCloseButton />,
      {
        useAct: true,
      },
    )

    expect(queryByRole('button')).not.toBeInTheDocument()
  })

  it('should render custom close icon when closeIcon is provided', async () => {
    const closeIcon = <span data-testid='custom-close-icon'>X</span>
    const { queryByTestId } = await renderWithNexUIProvider(
      <TestDialog closeIcon={closeIcon} />,
      {
        useAct: true,
      },
    )

    const customCloseIcon = queryByTestId('custom-close-icon')
    expect(customCloseIcon).toBeInTheDocument()
  })

  it('should close when the close button is clicked', async () => {
    const { queryByTestId, user } = await renderWithNexUIProvider(
      <TestDialog />,
      {
        useAct: true,
      },
    )

    const dialogContentRoot = queryByTestId('dialog-content')
    expect(dialogContentRoot).toBeInTheDocument()
    const closeButton = dialogContentRoot?.querySelector(
      `.${dialogContentClasses['close-button']}`,
    )

    await user.click(closeButton!)
    expect(queryByTestId('dialog-content')).not.toBeInTheDocument()
  })

  it(`should add the appropriate data-scroll-* to root element based on scroll prop`, async () => {
    const { getByTestId, rerender } = await renderWithNexUIProvider(
      <TestDialog scroll='inside' />,
      {
        useAct: true,
      },
    )

    const dialogContent = getByTestId('dialog-content')

    expect(dialogContent).toHaveAttribute(
      ...dialogContentDataAttrs['scroll-inside'],
    )

    rerender(<TestDialog scroll='outside' />)

    expect(dialogContent).toHaveAttribute(
      ...dialogContentDataAttrs['scroll-outside'],
    )
  })

  it(`should add the appropriate data-placement-* to root element based on placement prop`, async () => {
    const { getByTestId, rerender } = await renderWithNexUIProvider(
      <TestDialog placement='top' />,
      {
        useAct: true,
      },
    )

    const dialogContent = getByTestId('dialog-content')

    expect(dialogContent).toHaveAttribute(
      ...dialogContentDataAttrs['placement-top'],
    )

    rerender(<TestDialog placement='bottom' />)
    expect(dialogContent).toHaveAttribute(
      ...dialogContentDataAttrs['placement-bottom'],
    )

    rerender(<TestDialog placement='center' />)
    expect(dialogContent).toHaveAttribute(
      ...dialogContentDataAttrs['placement-center'],
    )
  })

  describe('Accessibility', () => {
    it('should have role="dialog" on the DialogContent element', async () => {
      const { getByTestId } = await renderWithNexUIProvider(<TestDialog />, {
        useAct: true,
      })

      const contentRoot = getByTestId('dialog-content')
      const paper = contentRoot.querySelector(`.${dialogContentClasses.paper}`)
      expect(paper).toHaveAttribute('role', 'dialog')
    })

    it('should have aria-modal="true" on the DialogContent element', async () => {
      const { getByTestId } = await renderWithNexUIProvider(<TestDialog />, {
        useAct: true,
      })

      const contentRoot = getByTestId('dialog-content')
      const paper = contentRoot.querySelector(`.${dialogContentClasses.paper}`)
      expect(paper).toHaveAttribute('aria-modal', 'true')
    })

    it('should have aria-labelledby and aria-describedby attributes on the ModalContent element when provided', async () => {
      const { getByTestId } = await renderWithNexUIProvider(
        <TestDialog
          aria-labelledby='custom-label'
          aria-describedby='custom-description'
        />,
        {
          useAct: true,
        },
      )
      const content = getByTestId('dialog-content')
      const paper = content.querySelector(`.${dialogContentClasses.paper}`)

      expect(paper).toHaveAttribute('aria-labelledby', 'custom-label')
      expect(paper).toHaveAttribute('aria-describedby', 'custom-description')
    })
  })
})
