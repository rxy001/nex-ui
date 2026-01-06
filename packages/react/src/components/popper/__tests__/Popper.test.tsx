import { act } from '@testing-library/react'
import { useState } from 'react'
import {
  renderWithNexUIProvider,
  testComponentStability,
  testVariantDataAttrs,
} from '~/tests/shared'
import {
  Popper,
  PopperRoot,
  PopperContent,
  PopperAnchor,
  PopperPortal,
  PopperMotion,
} from '../index'
import type { PopperProps, PopperRootProps } from '../index'
import type { PopperPortalProps } from '../types'

type TestPopperProps = PopperProps &
  Pick<PopperRootProps, 'closeOnEscape' | 'closeOnDetached' | 'placement'> &
  PopperPortalProps & {
    defaultOpen?: boolean
    className?: string
    'data-testid'?: string
  }

function TestPopper({
  keepMounted,
  disableAnimation,
  closeOnDetached,
  placement,
  closeOnEscape,
  className,
  defaultOpen = false,
  'data-testid': testid = 'popper-root',
  ...props
}: TestPopperProps) {
  const [open, setOpen] = useState(defaultOpen)

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
      <PopperPortal
        keepMounted={keepMounted}
        disableAnimation={disableAnimation}
      >
        <PopperRoot
          closeOnEscape={closeOnEscape}
          className={className}
          data-testid={testid}
          closeOnDetached={closeOnDetached}
          placement={placement}
        >
          <PopperMotion>
            <PopperContent data-testid='popper-content'>
              Popper Content
            </PopperContent>
          </PopperMotion>
        </PopperRoot>
      </PopperPortal>
    </Popper>
  )
}

describe('Popper', () => {
  testComponentStability(<TestPopper open />, {
    useAct: true,
  })

  testVariantDataAttrs(<TestPopper open />, ['closeOnEscape', [true, false]], {
    useAct: true,
  })

  testVariantDataAttrs(<TestPopper open />, ['keepMounted', [true, false]], {
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

  testVariantDataAttrs(
    <TestPopper open />,
    ['closeOnDetached', [true, false]],
    {
      useAct: true,
    },
  )

  testVariantDataAttrs(
    <TestPopper open />,
    ['disableAnimation', [true, false]],
    {
      useAct: true,
    },
  )

  it('should render with default props', async () => {
    const { getByTestId } = await renderWithNexUIProvider(<TestPopper open />, {
      useAct: true,
    })

    const root = getByTestId('popper-root')
    expect(root).toHaveAttribute('data-placement', 'top')
    expect(root).toHaveAttribute('data-keep-mounted', 'false')
    expect(root).toHaveAttribute('data-close-on-escape', 'true')
    expect(root).toHaveAttribute('data-state', 'open')

    expect(root).toMatchSnapshot()
  })

  it('should not render children by default', async () => {
    const { queryByTestId } = await renderWithNexUIProvider(<TestPopper />, {
      useAct: true,
    })
    expect(queryByTestId('popper-root')).toBeNull()
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

    const popperRoot = getByTestId('popper-root')

    expect(popperRoot.parentElement).toBe(document.body)
    const popperContent = getByTestId('popper-content')
    expect(popperRoot).toContainElement(popperContent)
  })

  it('should render into document.body via Portal when defaultOpen', async () => {
    const { container, getByTestId } = await renderWithNexUIProvider(
      <TestPopper defaultOpen />,
      {
        useAct: true,
      },
    )
    expect(container.children).toHaveLength(1)
    const popperRoot = getByTestId('popper-root')
    expect(popperRoot.parentElement).toBe(document.body)
    const popperContent = getByTestId('popper-content')
    expect(popperRoot).toContainElement(popperContent)
  })

  it('should be controlled by open prop', async () => {
    const { rerender, queryByTestId } = await renderWithNexUIProvider(
      <TestPopper open={false} />,
      {
        useAct: true,
      },
    )

    expect(queryByTestId('popper-root')).toBeNull()

    await act(async () => {
      rerender(<TestPopper open />)
    })

    expect(queryByTestId('popper-root')).toBeInTheDocument()
  })

  it('should close when pressing Escape key if closeOnEscape=true', async () => {
    const { queryByTestId, user } = await renderWithNexUIProvider(
      <TestPopper defaultOpen />,
      {
        useAct: true,
      },
    )

    expect(queryByTestId('popper-root')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(queryByTestId('popper-root')).toBeNull()
  })

  it('should not close when pressing Escape key if closeOnEscape=false', async () => {
    const { queryByTestId, user } = await renderWithNexUIProvider(
      <TestPopper closeOnEscape={false} defaultOpen />,
      {
        useAct: true,
      },
    )

    expect(queryByTestId('popper-root')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(queryByTestId('popper-root')).toBeInTheDocument()
  })

  it('should always keep the children in the DOM when keepMounted=true', async () => {
    const { getByTestId, rerender } = await renderWithNexUIProvider(
      <TestPopper keepMounted open={false} />,
      {
        useAct: true,
      },
    )

    const popperRoot = getByTestId('popper-root')
    expect(popperRoot).toBeInTheDocument()

    await act(async () => {
      rerender(<TestPopper keepMounted open />)
    })

    expect(popperRoot).toBeInTheDocument()
  })

  it('should render correct styles based on disableAnimation and keepMounted', async () => {
    const { getByTestId, rerender } = await renderWithNexUIProvider(
      <TestPopper disableAnimation={true} keepMounted open={false} />,
      {
        useAct: true,
      },
    )

    const popperRoot = getByTestId('popper-root')

    expect(popperRoot).toHaveStyle('display: none')

    await act(async () => {
      rerender(<TestPopper disableAnimation={true} keepMounted open />)
    })

    expect(popperRoot).toHaveStyle('display: block')

    await act(async () => {
      rerender(<TestPopper disableAnimation={false} keepMounted open={false} />)
    })

    expect(popperRoot).not.toHaveStyle('display: none')
  })

  it('should call onClose when the popepr is closed', async () => {
    const onClose = jest.fn()
    const { queryByTestId, user } = await renderWithNexUIProvider(
      <TestPopper defaultOpen onClose={onClose} />,
      {
        useAct: true,
      },
    )

    const popperRoot = queryByTestId('popper-root')
    expect(popperRoot).toBeInTheDocument()
    await user.keyboard('{Escape}')

    expect(popperRoot).not.toBeInTheDocument()
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  describe('Accessibility', () => {
    it('should be aria-hidden when the popper is closed and keepMounted is true', async () => {
      const { getByTestId } = await renderWithNexUIProvider(
        <TestPopper open={false} keepMounted />,
        {
          useAct: true,
        },
      )
      const popperRoot = getByTestId('popper-root')
      expect(popperRoot).toHaveAttribute('aria-hidden', 'true')
    })
  })
})
