import { renderWithNexUIProvider, testRefForwarding } from '~/tests/shared'
import { dialogHeaderClasses } from './classes'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogBody,
} from '../index'
import type { DialogHeaderProps } from '../index'

function TestDialog(props: DialogHeaderProps) {
  return (
    <Dialog data-testid='dialog-root' open>
      <DialogContent data-testid='dialog-content'>
        <DialogHeader data-testid='dialog-header' {...props}>
          Dialog Header
        </DialogHeader>
        <DialogBody data-testid='dialog-body'>Dialog Body</DialogBody>
        <DialogFooter data-testid='dialog-footer'>Dialog Footer</DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

describe('DialogHeader', () => {
  testRefForwarding(<TestDialog />, {
    useAct: true,
  })

  it('should render with header class on root element', async () => {
    const { getByTestId } = await renderWithNexUIProvider(<TestDialog />, {
      useAct: true,
    })

    const dialogHeader = getByTestId('dialog-header')
    expect(dialogHeader).toHaveClass(dialogHeaderClasses.root)
  })
})
