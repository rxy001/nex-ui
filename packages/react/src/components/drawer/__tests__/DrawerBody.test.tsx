import { renderWithNexUIProvider, testRefForwarding } from '~/tests/shared'
import { drawerBodyClasses } from './classes'
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
  testRefForwarding(<TestDrawer />, {
    useAct: true,
  })

  it('should render with body class on root element', async () => {
    const { getByTestId } = await renderWithNexUIProvider(<TestDrawer />, {
      useAct: true,
    })

    const drawerBody = getByTestId('drawer-body')
    expect(drawerBody).toHaveClass(drawerBodyClasses.root)
  })
})
