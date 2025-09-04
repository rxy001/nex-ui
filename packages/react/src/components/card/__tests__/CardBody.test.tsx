import {
  renderWithNexUIProvider,
  testComponentStability,
  testRefForwarding,
  testRootClassName,
} from '~/tests/shared'
import { CardBody } from '../index'
import { cardBodyClasses } from '../classes'

describe('CardBody', () => {
  testComponentStability(<CardBody />)

  testRefForwarding(<CardBody />)

  testRootClassName(<CardBody />)

  it('should render with default props', () => {
    const { container } = renderWithNexUIProvider(<CardBody />)

    const cardBodyRoot = container.firstElementChild
    expect(cardBodyRoot).toHaveClass(cardBodyClasses.root)
  })
})
