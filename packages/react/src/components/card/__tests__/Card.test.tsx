import { createRef } from 'react'
import {
  testComponentStability,
  renderWithNexUIProvider,
  testVariantClasses,
  testRefForwarding,
} from '~/tests/shared'
import { cardClasses } from '../classes'
import { Card } from '../index'

describe('Card', () => {
  testComponentStability(<Card />)
  testVariantClasses(
    <Card />,
    ['shadow', ['xs', 'sm', 'md', 'lg', 'xl']],
    cardClasses,
  )
  testVariantClasses(
    <Card />,
    ['radius', ['none', 'sm', 'md', 'lg']],
    cardClasses,
  )
  testRefForwarding(Card)

  it('should render with default props', () => {
    const { container } = renderWithNexUIProvider(<Card />)
    const card = container.firstElementChild

    expect(card).toHaveClass(cardClasses.root)
    expect(card).toHaveClass(cardClasses['radius-md'])
    expect(card).toHaveClass(cardClasses['shadow-md'])

    expect(card).not.toHaveClass(cardClasses.blurred)
    expect(card).not.toHaveClass(cardClasses.hoverable)
    expect(card).not.toHaveClass(cardClasses['radius-none'])
    expect(card).not.toHaveClass(cardClasses['radius-sm'])
    expect(card).not.toHaveClass(cardClasses['radius-lg'])
    expect(card).not.toHaveClass(cardClasses['shadow-xs'])
    expect(card).not.toHaveClass(cardClasses['shadow-sm'])
    expect(card).not.toHaveClass(cardClasses['shadow-lg'])
    expect(card).not.toHaveClass(cardClasses['shadow-xl'])
    expect(card).toMatchSnapshot()
  })

  it('should forward ref to root element', () => {
    const ref = createRef<HTMLDivElement>()

    const { container } = renderWithNexUIProvider(<Card ref={ref} />)

    expect(ref.current).toBe(container.firstElementChild)
  })

  it('should add the appropriate blurred class to root element based on blurred prop', () => {
    const { container } = renderWithNexUIProvider(<Card blurred />)

    expect(container.firstElementChild).toHaveClass(cardClasses.blurred)
  })

  it('should add the appropriate hoverable class to root element based on hoverable prop', () => {
    const { container } = renderWithNexUIProvider(<Card hoverable />)

    expect(container.firstElementChild).toHaveClass(cardClasses.hoverable)
  })
})
