import { renderWithNexUIProvider, testRefForwarding } from '~/tests/shared'
import { dialogBodyClasses } from './classes'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogBody,
} from '../index'
import type { DialogBodyProps } from '../index'

function TestDialog(props: DialogBodyProps) {
  return (
    <Dialog data-testid='dialog-root' open>
      <DialogContent data-testid='dialog-content'>
        <DialogHeader data-testid='dialog-header'>Dialog Header</DialogHeader>
        <DialogBody data-testid='dialog-body' {...props}>
          Dialog Body
        </DialogBody>
        <DialogFooter data-testid='dialog-footer'>Dialog Footer</DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

describe('DialogBody', () => {
  testRefForwarding(<TestDialog />, {
    useAct: true,
  })

  it('should render with body class on root element', async () => {
    const { getByTestId } = await renderWithNexUIProvider(<TestDialog />, {
      useAct: true,
    })

    const dialogBody = getByTestId('dialog-body')
    expect(dialogBody).toHaveClass(dialogBodyClasses.root)
  })
})
