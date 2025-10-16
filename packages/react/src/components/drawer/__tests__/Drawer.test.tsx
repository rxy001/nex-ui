import { useState } from 'react'
import {
  renderWithNexUIProvider,
  testClassNamesForwarding,
  testComponentStability,
  testRefForwarding,
  testSlotPropsForwarding,
} from '~/tests/shared'
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
} from '../index'
import { drawerClasses } from './classes'
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

const slots = ['backdrop'] as const

describe('Drawer', () => {
  testComponentStability(<TestDrawer open />, {
    useAct: true,
  })

  testRefForwarding(<TestDrawer open />, {
    useAct: true,
  })

  testClassNamesForwarding(
    <TestDrawer open />,
    slots,
    {
      backdrop: 'test-drawer-backdrop',
    },
    drawerClasses,
    {
      useAct: true,
    },
  )

  testSlotPropsForwarding(
    <TestDrawer open />,
    slots,
    {
      backdrop: {
        className: 'test-drawer-backdrop',
      },
    },
    drawerClasses,
    {
      useAct: true,
    },
  )

  it('should render with root class on root element', async () => {
    const { getByTestId } = await renderWithNexUIProvider(<TestDrawer open />, {
      useAct: true,
    })
    const drawerRoot = getByTestId('drawer-root')

    expect(drawerRoot).toHaveClass(drawerClasses.root)
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
