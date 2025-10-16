import {
  renderWithNexUIProvider,
  testClassNamesForwarding,
  testRefForwarding,
  testSlotPropsForwarding,
  testVariantDataAttrs,
} from '~/tests/shared'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerBody,
} from '../index'
import { drawerContentClasses } from './classes'
import type { DrawerContentProps } from '../index'

function TestDrawer(props: DrawerContentProps) {
  return (
    <Drawer data-testid='drawer-root' defaultOpen>
      <DrawerContent data-testid='drawer-content' {...props}>
        <DrawerHeader data-testid='drawer-header'>Drawer Header</DrawerHeader>
        <DrawerBody data-testid='drawer-body'>Drawer Body</DrawerBody>
        <DrawerFooter data-testid='drawer-footer'>Drawer Footer</DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

const slots = ['paper', 'closeButton'] as const

describe('DrawerContent', () => {
  testRefForwarding(<TestDrawer />, {
    useAct: true,
  })

  testVariantDataAttrs(
    <TestDrawer />,
    ['size', ['sm', 'xs', 'md', 'lg', 'xl', 'full']],
    {
      useAct: true,
    },
  )

  testVariantDataAttrs(
    <TestDrawer />,
    ['placement', ['top', 'right', 'bottom', 'left']],
    {
      useAct: true,
    },
  )

  testClassNamesForwarding(
    <TestDrawer />,
    slots,
    {
      closeButton: 'test-close-button',
      paper: 'test-paper',
    },
    drawerContentClasses,
    {
      useAct: true,
    },
  )

  testSlotPropsForwarding(
    <TestDrawer />,
    slots,
    {
      paper: { className: 'test-drawer-content-paper' },
      closeButton: { className: 'test-drawer-content-close-button' },
    },
    drawerContentClasses,
    {
      useAct: true,
    },
  )

  it('should render with default props', async () => {
    const { getByTestId } = await renderWithNexUIProvider(<TestDrawer />, {
      useAct: true,
    })

    const drawerContent = getByTestId('drawer-content')
    expect(drawerContent).toHaveClass(drawerContentClasses.root)
    expect(drawerContent).toHaveAttribute('data-placement', 'right')
    expect(drawerContent).toHaveAttribute('data-size', 'md')
    expect(drawerContent).toHaveAttribute('data-hide-close-button', 'false')
  })

  it('should forward motionProps to paper slot', async () => {
    const { getByTestId, rerender } = await renderWithNexUIProvider(
      <TestDrawer
        motionProps={{
          className: 'test-drawer-content-paper-1',
        }}
      />,
      {
        useAct: true,
      },
    )

    const drawerContentRoot = getByTestId('drawer-content')

    const paper = drawerContentRoot.querySelector(
      `.${drawerContentClasses.paper}`,
    )

    expect(paper).toHaveClass('test-drawer-content-paper-1')

    rerender(
      <TestDrawer
        motionProps={() => ({
          className: 'test-drawer-content-paper-2',
        })}
      />,
    )

    expect(paper).toHaveClass('test-drawer-content-paper-2')
  })

  it('should not render close button when hideCloseButton=true', async () => {
    const { queryByRole } = await renderWithNexUIProvider(
      <TestDrawer hideCloseButton />,
      {
        useAct: true,
      },
    )

    expect(queryByRole('button')).not.toBeInTheDocument()
  })

  it('should render custom close icon when closeIcon is provided', async () => {
    const closeIcon = <span data-testid='custom-close-icon'>X</span>
    const { queryByTestId } = await renderWithNexUIProvider(
      <TestDrawer closeIcon={closeIcon} />,
      {
        useAct: true,
      },
    )

    const customCloseIcon = queryByTestId('custom-close-icon')
    expect(customCloseIcon).toBeInTheDocument()
  })

  it('should close when the close button is clicked', async () => {
    const { queryByTestId, user } = await renderWithNexUIProvider(
      <TestDrawer />,
      {
        useAct: true,
      },
    )

    const drawerContentRoot = queryByTestId('drawer-content')
    expect(drawerContentRoot).toBeInTheDocument()
    const closeButton = drawerContentRoot?.querySelector(
      `.${drawerContentClasses['close-button']}`,
    )

    await user.click(closeButton!)
    expect(queryByTestId('drawer-content')).not.toBeInTheDocument()
  })

  describe('Accessibility', () => {
    it('should have role="dialog" on the DrawerContent element', async () => {
      const { getByTestId } = await renderWithNexUIProvider(<TestDrawer />, {
        useAct: true,
      })

      const contentRoot = getByTestId('drawer-content')
      const paper = contentRoot.querySelector(`.${drawerContentClasses.paper}`)
      expect(paper).toHaveAttribute('role', 'dialog')
    })

    it('should have aria-modal="true" on the DrawerContent element', async () => {
      const { getByTestId } = await renderWithNexUIProvider(<TestDrawer />, {
        useAct: true,
      })

      const contentRoot = getByTestId('drawer-content')
      const paper = contentRoot.querySelector(`.${drawerContentClasses.paper}`)
      expect(paper).toHaveAttribute('aria-modal', 'true')
    })

    it('should have aria-labelledby and aria-describedby attributes on the DrawerContent element when provided', async () => {
      const { getByTestId } = await renderWithNexUIProvider(
        <TestDrawer
          aria-labelledby='custom-label'
          aria-describedby='custom-description'
        />,
        {
          useAct: true,
        },
      )
      const content = getByTestId('drawer-content')
      const paper = content.querySelector(`.${drawerContentClasses.paper}`)

      expect(paper).toHaveAttribute('aria-labelledby', 'custom-label')
      expect(paper).toHaveAttribute('aria-describedby', 'custom-description')
    })
  })
})
