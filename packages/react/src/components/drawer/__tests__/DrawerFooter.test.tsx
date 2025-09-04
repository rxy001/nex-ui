import { createRef } from 'react'
import { renderWithNexUIProvider } from '~/tests/shared'
import { drawerFooterClasses } from '../classes'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerBody,
} from '../index'
import type { DrawerFooterProps } from '../index'

function TestDrawer(props: DrawerFooterProps) {
  return (
    <Drawer data-testid='drawer-root' open>
      <DrawerContent data-testid='drawer-content'>
        <DrawerHeader data-testid='drawer-header'>Drawer Header</DrawerHeader>
        <DrawerBody data-testid='drawer-body'>Drawer Body</DrawerBody>
        <DrawerFooter data-testid='drawer-footer' {...props}>
          Drawer Footer
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

describe('DrawerFooter', () => {
  it('should render with footer class on root element', async () => {
    const { getByTestId } = await renderWithNexUIProvider(<TestDrawer />, {
      useAct: true,
    })

    const drawerFooter = getByTestId('drawer-footer')
    expect(drawerFooter).toHaveClass(drawerFooterClasses.root)
  })

  it("should forward ref to DrawerFooter's root element", async () => {
    const ref = createRef<HTMLDivElement>()
    const { getByTestId } = await renderWithNexUIProvider(
      <TestDrawer ref={ref} />,
      {
        useAct: true,
      },
    )

    const drawerFooter = getByTestId('drawer-footer')
    expect(drawerFooter).toBe(ref.current)
  })
})
