import { waitFor, fireEvent } from '@testing-library/react'
import { renderWithNexUIProvider } from '~/tests/shared'
import { Tooltip } from '../index'
import type { TooltipProps } from '../index'

const TestTooltip = (props: TooltipProps) => {
  return (
    <Tooltip content='content' data-testid='tooltip-root' {...props}>
      <button data-testid='tooltip-trigger'>Trigger</button>
    </Tooltip>
  )
}

describe('TooltipTrigger', () => {
  it('should open the tooltip when tabbing to the trigger', async () => {
    const { queryByTestId, user } = await renderWithNexUIProvider(
      <TestTooltip />,
      {
        useAct: true,
      },
    )

    expect(queryByTestId('tooltip-root')).not.toBeInTheDocument()

    await user.tab()

    await waitFor(() =>
      expect(queryByTestId('tooltip-root')).toBeInTheDocument(),
    )
  })

  it('should close the tooltip when tabbing away from the trigger', async () => {
    const { queryByTestId, user } = await renderWithNexUIProvider(
      <>
        <TestTooltip />
        <button data-testid='after-button'>After</button>
      </>,
      {
        useAct: true,
      },
    )

    expect(queryByTestId('tooltip-root')).not.toBeInTheDocument()

    await user.tab()
    await waitFor(() =>
      expect(queryByTestId('tooltip-root')).toBeInTheDocument(),
    )

    await user.tab()
    await waitFor(() =>
      expect(queryByTestId('tooltip-root')).not.toBeInTheDocument(),
    )
  })

  it('should not respond when manually focusing the trigger', async () => {
    const { getByTestId, queryByTestId } = await renderWithNexUIProvider(
      <TestTooltip />,
      {
        useAct: true,
      },
    )

    const trigger = getByTestId('tooltip-trigger')

    expect(queryByTestId('tooltip-root')).not.toBeInTheDocument()

    fireEvent.focus(trigger)

    expect(queryByTestId('tooltip-root')).not.toBeInTheDocument()
  })

  it("should return children as-is when ModalTrigger's children is not a valid React element", async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
    const { container } = await renderWithNexUIProvider(
      <Tooltip content='content'>Trigger</Tooltip>,
      {
        useAct: true,
      },
    )

    expect(container.textContent).toBe('Trigger')
    expect(consoleSpy).toHaveBeenCalled()
    consoleSpy.mockRestore()
  })
})
