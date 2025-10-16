import { renderWithNexUIProvider, testRefForwarding } from '~/tests/shared'
import { dialogFooterClasses } from './classes'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogBody,
} from '../index'
import type { DialogFooterProps } from '../index'

function TestDialog(props: DialogFooterProps) {
  return (
    <Dialog data-testid='dialog-root' open>
      <DialogContent data-testid='dialog-content'>
        <DialogHeader data-testid='dialog-header'>Dialog Header</DialogHeader>
        <DialogBody data-testid='dialog-body'>Dialog Body</DialogBody>
        <DialogFooter data-testid='dialog-footer' {...props}>
          Dialog Footer
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

describe('DialogFooter', () => {
  testRefForwarding(<TestDialog />, {
    useAct: true,
  })

  it('should render with footer class on root element', async () => {
    const { getByTestId } = await renderWithNexUIProvider(<TestDialog />, {
      useAct: true,
    })

    const dialogFooter = getByTestId('dialog-footer')
    expect(dialogFooter).toHaveClass(dialogFooterClasses.root)
  })
})
