import {
  testComponentStability,
  renderWithNexUIProvider,
  testVariantDataAttrs,
  testRefForwarding,
  testRootClassName,
} from '~/tests/shared'
import { cardClasses } from './classes'
import { Card } from '../index'

describe('Card', () => {
  testComponentStability(<Card />)

  testVariantDataAttrs(<Card />, ['shadow', ['xs', 'sm', 'md', 'lg', 'xl']])

  testVariantDataAttrs(<Card />, ['radius', ['none', 'sm', 'md', 'lg']])

  testVariantDataAttrs(<Card />, ['blurred', [true, false]])

  testVariantDataAttrs(<Card />, ['hoverable', [true, false]])

  testRefForwarding(<Card />)

  testRootClassName(<Card />)

  it('should render with default props', () => {
    const { container } = renderWithNexUIProvider(<Card />)
    const card = container.firstElementChild

    expect(card).toHaveClass(cardClasses.root)
    expect(card).toHaveAttribute('data-shadow', 'md')
    expect(card).toHaveAttribute('data-radius', 'md')
    expect(card).toHaveAttribute('data-hoverable', 'false')
    expect(card).toHaveAttribute('data-blurred', 'false')

    expect(card).toMatchSnapshot()
  })
})
