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

    const cardBodyRoot = container.firstElementChild
    expect(cardBodyRoot).toHaveClass(cardActionAreaClasses.root)
  })
})
