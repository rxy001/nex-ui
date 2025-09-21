import {
  testComponentStability,
  testRefForwarding,
  renderWithNexUIProvider,
  testRootClassName,
  testVariantDataAttrs,
} from '~/tests/shared'
import { CardActionArea } from '../index'
import { cardActionAreaClasses } from './constants'

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

  it('should handle click events when not disabled', () => {
    const handleClick = jest.fn()
    const { getByRole } = renderWithNexUIProvider(
      <CardActionArea onClick={handleClick}>Click me</CardActionArea>,
    )

    const button = getByRole('button')
    button.click()

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should not handle click events when disabled', () => {
    const handleClick = jest.fn()
    const { getByRole } = renderWithNexUIProvider(
      <CardActionArea onClick={handleClick} disabled>
        Click me
      </CardActionArea>,
    )

    const button = getByRole('button')
    button.click()

    expect(handleClick).not.toHaveBeenCalled()
  })
})
