import { renderWithNexUIProvider } from '~/tests/shared'
import { Drawer, DrawerContent, DrawerClose } from '../index'

describe('DrawerClose', () => {
  it('should close when the DrawerClose is clicked', async () => {
    const { getByTestId, queryByTestId, user } = await renderWithNexUIProvider(
      <Drawer defaultOpen>
        <DrawerClose>
          <button data-testid='close-button'>Close Drawer</button>
        </DrawerClose>
        <DrawerContent data-testid='drawer-content' />
      </Drawer>,
      {
        useAct: true,
      },
    )

    expect(queryByTestId('drawer-content')).toBeInTheDocument()
    const closeButton = getByTestId('close-button')

    await user.click(closeButton)
    expect(queryByTestId('drawer-content')).not.toBeInTheDocument()
  })
})
