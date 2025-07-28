import { createRef, useState } from 'react'
import { renderWithNexUIProvider, testComponentStability } from '~/tests/shared'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogBody,
  DialogTrigger,
  DialogClose,
} from '../index'
import {
  dialogBodyClasses,
  dialogClasses,
  dialogContentClasses,
  dialogFooterClasses,
  dialogHeaderClasses,
} from '../classes'
import type { DialogProps } from '../index'

describe('Dialog', () => {
  function TestDialog(props: DialogProps) {
    return (
      <Dialog data-testid='dialog-root' {...props}>
        <DialogContent data-testid='dialog-content'>
          <DialogHeader data-testid='dialog-header'>Dialog Header</DialogHeader>
          <DialogBody data-testid='dialog-body'>Dialog Body</DialogBody>
          <DialogFooter data-testid='dialog-footer'>Dialog Footer</DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  const ControlledDialog = ({ defaultOpen = false, ...props }: DialogProps) => {
    const [open, setOpen] = useState(defaultOpen)

    return (
      <>
        <TestDialog open={open} onOpenChange={setOpen} {...props} />
        <button
          data-testid='toggle-button'
          onClick={() => setOpen((prev) => !prev)}
        >
          Toggle Dialog
        </button>
      </>
    )
  }

  testComponentStability(<TestDialog open />)

  it('should render with root, placement, scroll, and open classes but no others', async () => {
    const { getByTestId } = await renderWithNexUIProvider(<TestDialog open />, {
      useAct: true,
    })
    const dialogRoot = getByTestId('dialog-root')

    expect(dialogRoot).toHaveClass(dialogClasses.root)
    expect(dialogRoot).toHaveClass(dialogClasses['placement-top'])
    expect(dialogRoot).toHaveClass(dialogClasses['scroll-outside'])
    expect(dialogRoot).toHaveClass(dialogClasses.open)
  })

  it("should forward ref to Dialog's root element", async () => {
    const ref = createRef<HTMLDivElement>()
    const { getByTestId } = await renderWithNexUIProvider(
      <TestDialog open ref={ref} />,
      {
        useAct: true,
      },
    )

    const dialogRoot = getByTestId('dialog-root')
    expect(dialogRoot).toBe(ref.current)
  })

  it(`should add the appropriate placement class to root element based on placement prop`, async () => {
    const { getByTestId, rerender } = await renderWithNexUIProvider(
      <TestDialog open placement='top' />,
      {
        useAct: true,
      },
    )

    expect(getByTestId('dialog-root')).toHaveClass(
      dialogClasses['placement-top'],
    )

    rerender(<TestDialog open placement='bottom' />)
    expect(getByTestId('dialog-root')).toHaveClass(
      dialogClasses['placement-bottom'],
    )

    rerender(<TestDialog open placement='center' />)
    expect(getByTestId('dialog-root')).toHaveClass(
      dialogClasses['placement-center'],
    )
  })

  it(`should add the appropriate scroll class to root element based on scroll prop`, async () => {
    const { getByTestId, rerender } = await renderWithNexUIProvider(
      <TestDialog open scroll='inside' />,
      {
        useAct: true,
      },
    )

    expect(getByTestId('dialog-root')).toHaveClass(
      dialogClasses['scroll-inside'],
    )

    rerender(<TestDialog open scroll='outside' />)
    expect(getByTestId('dialog-root')).toHaveClass(
      dialogClasses['scroll-outside'],
    )
  })

  it(`should add the appropriate maxWidth class to root element based on maxWidth prop`, async () => {
    const { getByTestId, rerender } = await renderWithNexUIProvider(
      <TestDialog open maxWidth='sm' />,
      {
        useAct: true,
      },
    )

    expect(getByTestId('dialog-root')).toHaveClass(
      dialogClasses['max-width-sm'],
    )

    rerender(<TestDialog open maxWidth='xs' />)
    expect(getByTestId('dialog-root')).toHaveClass(
      dialogClasses['max-width-xs'],
    )

    rerender(<TestDialog open maxWidth='md' />)
    expect(getByTestId('dialog-root')).toHaveClass(
      dialogClasses['max-width-md'],
    )

    rerender(<TestDialog open maxWidth='lg' />)
    expect(getByTestId('dialog-root')).toHaveClass(
      dialogClasses['max-width-lg'],
    )

    rerender(<TestDialog open maxWidth='xl' />)
    expect(getByTestId('dialog-root')).toHaveClass(
      dialogClasses['max-width-xl'],
    )

    rerender(<TestDialog open maxWidth='full' />)
    expect(getByTestId('dialog-root')).toHaveClass(
      dialogClasses['max-width-full'],
    )
  })

  it(`should add the appropriate fullScreen class to root element based on fullScreen prop`, async () => {
    const { getByTestId, rerender } = await renderWithNexUIProvider(
      <TestDialog open />,
      {
        useAct: true,
      },
    )

    expect(getByTestId('dialog-root')).not.toHaveClass(
      dialogClasses['full-screen'],
    )

    rerender(<TestDialog open fullScreen />)
    expect(getByTestId('dialog-root')).toHaveClass(dialogClasses['full-screen'])
  })

  it('should not render children by default', async () => {
    const { queryByText } = await renderWithNexUIProvider(<TestDialog />, {
      useAct: true,
    })

    expect(queryByText('Dialog Header')).not.toBeInTheDocument()
    expect(queryByText('Dialog Body')).not.toBeInTheDocument()
    expect(queryByText('Dialog Footer')).not.toBeInTheDocument()
  })

  it('should render children when opened', async () => {
    const { queryByText } = await renderWithNexUIProvider(<TestDialog open />, {
      useAct: true,
    })

    expect(queryByText('Dialog Header')).toBeInTheDocument()
    expect(queryByText('Dialog Body')).toBeInTheDocument()
    expect(queryByText('Dialog Footer')).toBeInTheDocument()
  })

  it('should forward classes to root, backdrop, and panel slots', async () => {
    const classes = {
      root: 'test-dialog-root',
      backdrop: 'test-dialog-backdrop',
      panel: 'test-dialog-panel',
    }
    const { getByTestId } = await renderWithNexUIProvider(
      <TestDialog open classes={classes} />,
      {
        useAct: true,
      },
    )

    const dialogRoot = getByTestId('dialog-root')

    expect(dialogRoot).toHaveClass(classes.root)
    expect(dialogRoot.querySelector(`.${dialogClasses.backdrop}`)).toHaveClass(
      classes.backdrop,
    )
    expect(dialogRoot.querySelector(`.${dialogClasses.panel}`)).toHaveClass(
      classes.panel,
    )
  })

  it('should forward slotProps to backdrop and panel slots', async () => {
    const slotProps = {
      backdrop: { className: 'test-dialog-backdrop' },
      panel: { className: 'test-dialog-panel' },
    }
    const { getByTestId } = await renderWithNexUIProvider(
      <TestDialog open slotProps={slotProps} />,
      {
        useAct: true,
      },
    )

    const dialogRoot = getByTestId('dialog-root')
    expect(dialogRoot.querySelector(`.${dialogClasses.backdrop}`)).toHaveClass(
      slotProps.backdrop.className,
    )
    expect(dialogRoot.querySelector(`.${dialogClasses.panel}`)).toHaveClass(
      slotProps.panel.className,
    )
  })

  it('should hide backdrop when hideBackdrop=true', async () => {
    const { getByTestId } = await renderWithNexUIProvider(
      <TestDialog open hideBackdrop />,
      {
        useAct: true,
      },
    )

    const dialogRoot = getByTestId('dialog-root')
    expect(
      dialogRoot.querySelector(`.${dialogClasses.backdrop}`),
    ).not.toBeInTheDocument()
  })

  it('should not render close button when hideCloseButton=true', async () => {
    const { queryByRole } = await renderWithNexUIProvider(
      <TestDialog open hideCloseButton />,
      {
        useAct: true,
      },
    )

    expect(queryByRole('button')).not.toBeInTheDocument()
  })

  it('should render custom close icon when closeIcon is provided', async () => {
    const closeIcon = <span data-testid='custom-close-icon'>X</span>
    const { queryByTestId, user } = await renderWithNexUIProvider(
      <TestDialog defaultOpen closeIcon={closeIcon} />,
      {
        useAct: true,
      },
    )

    const customCloseIcon = queryByTestId('custom-close-icon')
    expect(customCloseIcon).toBeInTheDocument()

    await user.click(customCloseIcon!)
    expect(queryByTestId('dialog-content')).not.toBeInTheDocument()
  })

  it('should be controlled via open prop', async () => {
    const { queryByTestId, getByTestId, user } = await renderWithNexUIProvider(
      <ControlledDialog />,
      {
        useAct: true,
      },
    )

    const toggleButton = getByTestId('toggle-button')

    expect(queryByTestId('dialog-root')).not.toBeInTheDocument()

    await user.click(toggleButton)
    expect(queryByTestId('dialog-root')).toBeInTheDocument()

    await user.click(toggleButton)
    expect(queryByTestId('dialog-root')).not.toBeInTheDocument()
  })

  it('should open when the DialogTrigger is clicked', async () => {
    const { getByTestId, queryByTestId, user } = await renderWithNexUIProvider(
      <Dialog>
        <DialogTrigger>
          <button data-testid='open-button'>Open Dialog</button>
        </DialogTrigger>
        <DialogContent data-testid='dialog-content' />
      </Dialog>,
      {
        useAct: true,
      },
    )

    expect(queryByTestId('dialog-content')).not.toBeInTheDocument()
    const openButton = getByTestId('open-button')

    await user.click(openButton)
    expect(queryByTestId('dialog-content')).toBeInTheDocument()
  })

  it('should close when the DialogClose is clicked', async () => {
    const { getByTestId, queryByTestId, user } = await renderWithNexUIProvider(
      <Dialog defaultOpen>
        <DialogClose>
          <button data-testid='close-button'>Close Dialog</button>
        </DialogClose>
        <DialogContent data-testid='dialog-content' />
      </Dialog>,
      {
        useAct: true,
      },
    )

    expect(queryByTestId('dialog-content')).toBeInTheDocument()
    const closeButton = getByTestId('close-button')

    await user.click(closeButton)
    expect(queryByTestId('dialog-content')).not.toBeInTheDocument()
  })

  describe('DialogContent', () => {
    it('should render with root class but no others', async () => {
      const { getByTestId } = await renderWithNexUIProvider(
        <TestDialog open />,
        {
          useAct: true,
        },
      )

      const dialogContent = getByTestId('dialog-content')
      expect(dialogContent).toHaveClass(dialogContentClasses.root)
    })

    it('should forward classes to root and closeButton slots', async () => {
      const classes = {
        root: 'test-dialog-content-root',
        closeButton: 'test-dialog-content-close-button',
      }
      const { getByTestId } = await renderWithNexUIProvider(
        <Dialog open>
          <DialogContent data-testid='dialog-content' classes={classes}>
            <DialogHeader>Dialog Header</DialogHeader>
            <DialogBody>Dialog Body</DialogBody>
            <DialogFooter>Dialog Footer</DialogFooter>
          </DialogContent>
        </Dialog>,
        {
          useAct: true,
        },
      )

      const dialogContent = getByTestId('dialog-content')
      expect(dialogContent).toHaveClass(classes.root)
      expect(
        dialogContent.querySelector(`.${dialogContentClasses['close-button']}`),
      ).toHaveClass(classes.closeButton)
    })
  })

  describe('DialogHeader', () => {
    it('should render with header classes but no others', async () => {
      const { getByTestId } = await renderWithNexUIProvider(
        <TestDialog open />,
        {
          useAct: true,
        },
      )

      const dialogHeader = getByTestId('dialog-header')
      expect(dialogHeader).toHaveClass(dialogHeaderClasses.root)
    })
  })

  describe('DialogBody', () => {
    it('should render with body classes but no others', async () => {
      const { getByTestId } = await renderWithNexUIProvider(
        <TestDialog open />,
        {
          useAct: true,
        },
      )

      const dialogBody = getByTestId('dialog-body')
      expect(dialogBody).toHaveClass(dialogBodyClasses.root)
    })
  })

  describe('DialogFooter', () => {
    it('should render with footer classes but no others', async () => {
      const { getByTestId } = await renderWithNexUIProvider(
        <TestDialog open />,
        {
          useAct: true,
        },
      )

      const dialogFooter = getByTestId('dialog-footer')
      expect(dialogFooter).toHaveClass(dialogFooterClasses.root)
    })
  })
})
