import { useState } from 'react'
import { renderWithNexUIProvider, testComponentStability } from '~/tests/shared'
import { act, fireEvent } from '@testing-library/react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogBody,
} from '../index'
import type { DialogProps } from '../index'

function TestDialog(props: DialogProps) {
  return (
    <Dialog {...props}>
      <DialogContent data-testid='dialog-content'>
        <DialogHeader data-testid='dialog-header'>Dialog Header</DialogHeader>
        <DialogBody data-testid='dialog-body'>Dialog Body</DialogBody>
        <DialogFooter data-testid='dialog-footer'>Dialog Footer</DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function ControlledDialog({ defaultOpen = false, ...props }: DialogProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <>
      <TestDialog open={open} onOpenChange={setOpen} {...props} />
      <button
        data-testid='toggle-button'
        onClick={() => setOpen((prev) => !prev)}
      >
        Toggle Dialog
      </button>
    </>
  )
}

describe('Dialog', () => {
  testComponentStability(<TestDialog open />, {
    useAct: true,
  })

  it('should not render children by default', async () => {
    const { queryByText } = await renderWithNexUIProvider(<TestDialog />, {
      useAct: true,
    })

    expect(queryByText('Dialog Header')).not.toBeInTheDocument()
    expect(queryByText('Dialog Body')).not.toBeInTheDocument()
    expect(queryByText('Dialog Footer')).not.toBeInTheDocument()
  })

  it('should render children when opened', async () => {
    const { queryByText } = await renderWithNexUIProvider(<TestDialog open />, {
      useAct: true,
    })

    expect(queryByText('Dialog Header')).toBeInTheDocument()
    expect(queryByText('Dialog Body')).toBeInTheDocument()
    expect(queryByText('Dialog Footer')).toBeInTheDocument()
  })

  it('should be controlled via open prop', async () => {
    const { queryByTestId, getByTestId } = await renderWithNexUIProvider(
      <ControlledDialog />,
      {
        useAct: true,
      },
    )

    const toggleButton = getByTestId('toggle-button')

    expect(queryByTestId('dialog-content')).not.toBeInTheDocument()

    await act(async () => {
      fireEvent.click(toggleButton)
    })
    expect(queryByTestId('dialog-content')).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(toggleButton)
    })
    expect(queryByTestId('dialog-content')).not.toBeInTheDocument()
  })
})
