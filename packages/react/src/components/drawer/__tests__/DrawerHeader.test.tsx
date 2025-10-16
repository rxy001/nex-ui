import { renderWithNexUIProvider, testRefForwarding } from '~/tests/shared'
import { drawerHeaderClasses } from './classes'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerBody,
} from '../index'
import type { DrawerHeaderProps } from '../index'

function TestDrawer(props: DrawerHeaderProps) {
  return (
    <Drawer data-testid='drawer-root' open>
      <DrawerContent data-testid='drawer-content'>
        <DrawerHeader data-testid='drawer-header' {...props}>
          Drawer Header
        </DrawerHeader>
        <DrawerBody data-testid='drawer-body'>Drawer Body</DrawerBody>
        <DrawerFooter data-testid='drawer-footer'>Drawer Footer</DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

describe('DrawerHeader', () => {
  testRefForwarding(<TestDrawer />, {
    useAct: true,
  })

  it('should render with header class on root element', async () => {
    const { getByTestId } = await renderWithNexUIProvider(<TestDrawer />, {
      useAct: true,
    })

    const drawerHeader = getByTestId('drawer-header')
    expect(drawerHeader).toHaveClass(drawerHeaderClasses.root)
  })
})
