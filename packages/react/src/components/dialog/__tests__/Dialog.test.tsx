import { createRef, useState } from 'react'
import { renderWithNexUIProvider, testComponentStability } from '~/tests/shared'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogBody,
} from '../index'
import { dialogClasses, dialogDataAttrs } from './constants'
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

describe('Dialog', () => {
  testComponentStability(<TestDialog open />)

  it('should render with root class, data-state="open" on root element', async () => {
    const { getByTestId } = await renderWithNexUIProvider(<TestDialog open />, {
      useAct: true,
    })
    const dialogRoot = getByTestId('dialog-root')

    expect(dialogRoot).toHaveClass(dialogClasses.root)

    expect(dialogRoot).toHaveAttribute(...dialogDataAttrs['open-true'])
  })

  it("should forward ref to Dialog's root element", async () => {
    const ref = createRef<HTMLDivElement>()
    const { getByTestId } = await renderWithNexUIProvider(
      <TestDialog open ref={ref} />,
      {
        useAct: true,
      },
    )

    const dialogRoot = getByTestId('dialog-root')
    expect(dialogRoot).toBe(ref.current)
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

  it('should forward classNames to backdrop slot', async () => {
    const classNames = {
      backdrop: 'test-dialog-backdrop',
    }

    const { getByTestId } = await renderWithNexUIProvider(
      <TestDialog open classNames={classNames} />,
      {
        useAct: true,
      },
    )

    const dialogRoot = getByTestId('dialog-root')

    expect(dialogRoot.querySelector(`.${dialogClasses.backdrop}`)).toHaveClass(
      classNames.backdrop,
    )
  })

  it('should forward slotProps to backdrop slot', async () => {
    const slotProps = {
      backdrop: { className: 'test-dialog-backdrop' },
    }
    const { getByTestId } = await renderWithNexUIProvider(
      <TestDialog open slotProps={slotProps} />,
      {
        useAct: true,
      },
    )

    const dialogRoot = getByTestId('dialog-root')
    expect(dialogRoot.querySelector(`.${dialogClasses.backdrop}`)).toHaveClass(
      slotProps.backdrop.className,
    )
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
    expect(dialogRoot).toHaveAttribute(...dialogDataAttrs['hideBackdrop-true'])
  })

  it('should be controlled via open prop', async () => {
    const { queryByTestId, getByTestId, user } = await renderWithNexUIProvider(
      <ControlledDialog />,
      {
        useAct: true,
      },
    )

    const toggleButton = getByTestId('toggle-button')

    expect(queryByTestId('dialog-root')).not.toBeInTheDocument()

    await user.click(toggleButton)
    expect(queryByTestId('dialog-root')).toBeInTheDocument()

    await user.click(toggleButton)
    expect(queryByTestId('dialog-root')).not.toBeInTheDocument()
  })
})
