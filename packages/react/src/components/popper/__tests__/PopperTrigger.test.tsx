import { renderWithNexUIProvider } from '~/tests/shared'
import { waitFor } from '@testing-library/react'
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
    <Popper openDelay={0} closeDelay={0}>
      <PopperTrigger {...props} />
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
  it('should open when the PopperTrigger is clicked', async () => {
    const { getByTestId, queryByTestId, user } = await renderWithNexUIProvider(
      <TestPopper>
        <button data-testid='popper-trigger'>Trigger</button>
      </TestPopper>,
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

  it("should return children as-is when PopperTrigger's children is not a valid React element", async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
    const { container } = await renderWithNexUIProvider(
      <TestPopper>Child</TestPopper>,
      {
        useAct: true,
      },
    )

    expect(container.textContent).toBe('Child')
    expect(consoleSpy).toHaveBeenCalled()
    consoleSpy.mockRestore()
  })

  it('should not close when the PopperTrigger is clicked and closeOnClick is false', async () => {
    const { getByTestId, queryByTestId, user } = await renderWithNexUIProvider(
      <TestPopper closeOnClick={false}>
        <button data-testid='popper-trigger'>Trigger</button>
      </TestPopper>,
      {
        useAct: true,
      },
    )

    const trigger = getByTestId('popper-trigger')

    expect(queryByTestId('popper-root')).not.toBeInTheDocument()

    await user.click(trigger)

    expect(queryByTestId('popper-root')).toBeInTheDocument()

    await user.click(trigger)

    expect(queryByTestId('popper-root')).toBeInTheDocument()
  })
})
