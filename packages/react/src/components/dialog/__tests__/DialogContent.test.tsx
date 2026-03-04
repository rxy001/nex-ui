import {
  renderWithNexUIProvider,
  testClassNamesForwarding,
  testRefForwarding,
  testSlotPropsForwarding,
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

function TestDialog(props: DialogContentProps) {
  return (
    <Dialog defaultOpen>
      <DialogContent data-testid='dialog-content' {...props}>
        <DialogHeader data-testid='dialog-header'>Dialog Header</DialogHeader>
        <DialogBody data-testid='dialog-body'>Dialog Body</DialogBody>
        <DialogFooter data-testid='dialog-footer'>Dialog Footer</DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const slots = ['paper', 'closeButton', 'backdrop'] as const

describe('DialogContent', () => {
  testRefForwarding(<TestDialog />, {
    useAct: true,
  })

  it(`should have the appropriate data-size-* attribute on element based on size prop`, async () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full'] as const

    const { queryByClassName } = await renderWithNexUIProvider(
      <>
        {sizes.map((value) => (
          <TestDialog className={`size-${value}`} size={value} key={value} />
        ))}
      </>,
      {
        useAct: true,
      },
    )
    sizes.forEach((value) => {
      const attrKey = `data-size`
      const element = queryByClassName(`size-${value}`)
      expect(
        element?.querySelector(`.${dialogContentClasses.paper}`),
      ).toHaveAttribute(attrKey, value)
    })
  })

  it(`should have the appropriate data-placement-* attribute on element based on placement prop`, async () => {
    const placements = ['top', 'center', 'bottom'] as const

    const { queryByClassName } = await renderWithNexUIProvider(
      <>
        {placements.map((value) => (
          <TestDialog
            className={`placement-${value}`}
            placement={value}
            key={value}
          />
        ))}
      </>,
      {
        useAct: true,
      },
    )
    placements.forEach((value) => {
      const attrKey = `data-placement`
      const element = queryByClassName(`placement-${value}`)
      expect(
        element?.querySelector(`.${dialogContentClasses.paper}`),
      ).toHaveAttribute(attrKey, value)
    })
  })

  it(`should have the appropriate data-scroll-* attribute on element based on scroll prop`, async () => {
    const scrolls = ['inside', 'outside'] as const

    const { queryByClassName } = await renderWithNexUIProvider(
      <>
        {scrolls.map((value) => (
          <TestDialog
            className={`scroll-${value}`}
            scroll={value}
            key={value}
          />
        ))}
      </>,
      {
        useAct: true,
      },
    )
    scrolls.forEach((value) => {
      const attrKey = `data-scroll`
      const element = queryByClassName(`scroll-${value}`)
      expect(
        element?.querySelector(`.${dialogContentClasses.paper}`),
      ).toHaveAttribute(attrKey, value)
    })
  })

  testClassNamesForwarding(
    <TestDialog />,
    slots,
    {
      paper: 'test-paper',
      backdrop: 'test-backdrop',
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
      backdrop: { className: 'test-backdrop' },
      closeButton: { className: 'test-close-button' },
    },
    dialogContentClasses,
    {
      useAct: true,
    },
  )

  it('should not render close button when hideCloseButton=true', async () => {
    const { queryByRole } = await renderWithNexUIProvider(
      <TestDialog hideCloseButton />,
      {
        useAct: true,
      },
    )

    expect(queryByRole('button')).not.toBeInTheDocument()
  })

  it('should hide backdrop when hideBackdrop=true', async () => {
    const { queryByClassName } = await renderWithNexUIProvider(
      <TestDialog hideBackdrop />,
      {
        useAct: true,
      },
    )

    expect(
      queryByClassName(dialogContentClasses.backdrop),
    ).not.toBeInTheDocument()
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

    const dialogContent = queryByTestId('dialog-content')
    expect(dialogContent).toBeInTheDocument()
    const closeButton = dialogContent?.querySelector(
      `.${dialogContentClasses.closeButton}`,
    )

    await user.click(closeButton!)
    expect(queryByTestId('dialog-content')).not.toBeInTheDocument()
  })

  it('should ignore motionProps when disableAnimation=true', async () => {
    const { queryByClassName } = await renderWithNexUIProvider(
      <TestDialog
        disableAnimation
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

  it('should apply motionProps to the motion component when disableAnimation=false', async () => {
    const { queryByClassName } = await renderWithNexUIProvider(
      <TestDialog
        motionProps={{
          className: 'test-motion',
        }}
      />,
      {
        useAct: true,
      },
    )

    const paper = queryByClassName(dialogContentClasses.paper)
    expect(paper?.parentElement).toHaveClass('test-motion')
  })

  it('should render into document.body via Portal when defaultOpen', async () => {
    const { container, getByTestId } = await renderWithNexUIProvider(
      <TestDialog disableAnimation />,
      {
        useAct: true,
      },
    )

    expect(container.firstChild).toBeNull()

    const dialogContent = getByTestId('dialog-content')
    expect(dialogContent.parentElement).toBe(document.body)
  })

  describe('Accessibility', () => {
    it('should have aria-labelledby and aria-describedby attributes on the DialogContent element when provided', async () => {
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
