import { createRef } from 'react'
import { renderWithNexUIProvider } from '~/tests/shared'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerBody,
} from '../index'
import { drawerContentClasses, drawerContentDataAttrs } from './constants'
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

describe('DrawerContent', () => {
  it('should render with default props', async () => {
    const { getByTestId } = await renderWithNexUIProvider(<TestDrawer />, {
      useAct: true,
    })

    const drawerContent = getByTestId('drawer-content')
    expect(drawerContent).toHaveClass(drawerContentClasses.root)
    expect(drawerContent).toHaveAttribute(
      ...drawerContentDataAttrs['placement-right'],
    )
    expect(drawerContent).toHaveAttribute(...drawerContentDataAttrs['size-md'])
    expect(drawerContent).toHaveAttribute(
      ...drawerContentDataAttrs['hideCloseButton-false'],
    )
  })

  it("should forward ref to DrawerContent's root element", async () => {
    const ref = createRef<HTMLDivElement>()
    const { getByTestId } = await renderWithNexUIProvider(
      <TestDrawer ref={ref} />,
      {
        useAct: true,
      },
    )

    const drawerContentRoot = getByTestId('drawer-content')
    expect(drawerContentRoot).toBe(ref.current)
  })

  it(`should add the appropriate data-size-* to DrawerContent's root element based on size prop`, async () => {
    const { getByTestId, rerender } = await renderWithNexUIProvider(
      <TestDrawer size='sm' />,
      {
        useAct: true,
      },
    )

    const drawerContentRoot = getByTestId('drawer-content')
    expect(drawerContentRoot).toHaveAttribute(
      ...drawerContentDataAttrs['size-sm'],
    )

    rerender(<TestDrawer size='xs' />)
    expect(drawerContentRoot).toHaveAttribute(
      ...drawerContentDataAttrs['size-xs'],
    )

    rerender(<TestDrawer size='md' />)
    expect(drawerContentRoot).toHaveAttribute(
      ...drawerContentDataAttrs['size-md'],
    )

    rerender(<TestDrawer size='lg' />)
    expect(drawerContentRoot).toHaveAttribute(
      ...drawerContentDataAttrs['size-lg'],
    )

    rerender(<TestDrawer size='xl' />)
    expect(drawerContentRoot).toHaveAttribute(
      ...drawerContentDataAttrs['size-xl'],
    )

    rerender(<TestDrawer size='full' />)
    expect(drawerContentRoot).toHaveAttribute(
      ...drawerContentDataAttrs['size-full'],
    )
  })

  it(`should add the appropriate data-placement-* to root element based on placement prop`, async () => {
    const { getByTestId, rerender } = await renderWithNexUIProvider(
      <TestDrawer placement='right' />,
      {
        useAct: true,
      },
    )

    const drawerContentRoot = getByTestId('drawer-content')

    expect(drawerContentRoot).toHaveAttribute(
      ...drawerContentDataAttrs['placement-right'],
    )

    rerender(<TestDrawer placement='bottom' />)
    expect(drawerContentRoot).toHaveAttribute(
      ...drawerContentDataAttrs['placement-bottom'],
    )

    rerender(<TestDrawer placement='left' />)
    expect(drawerContentRoot).toHaveAttribute(
      ...drawerContentDataAttrs['placement-left'],
    )

    rerender(<TestDrawer placement='top' />)
    expect(drawerContentRoot).toHaveAttribute(
      ...drawerContentDataAttrs['placement-top'],
    )
  })

  it('should forward classNames to paper and closeButton slots', async () => {
    const classNames = {
      paper: 'test-drawer-content-paper',
      closeButton: 'test-drawer-content-close-button',
    }
    const { getByTestId } = await renderWithNexUIProvider(
      <TestDrawer classNames={classNames} />,
      {
        useAct: true,
      },
    )

    const drawerContent = getByTestId('drawer-content')

    expect(
      drawerContent.querySelector(`.${drawerContentClasses.paper}`),
    ).toHaveClass(classNames.paper)
    expect(
      drawerContent.querySelector(`.${drawerContentClasses['close-button']}`),
    ).toHaveClass(classNames.closeButton)
  })

  it('should forward slotProps to backdrop slots', async () => {
    const slotProps = {
      paper: { className: 'test-drawer-content-paper' },
      closeButton: { className: 'test-drawer-content-close-button' },
    }
    const { getByTestId } = await renderWithNexUIProvider(
      <TestDrawer slotProps={slotProps} />,
      {
        useAct: true,
      },
    )

    const drawerContentRoot = getByTestId('drawer-content')
    expect(
      drawerContentRoot.querySelector(`.${drawerContentClasses.paper}`),
    ).toHaveClass(slotProps.paper.className)
    expect(
      drawerContentRoot.querySelector(
        `.${drawerContentClasses['close-button']}`,
      ),
    ).toHaveClass(slotProps.closeButton.className)
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
