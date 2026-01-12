import { useState } from 'react'
import {
  renderWithNexUIProvider,
  testClassNamesForwarding,
  testComponentStability,
  testRefForwarding,
  testSlotPropsForwarding,
  testVariantDataAttrs,
} from '~/tests/shared'
import { act, fireEvent } from '@testing-library/react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogBody,
} from '../index'
import { dialogClasses, dialogContentClasses } from './classes'
import type { DialogProps } from '../index'

function TestDialog(props: DialogProps) {
  return (
    <Dialog data-testid='dialog-root' {...props}>
      <DialogContent data-testid='dialog-content'>
        <DialogHeader data-testid='dialog-header'>Dialog Header</DialogHeader>
        <DialogBody data-testid='dialog-body'>Dialog Body</DialogBody>
        <DialogFooter data-testid='dialog-footer'>Dialog Footer</DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const ControlledDialog = ({ defaultOpen = false, ...props }: DialogProps) => {
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

const slots = ['backdrop'] as const

describe('Dialog', () => {
  testComponentStability(<TestDialog open />, {
    useAct: true,
  })

  testRefForwarding(<TestDialog open />, {
    useAct: true,
  })

  testClassNamesForwarding(
    <TestDialog open />,
    slots,
    {
      backdrop: 'test-dialog-backdrop',
    },
    dialogClasses,
    { useAct: true },
  )

  testSlotPropsForwarding(
    <TestDialog open />,
    slots,
    {
      backdrop: {
        className: 'test-dialog-backdrop',
      },
    },
    dialogClasses,
    {
      useAct: true,
    },
  )

  testVariantDataAttrs(<TestDialog open />, ['hideBackdrop', [true, false]], {
    useAct: true,
  })

  it('should render with root class on root element', async () => {
    const { getByTestId } = await renderWithNexUIProvider(<TestDialog open />, {
      useAct: true,
    })
    const dialogRoot = getByTestId('dialog-root')

    expect(dialogRoot).toHaveClass(dialogClasses.root)
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

  it('should hide backdrop when hideBackdrop=true', async () => {
    const { getByTestId } = await renderWithNexUIProvider(
      <TestDialog open hideBackdrop />,
      {
        useAct: true,
      },
    )

    const dialogRoot = getByTestId('dialog-root')
    expect(
      dialogRoot.querySelector(`.${dialogClasses.backdrop}`),
    ).not.toBeInTheDocument()
  })

  it('should be controlled via open prop', async () => {
    const { queryByTestId, getByTestId } = await renderWithNexUIProvider(
      <ControlledDialog />,
      {
        useAct: true,
      },
    )

    const toggleButton = getByTestId('toggle-button')

    expect(queryByTestId('dialog-root')).not.toBeInTheDocument()

    await act(async () => {
      fireEvent.click(toggleButton)
    })
    expect(queryByTestId('dialog-root')).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(toggleButton)
    })
    expect(queryByTestId('dialog-root')).not.toBeInTheDocument()
  })

  it('should disable animations when disableAnimation=true', () => {
    const { queryByClassName } = renderWithNexUIProvider(
      <TestDialog
        open
        disableAnimation={true}
        motionProps={{
          className: 'test-motion',
        }}
      />,
    )
    expect(queryByClassName('test-motion')).not.toBeInTheDocument()

    expect(queryByClassName(dialogContentClasses.paper)).not.toHaveStyle(
      'transform: scale(1)',
    )
  })

  it('should render into document.body via Portal when defaultOpen', async () => {
    const { container, getByTestId } = await renderWithNexUIProvider(
      <TestDialog defaultOpen />,
      {
        useAct: true,
      },
    )

    expect(container.firstChild).toBeNull()

    const modalRoot = getByTestId('dialog-root')
    expect(modalRoot.parentElement).toBe(document.body)
  })
})
