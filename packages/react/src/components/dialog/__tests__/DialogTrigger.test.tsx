import { renderWithNexUIProvider } from '~/tests/shared'
import { Dialog, DialogContent, DialogTrigger } from '../index'

describe('DialogTrigger', () => {
  it('should open when the DialogTrigger is clicked', async () => {
    const { getByTestId, queryByTestId, user } = await renderWithNexUIProvider(
      <Dialog>
        <DialogTrigger>
          <button data-testid='open-button'>Open Dialog</button>
        </DialogTrigger>
        <DialogContent data-testid='dialog-content' />
      </Dialog>,
      {
        useAct: true,
      },
    )

    expect(queryByTestId('dialog-content')).not.toBeInTheDocument()
    const openButton = getByTestId('open-button')

    await user.click(openButton)
    expect(queryByTestId('dialog-content')).toBeInTheDocument()
  })
})
