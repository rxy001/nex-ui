import { act } from '@testing-library/react'
import { useState } from 'react'
import {
  renderWithNexUIProvider,
  testComponentStability,
  testVariantDataAttrs,
} from '~/tests/shared'
import { Popper, PopperContent, PopperAnchor, PopperPortal } from '../index'
import type { PopperProps } from '../index'
import type { PopperContentProps, PopperPortalProps } from '../types'

type TestPopperProps = PopperProps &
  PopperPortalProps &
  PopperContentProps & {
    defaultOpen?: boolean
    'data-testid'?: string
  }

function TestPopper({
  closeOnDetached,
  placement,
  closeOnEscape,
  className,
  defaultOpen = false,
  ...props
}: TestPopperProps) {
  const [open, setOpen] = useState(defaultOpen)

  const renderPopperContent = () => (
    <PopperContent
      data-testid='popper-content'
      closeOnEscape={closeOnEscape}
      closeOnDetached={closeOnDetached}
      className={className}
      placement={placement}
      flip={false}
    >
      Popper Content
    </PopperContent>
  )

  return (
    <Popper open={open} onOpenChange={setOpen} {...props}>
      <PopperAnchor>
        <button
          onClick={() => {
            setOpen(true)
          }}
          data-testid='popper-trigger'
        >
          Trigger
        </button>
      </PopperAnchor>
      <PopperPortal>{renderPopperContent()}</PopperPortal>
    </Popper>
  )
}

describe('Popper', () => {
  testComponentStability(<TestPopper open />, {
    useAct: true,
  })

  testVariantDataAttrs(
    <TestPopper open />,
    [
      'placement',
      [
        'top-start',
        'top',
        'top-end',
        'right-start',
        'right',
        'right-end',
        'bottom-start',
        'bottom',
        'bottom-end',
        'left-start',
        'left',
        'left-end',
      ],
    ],
    {
      useAct: true,
    },
  )

  it('should not render children by default', async () => {
    const { queryByTestId } = await renderWithNexUIProvider(<TestPopper />, {
      useAct: true,
    })
    expect(queryByTestId('popper-content')).toBeNull()
  })

  it('should render into document.body via Portal when open', async () => {
    const { container, getByTestId } = await renderWithNexUIProvider(
      <TestPopper open />,
      {
        useAct: true,
      },
    )

    expect(container.children).toHaveLength(1)
    expect(container.firstChild).toHaveTextContent('Trigger')

    const content = getByTestId('popper-content')
    expect(content.parentElement).toBe(document.body)
  })

  it('should render into document.body via Portal when defaultOpen', async () => {
    const { container, getByTestId } = await renderWithNexUIProvider(
      <TestPopper defaultOpen />,
      {
        useAct: true,
      },
    )
    expect(container.children).toHaveLength(1)
    const content = getByTestId('popper-content')
    expect(content.parentElement).toBe(document.body)
  })

  it('should be controlled by open prop', async () => {
    const { rerender, queryByTestId } = await renderWithNexUIProvider(
      <TestPopper open={false} />,
      {
        useAct: true,
      },
    )

    expect(queryByTestId('popper-content')).toBeNull()

    await act(async () => {
      rerender(<TestPopper open />)
    })

    expect(queryByTestId('popper-content')).toBeInTheDocument()
  })

  it('should close when pressing Escape key if closeOnEscape=true', async () => {
    const { queryByTestId, user } = await renderWithNexUIProvider(
      <TestPopper defaultOpen />,
      {
        useAct: true,
      },
    )

    expect(queryByTestId('popper-content')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(queryByTestId('popper-content')).toBeNull()
  })

  it('should not close when pressing Escape key if closeOnEscape=false', async () => {
    const { queryByTestId, user } = await renderWithNexUIProvider(
      <TestPopper closeOnEscape={false} defaultOpen />,
      {
        useAct: true,
      },
    )

    expect(queryByTestId('popper-content')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(queryByTestId('popper-content')).toBeInTheDocument()
  })

  // it('should always keep the children in the DOM when keepMounted=true', async () => {
  //   const { getByTestId, rerender } = await renderWithNexUIProvider(
  //     <TestPopper open={false} />,
  //     {
  //       useAct: true,
  //     },
  //   )

  //   const content = getByTestId('popper-content')
  //   expect(content).toBeInTheDocument()

  //   await act(async () => {
  //     rerender(<TestPopper keepMounted open />)
  //   })

  //   expect(content).toBeInTheDocument()
  // })

  it('should call onClose when the popper is closed', async () => {
    const onClose = jest.fn()
    const { queryByTestId, user } = await renderWithNexUIProvider(
      <TestPopper defaultOpen onClose={onClose} />,
      {
        useAct: true,
      },
    )

    const content = queryByTestId('popper-content')
    expect(content).toBeInTheDocument()
    await user.keyboard('{Escape}')

    expect(content).not.toBeInTheDocument()
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  describe('Accessibility', () => {
    // it('should be aria-hidden when the popper is closed and keepMounted is true', async () => {
    //   const { getByTestId } = await renderWithNexUIProvider(
    //     <TestPopper open={false} keepMounted />,
    //     {
    //       useAct: true,
    //     },
    //   )
    //   const content = getByTestId('popper-content')
    //   expect(content).toHaveAttribute('aria-hidden', 'true')
    // })
  })
})
