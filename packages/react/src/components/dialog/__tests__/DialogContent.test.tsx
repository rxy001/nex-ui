import { createRef } from 'react'
import { renderWithNexUIProvider } from '~/tests/shared'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogBody,
} from '../index'
import { dialogContentClasses } from '../classes'
import type { DialogContentProps } from '../index'

describe('DialogContent', () => {
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

  it('should render with default props', async () => {
    const { getByTestId } = await renderWithNexUIProvider(<TestDialog />, {
      useAct: true,
    })

    const dialogContent = getByTestId('dialog-content')
    expect(dialogContent).toHaveClass(dialogContentClasses.root)
    expect(dialogContent).toHaveClass(dialogContentClasses['size-md'])
    expect(dialogContent).toHaveClass(dialogContentClasses['placement-top'])
    expect(dialogContent).not.toHaveClass(dialogContentClasses['full-screen'])
    expect(dialogContent).not.toHaveClass(
      dialogContentClasses['placement-bottom'],
    )
    expect(dialogContent).not.toHaveClass(
      dialogContentClasses['placement-center'],
    )
    expect(dialogContent).not.toHaveClass(dialogContentClasses['size-xs'])
    expect(dialogContent).not.toHaveClass(dialogContentClasses['size-sm'])
    expect(dialogContent).not.toHaveClass(dialogContentClasses['size-lg'])
    expect(dialogContent).not.toHaveClass(dialogContentClasses['size-xl'])
    expect(dialogContent).not.toHaveClass(dialogContentClasses['size-full'])
    expect(dialogContent).not.toHaveClass(dialogContentClasses['scroll-inside'])
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

  it(`should add the appropriate size class to DialogContent's root element based on size prop`, async () => {
    const { getByTestId, rerender } = await renderWithNexUIProvider(
      <TestDialog size='sm' />,
      {
        useAct: true,
      },
    )

    expect(getByTestId('dialog-content')).toHaveClass(
      dialogContentClasses['size-sm'],
    )

    rerender(<TestDialog size='xs' />)
    expect(getByTestId('dialog-content')).toHaveClass(
      dialogContentClasses['size-xs'],
    )

    rerender(<TestDialog size='md' />)
    expect(getByTestId('dialog-content')).toHaveClass(
      dialogContentClasses['size-md'],
    )

    rerender(<TestDialog size='lg' />)
    expect(getByTestId('dialog-content')).toHaveClass(
      dialogContentClasses['size-lg'],
    )

    rerender(<TestDialog size='xl' />)
    expect(getByTestId('dialog-content')).toHaveClass(
      dialogContentClasses['size-xl'],
    )

    rerender(<TestDialog size='full' />)
    expect(getByTestId('dialog-content')).toHaveClass(
      dialogContentClasses['size-full'],
    )
  })

  it(`should add the appropriate fullScreen class to DialogContent's root element based on fullScreen prop`, async () => {
    const { getByTestId, rerender } = await renderWithNexUIProvider(
      <TestDialog />,
      {
        useAct: true,
      },
    )

    expect(getByTestId('dialog-content')).not.toHaveClass(
      dialogContentClasses['full-screen'],
    )

    rerender(<TestDialog fullScreen />)
    expect(getByTestId('dialog-content')).toHaveClass(
      dialogContentClasses['full-screen'],
    )
  })

  it('should forward classes to root, paper and closeButton slots', async () => {
    const classes = {
      root: 'test-dialog-content-root',
      paper: 'test-dialog-content-paper',
      closeButton: 'test-dialog-content-close-button',
    }
    const { getByTestId } = await renderWithNexUIProvider(
      <TestDialog classes={classes} />,
      {
        useAct: true,
      },
    )

    const dialogContent = getByTestId('dialog-content')
    expect(dialogContent).toHaveClass(classes.root)
    expect(
      dialogContent.querySelector(`.${dialogContentClasses.paper}`),
    ).toHaveClass(classes.paper)
    expect(
      dialogContent.querySelector(`.${dialogContentClasses['close-button']}`),
    ).toHaveClass(classes.closeButton)
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

  it(`should add the appropriate scroll class to root element based on scroll prop`, async () => {
    const { getByTestId, rerender } = await renderWithNexUIProvider(
      <TestDialog scroll='inside' />,
      {
        useAct: true,
      },
    )

    expect(getByTestId('dialog-content')).toHaveClass(
      dialogContentClasses['scroll-inside'],
    )

    rerender(<TestDialog scroll='outside' />)
    expect(getByTestId('dialog-content')).toHaveClass(
      dialogContentClasses['scroll-outside'],
    )
  })

  it(`should add the appropriate placement class to root element based on placement prop`, async () => {
    const { getByTestId, rerender } = await renderWithNexUIProvider(
      <TestDialog placement='top' />,
      {
        useAct: true,
      },
    )

    expect(getByTestId('dialog-content')).toHaveClass(
      dialogContentClasses['placement-top'],
    )

    rerender(<TestDialog placement='bottom' />)
    expect(getByTestId('dialog-content')).toHaveClass(
      dialogContentClasses['placement-bottom'],
    )

    rerender(<TestDialog placement='center' />)
    expect(getByTestId('dialog-content')).toHaveClass(
      dialogContentClasses['placement-center'],
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
      const header = getByTestId('dialog-header')
      const body = getByTestId('dialog-body')

      expect(paper).toHaveAttribute('aria-labelledby', 'custom-label')
      expect(paper).toHaveAttribute('aria-describedby', 'custom-description')

      expect(header).toHaveAttribute('id', 'custom-label')
      expect(body).toHaveAttribute('id', 'custom-description')
    })
  })
})
