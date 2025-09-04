import {
  testComponentStability,
  testRefForwarding,
  renderWithNexUIProvider,
  testRootClassName,
} from '~/tests/shared'
import { CardActionArea } from '../index'
import { cardActionAreaClasses } from '../classes'

describe('CardActionArea', () => {
  testComponentStability(<CardActionArea />)

  testRefForwarding(<CardActionArea />)

  testRootClassName(<CardActionArea />)

  it('should render with default props', () => {
    const { container } = renderWithNexUIProvider(<CardActionArea />)

    const cardBodyRoot = container.firstElementChild
    expect(cardBodyRoot).toHaveClass(cardActionAreaClasses.root)
  })
})
