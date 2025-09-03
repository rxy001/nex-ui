import {
  renderWithNexUIProvider,
  testComponentStability,
  testRefForwarding,
} from '~/tests/shared'
import { CardFooter } from '../index'
import { cardFooterClasses } from '../classes'

describe('CardFooter', () => {
  testComponentStability(<CardFooter />)
  testRefForwarding(CardFooter)

  it('should render with default props', () => {
    const { container } = renderWithNexUIProvider(<CardFooter />)

    const cardBodyRoot = container.firstElementChild
    expect(cardBodyRoot).toHaveClass(cardFooterClasses.root)
  })
})
