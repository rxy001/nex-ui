import { renderWithNexUIProvider } from '~/tests/shared'
import { waitFor, fireEvent } from '@testing-library/react'
import {
  Popper,
  PopperRoot,
  PopperContent,
  PopperTrigger,
  PopperPortal,
  PopperMotion,
} from '../index'
import type { PopperTriggerProps } from '../index'

function TestPopper(props: PopperTriggerProps) {
  return (
    <Popper>
      <PopperTrigger {...props}>
        <button data-testid='popper-trigger'>Trigger</button>
      </PopperTrigger>
      <PopperPortal>
        <PopperRoot data-testid='popper-root'>
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

describe('PopperTrigger', () => {
  it('should support click action', async () => {
    const { getByTestId, queryByTestId, user } = await renderWithNexUIProvider(
      <TestPopper action='click' />,
      {
        useAct: true,
      },
    )

    const trigger = getByTestId('popper-trigger')

    expect(queryByTestId('popper-root')).not.toBeInTheDocument()

    await user.click(trigger)

    await waitFor(() =>
      expect(queryByTestId('popper-root')).toBeInTheDocument(),
    )

    await user.click(trigger)

    await waitFor(() =>
      expect(queryByTestId('popper-root')).not.toBeInTheDocument(),
    )
  })

  it('should close when clicking popper outside', async () => {
    const { getByTestId, queryByTestId, user } = await renderWithNexUIProvider(
      <TestPopper action='click' />,
      {
        useAct: true,
      },
    )

    const trigger = getByTestId('popper-trigger')

    expect(queryByTestId('popper-root')).not.toBeInTheDocument()

    await user.click(trigger)
    await waitFor(() =>
      expect(queryByTestId('popper-root')).toBeInTheDocument(),
    )

    await user.click(document.body)
    await waitFor(() =>
      expect(queryByTestId('popper-root')).not.toBeInTheDocument(),
    )
  })

  it('should support hover action', async () => {
    const { getByTestId, queryByTestId, user } = await renderWithNexUIProvider(
      <TestPopper action='hover' />,
      {
        useAct: true,
      },
    )

    const trigger = getByTestId('popper-trigger')

    expect(queryByTestId('popper-root')).not.toBeInTheDocument()

    await user.hover(trigger)

    await waitFor(() =>
      expect(queryByTestId('popper-root')).toBeInTheDocument(),
    )

    await user.unhover(trigger)
    await waitFor(() =>
      expect(queryByTestId('popper-root')).not.toBeInTheDocument(),
    )
  })

  it('should close when clicking the trigger if closeOnClick is true', async () => {
    const { getByTestId, queryByTestId, user } = await renderWithNexUIProvider(
      <TestPopper action='hover' closeOnClick />,
      {
        useAct: true,
      },
    )

    const trigger = getByTestId('popper-trigger')

    expect(queryByTestId('popper-root')).not.toBeInTheDocument()

    await user.hover(trigger)
    await waitFor(() =>
      expect(queryByTestId('popper-root')).toBeInTheDocument(),
    )

    Object.defineProperty(trigger, 'matches', {
      value: () => false,
    })

    await user.click(trigger)
    await waitFor(() =>
      expect(queryByTestId('popper-root')).not.toBeInTheDocument(),
    )
  })

  it('should not close when clicking the trigger if closeOnClick is false', async () => {
    const { getByTestId, queryByTestId, user } = await renderWithNexUIProvider(
      <TestPopper action='hover' closeOnClick={false} />,
      {
        useAct: true,
      },
    )

    const trigger = getByTestId('popper-trigger')

    expect(queryByTestId('popper-root')).not.toBeInTheDocument()

    await user.hover(trigger)
    await waitFor(() =>
      expect(queryByTestId('popper-root')).toBeInTheDocument(),
    )

    await user.click(trigger)
    await waitFor(() =>
      expect(queryByTestId('popper-root')).toBeInTheDocument(),
    )
  })

  it('should keep the popper open when interacting with its content if interactive is true', async () => {
    const { getByTestId, queryByTestId, user } = await renderWithNexUIProvider(
      <TestPopper action='hover' interactive />,
      {
        useAct: true,
      },
    )

    const trigger = getByTestId('popper-trigger')

    expect(queryByTestId('popper-root')).not.toBeInTheDocument()

    await user.hover(trigger)
    await waitFor(() =>
      expect(queryByTestId('popper-root')).toBeInTheDocument(),
    )

    const content = getByTestId('popper-content')

    await user.hover(content)
    await user.unhover(trigger)

    expect(queryByTestId('popper-root')).toBeInTheDocument()
  })

  it('should close the popper when interacting with its content if interactive is false', async () => {
    const { getByTestId, queryByTestId, user } = await renderWithNexUIProvider(
      <TestPopper action='hover' interactive={false} />,
      {
        useAct: true,
      },
    )

    const trigger = getByTestId('popper-trigger')

    expect(queryByTestId('popper-root')).not.toBeInTheDocument()

    await user.hover(trigger)
    await waitFor(() =>
      expect(queryByTestId('popper-root')).toBeInTheDocument(),
    )

    const content = getByTestId('popper-content')

    await user.hover(content)
    await user.unhover(trigger)

    await waitFor(() =>
      expect(queryByTestId('popper-root')).not.toBeInTheDocument(),
    )
  })

  it('should open the popper when tabbing to the trigger', async () => {
    const { queryByTestId, user } = await renderWithNexUIProvider(
      <TestPopper />,
      {
        useAct: true,
      },
    )

    expect(queryByTestId('popper-root')).not.toBeInTheDocument()

    await user.tab()

    await waitFor(() =>
      expect(queryByTestId('popper-root')).toBeInTheDocument(),
    )
  })

  it('should close the popper when tabbing away from the trigger', async () => {
    const { queryByTestId, user } = await renderWithNexUIProvider(
      <>
        <TestPopper />
        <button data-testid='after-button'>After</button>
      </>,
      {
        useAct: true,
      },
    )

    expect(queryByTestId('popper-root')).not.toBeInTheDocument()

    await user.tab()
    await waitFor(() =>
      expect(queryByTestId('popper-root')).toBeInTheDocument(),
    )

    await user.tab()
    await waitFor(() =>
      expect(queryByTestId('popper-root')).not.toBeInTheDocument(),
    )
  })

  it('should not respond when manually focusing the trigger', async () => {
    const { getByTestId, queryByTestId } = await renderWithNexUIProvider(
      <TestPopper />,
      {
        useAct: true,
      },
    )

    const trigger = getByTestId('popper-trigger')

    expect(queryByTestId('popper-root')).not.toBeInTheDocument()

    fireEvent.focus(trigger)

    expect(queryByTestId('popper-root')).not.toBeInTheDocument()
  })
})
