import { createRef } from 'react'
import { renderWithNexUIProvider } from '~/tests/shared'
import { drawerBodyClasses } from '../classes'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerBody,
} from '../index'
import type { DrawerBodyProps } from '../index'

function TestDrawer(props: DrawerBodyProps) {
  return (
    <Drawer data-testid='drawer-root' open>
      <DrawerContent data-testid='drawer-content'>
        <DrawerHeader data-testid='drawer-header'>Drawer Header</DrawerHeader>
        <DrawerBody data-testid='drawer-body' {...props}>
          Drawer Body
        </DrawerBody>
        <DrawerFooter data-testid='drawer-footer'>Drawer Footer</DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

describe('DrawerBody', () => {
  it('should render with body class on root element', async () => {
    const { getByTestId } = await renderWithNexUIProvider(<TestDrawer />, {
      useAct: true,
    })

    const drawerBody = getByTestId('drawer-body')
    expect(drawerBody).toHaveClass(drawerBodyClasses.root)
  })

  it("should forward ref to DrawerBody's root element", async () => {
    const ref = createRef<HTMLDivElement>()
    const { getByTestId } = await renderWithNexUIProvider(
      <TestDrawer ref={ref} />,
      {
        useAct: true,
      },
    )

    const drawerBody = getByTestId('drawer-body')
    expect(drawerBody).toBe(ref.current)
  })
})
