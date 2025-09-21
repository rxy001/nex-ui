import {
  testComponentStability,
  renderWithNexUIProvider,
  testVariantDataAttrs,
  testRefForwarding,
  testRootClassName,
} from '~/tests/shared'
import { cardClasses, cardDataAttrs } from './constants'
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
    expect(card).toHaveAttribute(...cardDataAttrs['shadow-md'])
    expect(card).toHaveAttribute(...cardDataAttrs['radius-md'])
    expect(card).toHaveAttribute(...cardDataAttrs['hoverable-false'])
    expect(card).toHaveAttribute(...cardDataAttrs['blurred-false'])

    expect(card).toMatchSnapshot()
  })
})
