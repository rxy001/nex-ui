import { renderWithNexUIProvider } from '~/tests/shared'
import { Dialog, DialogContent, DialogClose } from '../index'

describe('DialogClose', () => {
  it('should close when the DialogClose is clicked', async () => {
    const { getByTestId, queryByTestId, user } = await renderWithNexUIProvider(
      <Dialog defaultOpen>
        <DialogClose>
          <button data-testid='close-button'>Close Dialog</button>
        </DialogClose>
        <DialogContent data-testid='dialog-content' />
      </Dialog>,
      {
        useAct: true,
      },
    )

    expect(queryByTestId('dialog-content')).toBeInTheDocument()
    const closeButton = getByTestId('close-button')

    await user.click(closeButton)
    expect(queryByTestId('dialog-content')).not.toBeInTheDocument()
  })
})
