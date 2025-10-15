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

  it('should support focus action', async () => {
    const { getByTestId, queryByTestId, user } = await renderWithNexUIProvider(
      <TestPopper action='focus' />,
      {
        useAct: true,
      },
    )

    const trigger = getByTestId('popper-trigger')

    expect(queryByTestId('popper-root')).toBeNull()

    await user.tab()

    expect(document.activeElement).toBe(trigger)
    expect(queryByTestId('popper-root')).toBeInTheDocument()

    await user.tab()

    expect(document.activeElement).not.toBe(trigger)

    await waitForElementToBeRemoved(() => queryByTestId('popper-root'))

    expect(queryByTestId('popper-root')).toBeNull()
  })
})
