import {
  renderWithNexUIProvider,
  testComponentStability,
  testRefForwarding,
  testRootClassName,
} from '~/tests/shared'
import { CardFooter } from '../index'
import { cardFooterClasses } from './classes'

describe('CardFooter', () => {
  testComponentStability(<CardFooter />)

  testRefForwarding(<CardFooter />)

  testRootClassName(<CardFooter />)

  it('should render with default props', () => {
    const { container } = renderWithNexUIProvider(<CardFooter />)

    const cardFooterRoot = container.firstElementChild
    expect(cardFooterRoot).toHaveClass(cardFooterClasses.root)
  })
})
