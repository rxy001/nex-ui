import { createRef, useState } from 'react'
import { renderWithNexUIProvider, testComponentStability } from '~/tests/shared'
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
} from '../index'
import { drawerClasses } from '../classes'
import type { DrawerProps } from '../types'

function TestDrawer(props: DrawerProps) {
  return (
    <Drawer data-testid='drawer-root' {...props}>
      <DrawerContent data-testid='drawer-content'>
        <DrawerHeader data-testid='drawer-header'>Drawer Header</DrawerHeader>
        <DrawerBody data-testid='drawer-body'>Drawer Body</DrawerBody>
        <DrawerFooter data-testid='drawer-footer'>Drawer Footer</DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

const ControlledDrawer = ({ defaultOpen = false, ...props }: DrawerProps) => {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <>
      <TestDrawer open={open} onOpenChange={setOpen} {...props} />
      <button
        data-testid='toggle-button'
        onClick={() => setOpen((prev) => !prev)}
      >
        Toggle Drawer
      </button>
    </>
  )
}

describe('Drawer', () => {
  testComponentStability(<TestDrawer open />)

  it('should render with root, and open classes on root element', async () => {
    const { getByTestId } = await renderWithNexUIProvider(<TestDrawer open />, {
      useAct: true,
    })
    const drawerRoot = getByTestId('drawer-root')

    expect(drawerRoot).toHaveClass(drawerClasses.root)
    expect(drawerRoot).toHaveClass(drawerClasses.open)
  })

  it('should not render children by default', async () => {
    const { queryByText } = await renderWithNexUIProvider(<TestDrawer />, {
      useAct: true,
    })

    expect(queryByText('Drawer Header')).not.toBeInTheDocument()
    expect(queryByText('Drawer Body')).not.toBeInTheDocument()
    expect(queryByText('Drawer Footer')).not.toBeInTheDocument()
  })

  it('should render children when open', async () => {
    const { getByText } = await renderWithNexUIProvider(<TestDrawer open />, {
      useAct: true,
    })

    expect(getByText('Drawer Header')).toBeInTheDocument()
    expect(getByText('Drawer Body')).toBeInTheDocument()
    expect(getByText('Drawer Footer')).toBeInTheDocument()
  })

  it("should forward ref to Drawer's root element", async () => {
    const ref = createRef<HTMLDivElement>()
    const { getByTestId } = await renderWithNexUIProvider(
      <TestDrawer open ref={ref} />,
      {
        useAct: true,
      },
    )

    const drawerRoot = getByTestId('drawer-root')
    expect(drawerRoot).toBe(ref.current)
  })

  it('should forward classes to backdrop slot', async () => {
    const classes = {
      backdrop: 'test-drawer-backdrop',
    }
    const { getByTestId } = await renderWithNexUIProvider(
      <TestDrawer open classes={classes} />,
      {
        useAct: true,
      },
    )

    const drawerRoot = getByTestId('drawer-root')

    expect(drawerRoot.querySelector(`.${drawerClasses.backdrop}`)).toHaveClass(
      classes.backdrop,
    )
  })

  it('should forward slotProps to backdrop slot', async () => {
    const slotProps = {
      backdrop: { className: 'test-drawer-backdrop' },
    }
    const { getByTestId } = await renderWithNexUIProvider(
      <TestDrawer open slotProps={slotProps} />,
      {
        useAct: true,
      },
    )

    const drawerRoot = getByTestId('drawer-root')
    expect(drawerRoot.querySelector(`.${drawerClasses.backdrop}`)).toHaveClass(
      slotProps.backdrop.className,
    )
  })

  it('should hide backdrop when hideBackdrop=true', async () => {
    const { getByTestId } = await renderWithNexUIProvider(
      <TestDrawer open hideBackdrop />,
      {
        useAct: true,
      },
    )

    const drawerRoot = getByTestId('drawer-root')
    expect(
      drawerRoot.querySelector(`.${drawerClasses.backdrop}`),
    ).not.toBeInTheDocument()
  })

  it('should be controlled via open prop', async () => {
    const { queryByTestId, getByTestId, user } = await renderWithNexUIProvider(
      <ControlledDrawer />,
      {
        useAct: true,
      },
    )

    const toggleButton = getByTestId('toggle-button')

    expect(queryByTestId('drawer-root')).not.toBeInTheDocument()

    await user.click(toggleButton)
    expect(queryByTestId('drawer-root')).toBeInTheDocument()

    await user.click(toggleButton)
    expect(queryByTestId('drawer-root')).not.toBeInTheDocument()
  })
})
