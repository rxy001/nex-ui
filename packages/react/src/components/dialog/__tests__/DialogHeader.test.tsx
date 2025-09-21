import { createRef } from 'react'
import { renderWithNexUIProvider } from '~/tests/shared'
import { dialogHeaderClasses } from './constants'
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
  it('should render with header class on root element', async () => {
    const { getByTestId } = await renderWithNexUIProvider(<TestDialog />, {
      useAct: true,
    })

    const dialogHeader = getByTestId('dialog-header')
    expect(dialogHeader).toHaveClass(dialogHeaderClasses.root)
  })

  it("should forward ref to DialogHeader's root element", async () => {
    const ref = createRef<HTMLDivElement>()
    const { getByTestId } = await renderWithNexUIProvider(
      <TestDialog ref={ref} />,
      {
        useAct: true,
      },
    )

    const dialogHeader = getByTestId('dialog-header')
    expect(dialogHeader).toBe(ref.current)
  })
})
