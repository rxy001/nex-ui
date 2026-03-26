import {
  testComponentStability,
  testRefForwarding,
  renderWithNexUIProvider,
  testRootClassName,
  testVariantDataAttrs,
} from '~/tests/shared'
import { fireEvent } from '@testing-library/react'
import { CardActionArea } from '../index'
import { cardActionAreaClasses } from './classes'

describe('CardActionArea', () => {
  testComponentStability(<CardActionArea />)

  testRefForwarding(<CardActionArea />)

  testRootClassName(<CardActionArea />)

  testVariantDataAttrs(<CardActionArea />, ['disabled', [true, false]])

  it('should render with default props', () => {
    const { container } = renderWithNexUIProvider(<CardActionArea />)

    const cardActionAreaRoot = container.firstElementChild
    expect(cardActionAreaRoot).toHaveClass(cardActionAreaClasses.root)
    expect(cardActionAreaRoot?.tagName).toBe('BUTTON')
  })

  it('should handle click events when not disabled', async () => {
    const handleClick = jest.fn()
    const { getByRole } = await renderWithNexUIProvider(
      <CardActionArea onClick={handleClick}>Click me</CardActionArea>,
      {
        useAct: true,
      },
    )

    const button = getByRole('button')
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
