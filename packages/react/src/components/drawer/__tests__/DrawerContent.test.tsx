import {
  renderWithNexUIProvider,
  testClassNamesForwarding,
  testRefForwarding,
  testSlotPropsForwarding,
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
    <Drawer defaultOpen>
      <DrawerContent data-testid='drawer-content' {...props}>
        <DrawerHeader data-testid='drawer-header'>Drawer Header</DrawerHeader>
        <DrawerBody data-testid='drawer-body'>Drawer Body</DrawerBody>
        <DrawerFooter data-testid='drawer-footer'>Drawer Footer</DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

const slots = ['paper', 'backdrop', 'closeButton'] as const

describe('DrawerContent', () => {
  testRefForwarding(<TestDrawer />, {
    useAct: true,
  })

  it(`should have the appropriate data-size-* attribute on element based on size prop`, async () => {
    const sizes = ['sm', 'xs', 'md', 'lg', 'xl', 'full'] as const

    const { queryByClassName } = await renderWithNexUIProvider(
      <>
        {sizes.map((value) => (
          <TestDrawer className={`size-${value}`} size={value} key={value} />
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
        element?.querySelector(`.${drawerContentClasses.paper}`),
      ).toHaveAttribute(attrKey, value)
    })
  })

  it(`should have the appropriate data-placement-* attribute on element based on placement prop`, async () => {
    const placements = ['top', 'right', 'bottom', 'left'] as const

    const { queryByClassName } = await renderWithNexUIProvider(
      <>
        {placements.map((value) => (
          <TestDrawer
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
        element?.querySelector(`.${drawerContentClasses.paper}`),
      ).toHaveAttribute(attrKey, value)
    })
  })

  testClassNamesForwarding(
    <TestDrawer />,
    slots,
    {
      closeButton: 'test-close-button',
      backdrop: 'test-backdrop',
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
      backdrop: { className: 'test-drawer-content-backdrop' },
      closeButton: { className: 'test-drawer-content-close-button' },
    },
    drawerContentClasses,
    {
      useAct: true,
    },
  )

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

    const drawerContent = queryByTestId('drawer-content')
    expect(drawerContent).toBeInTheDocument()
    const closeButton = drawerContent?.querySelector(
      `.${drawerContentClasses.closeButton}`,
    )

    await user.click(closeButton!)
    expect(queryByTestId('drawer-content')).not.toBeInTheDocument()
  })

  it('should ignore motionProps when disableAnimation=true', async () => {
    const { queryByClassName } = await renderWithNexUIProvider(
      <TestDrawer
        disableAnimation
        motionProps={{
          className: 'test-motion',
        }}
      />,
      {
        useAct: true,
      },
    )

    const paper = queryByClassName(drawerContentClasses.paper)
    expect(paper).not.toHaveClass('test-motion')
  })

  it('should apply motionProps to the motion component when disableAnimation=false', async () => {
    const { queryByClassName } = await renderWithNexUIProvider(
      <TestDrawer
        motionProps={{
          className: 'test-motion',
        }}
      />,
      {
        useAct: true,
      },
    )

    const paper = queryByClassName(drawerContentClasses.paper)
    expect(paper?.parentElement).toHaveClass('test-motion')
  })

  it('should hide backdrop when hideBackdrop=true', async () => {
    const { queryByClassName } = await renderWithNexUIProvider(
      <TestDrawer hideBackdrop />,
      {
        useAct: true,
      },
    )

    expect(
      queryByClassName(drawerContentClasses.backdrop),
    ).not.toBeInTheDocument()
  })

  it('should disable animations when disableAnimation=true', async () => {
    const { queryByClassName } = await renderWithNexUIProvider(
      <TestDrawer
        disableAnimation
        motionProps={{
          className: 'test-motion',
        }}
      />,
      {
        useAct: true,
      },
    )
    expect(queryByClassName('test-motion')).not.toBeInTheDocument()
  })

  it('should render into document.body via Portal when defaultOpen', async () => {
    const { container, getByTestId } = await renderWithNexUIProvider(
      <TestDrawer disableAnimation />,
      {
        useAct: true,
      },
    )

    expect(container.firstChild).toBeNull()

    const drawerContent = getByTestId('drawer-content')
    expect(drawerContent.parentElement).toBe(document.body)
  })

  describe('Accessibility', () => {
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
