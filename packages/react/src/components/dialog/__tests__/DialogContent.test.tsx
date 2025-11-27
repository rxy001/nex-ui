import {
  renderWithNexUIProvider,
  testClassNamesForwarding,
  testRefForwarding,
  testSlotPropsForwarding,
  testVariantDataAttrs,
} from '~/tests/shared'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogBody,
} from '../index'
import { dialogContentClasses } from './classes'
import type { DialogContentProps } from '../index'

function TestDialog({
  animateDisabled,
  ...props
}: DialogContentProps & { animateDisabled?: boolean }) {
  return (
    <Dialog
      defaultOpen
      data-testid='dialog-root'
      animateDisabled={animateDisabled}
    >
      <DialogContent data-testid='dialog-content' {...props}>
        <DialogHeader data-testid='dialog-header'>Dialog Header</DialogHeader>
        <DialogBody data-testid='dialog-body'>Dialog Body</DialogBody>
        <DialogFooter data-testid='dialog-footer'>Dialog Footer</DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const slots = ['paper', 'closeButton'] as const

describe('DialogContent', () => {
  testRefForwarding(<TestDialog />, {
    useAct: true,
  })

  testVariantDataAttrs(
    <TestDialog />,
    ['size', ['xs', 'sm', 'md', 'lg', 'xl', 'full']],
    {
      useAct: true,
    },
  )

  testVariantDataAttrs(<TestDialog />, ['fullScreen', [true, false]], {
    useAct: true,
  })

  testVariantDataAttrs(<TestDialog />, ['scroll', ['inside', 'outside']], {
    useAct: true,
  })

  testVariantDataAttrs(
    <TestDialog />,
    ['placement', ['top', 'center', 'bottom']],
    {
      useAct: true,
    },
  )

  testClassNamesForwarding(
    <TestDialog />,
    slots,
    {
      paper: 'test-paper',
      closeButton: 'test-close-button',
    },
    dialogContentClasses,
    {
      useAct: true,
    },
  )

  testSlotPropsForwarding(
    <TestDialog />,
    slots,
    {
      paper: { className: 'test-paper' },
      closeButton: { className: 'test-close-button' },
    },
    dialogContentClasses,
    {
      useAct: true,
    },
  )

  it('should render with default props', async () => {
    const { getByTestId } = await renderWithNexUIProvider(<TestDialog />, {
      useAct: true,
    })

    const dialogContentRoot = getByTestId('dialog-content')

    expect(dialogContentRoot).toHaveAttribute('data-size', 'md')
    expect(dialogContentRoot).toHaveAttribute('data-placement', 'top')
    expect(dialogContentRoot).toHaveAttribute('data-full-screen', 'false')
    expect(dialogContentRoot).toHaveAttribute('data-scroll', 'outside')
    expect(dialogContentRoot).toHaveAttribute('data-hide-close-button', 'false')
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
      `.${dialogContentClasses.closeButton}`,
    )

    await user.click(closeButton!)
    expect(queryByTestId('dialog-content')).not.toBeInTheDocument()
  })

  it('should ignore motionProps when animateDisabled=true', async () => {
    const { queryByClassName } = await renderWithNexUIProvider(
      <TestDialog
        animateDisabled
        motionProps={{
          className: 'test-motion',
        }}
      />,
      {
        useAct: true,
      },
    )

    const paper = queryByClassName(dialogContentClasses.paper)
    expect(paper).not.toHaveClass('test-motion')
  })

  describe('Accessibility', () => {
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
