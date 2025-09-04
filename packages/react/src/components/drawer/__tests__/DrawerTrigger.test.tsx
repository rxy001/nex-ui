import { renderWithNexUIProvider } from '~/tests/shared'
import { Drawer, DrawerContent, DrawerTrigger } from '../index'

describe('DrawerTrigger', () => {
  it('should open when the DrawerTrigger is clicked', async () => {
    const { getByTestId, queryByTestId, user } = await renderWithNexUIProvider(
      <Drawer>
        <DrawerTrigger>
          <button data-testid='open-button'>Open Drawer</button>
        </DrawerTrigger>
        <DrawerContent data-testid='drawer-content' />
      </Drawer>,
      {
        useAct: true,
      },
    )

    expect(queryByTestId('drawer-content')).not.toBeInTheDocument()
    const openButton = getByTestId('open-button')

    await user.click(openButton)
    expect(queryByTestId('drawer-content')).toBeInTheDocument()
  })
})
