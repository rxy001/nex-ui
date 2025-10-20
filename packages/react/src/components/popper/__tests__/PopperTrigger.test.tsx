import { renderWithNexUIProvider } from '~/tests/shared'
import { waitForElementToBeRemoved } from '@testing-library/react'
import { Popper, PopperRoot, PopperContent, PopperTrigger } from '../index'
import { Button } from '../../button'
import type { PopperTriggerProps } from '../index'

function TestPopper(props: PopperTriggerProps) {
  return (
    <Popper openDelay={0} closeDelay={0}>
      <PopperTrigger {...props}>
        <Button data-testid='popper-trigger'>Trigger</Button>
      </PopperTrigger>
      <PopperRoot data-testid='popper-root'>
        <PopperContent data-testid='popper-content'>
          Popper Content
        </PopperContent>
      </PopperRoot>
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

    expect(queryByTestId('popper-root')).toBeNull()

    await user.click(trigger)

    expect(queryByTestId('popper-root')).toBeInTheDocument()

    await user.click(trigger)

    expect(queryByTestId('popper-root')).toBeNull()
  })

  it('should close when clicking popper outside', async () => {
    const { getByTestId, queryByTestId, user } = await renderWithNexUIProvider(
      <TestPopper action='click' />,
      {
        useAct: true,
      },
    )

    const trigger = getByTestId('popper-trigger')

    expect(queryByTestId('popper-root')).toBeNull()

    await user.click(trigger)

    expect(queryByTestId('popper-root')).toBeInTheDocument()

    await user.click(document.body)

    await waitForElementToBeRemoved(() => queryByTestId('popper-root'))

    expect(queryByTestId('popper-root')).toBeNull()
  })

  it('should support hover action', async () => {
    const { getByTestId, queryByTestId, user } = await renderWithNexUIProvider(
      <TestPopper action='hover' />,
      {
        useAct: true,
      },
    )

    const trigger = getByTestId('popper-trigger')

    expect(queryByTestId('popper-root')).toBeNull()

    await user.hover(trigger)

    expect(queryByTestId('popper-root')).toBeInTheDocument()

    await user.unhover(trigger)
    await waitForElementToBeRemoved(() => queryByTestId('popper-root'))

    expect(queryByTestId('popper-root')).toBeNull()
  })

  it('should close when clicking the trigger if closeOnClick is true', async () => {
    const { getByTestId, queryByTestId, user } = await renderWithNexUIProvider(
      <TestPopper action='hover' closeOnClick />,
      {
        useAct: true,
      },
    )

    const trigger = getByTestId('popper-trigger')

    expect(queryByTestId('popper-root')).toBeNull()

    await user.hover(trigger)

    expect(queryByTestId('popper-root')).toBeInTheDocument()

    await user.click(trigger)

    expect(queryByTestId('popper-root')).toBeNull()
  })

  it('should not close when clicking the trigger if closeOnClick is false', async () => {
    const { getByTestId, queryByTestId, user } = await renderWithNexUIProvider(
      <TestPopper action='hover' closeOnClick={false} />,
      {
        useAct: true,
      },
    )

    const trigger = getByTestId('popper-trigger')

    expect(queryByTestId('popper-root')).toBeNull()

    await user.hover(trigger)

    expect(queryByTestId('popper-root')).toBeInTheDocument()

    await user.click(trigger)

    expect(queryByTestId('popper-root')).toBeInTheDocument()
  })

  it('should keep the popper open when interacting with its content if interactive is true', async () => {
    const { getByTestId, queryByTestId, user } = await renderWithNexUIProvider(
      <TestPopper action='hover' interactive />,
      {
        useAct: true,
      },
    )

    const trigger = getByTestId('popper-trigger')

    expect(queryByTestId('popper-root')).toBeNull()

    await user.hover(trigger)

    expect(queryByTestId('popper-root')).toBeInTheDocument()

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

    expect(queryByTestId('popper-root')).toBeNull()

    await user.hover(trigger)

    expect(queryByTestId('popper-root')).toBeInTheDocument()

    const content = getByTestId('popper-content')

    await user.hover(content)
    await user.unhover(trigger)

    expect(queryByTestId('popper-root')).toBeNull()
  })
})
