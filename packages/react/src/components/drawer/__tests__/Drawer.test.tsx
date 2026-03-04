import { useState } from 'react'
import { renderWithNexUIProvider, testComponentStability } from '~/tests/shared'
import { act, fireEvent } from '@testing-library/react'
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
} from '../index'
import type { DrawerProps } from '../types'

function TestDrawer(props: DrawerProps) {
  return (
    <Drawer {...props}>
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
  testComponentStability(<TestDrawer open />, {
    useAct: true,
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

  it('should be controlled via open prop', async () => {
    const { queryByTestId, getByTestId } = await renderWithNexUIProvider(
      <ControlledDrawer />,
      {
        useAct: true,
      },
    )

    const toggleButton = getByTestId('toggle-button')

    expect(queryByTestId('drawer-content')).not.toBeInTheDocument()

    await act(async () => {
      fireEvent.click(toggleButton)
    })
    expect(queryByTestId('drawer-content')).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(toggleButton)
    })
    expect(queryByTestId('drawer-content')).not.toBeInTheDocument()
  })
})
