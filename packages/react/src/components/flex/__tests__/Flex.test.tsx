import { createRef } from 'react'
import {
  testComponentStability,
  renderWithNexUIProvider,
  testRootClassName,
} from '~/tests/shared'
import { Flex } from '../index'
import { flexClasses } from '../flexClasses'

describe('Flex', () => {
  testComponentStability(<Flex />)

  testRootClassName(<Flex className='test-class' />, 'test-class')

  it('should render with default props', () => {
    const { container } = renderWithNexUIProvider(<Flex />)

    const flex = container.firstElementChild

    expect(flex).toHaveClass(flexClasses.root)
    expect(container.firstElementChild).toMatchSnapshot()
  })

  it("should forward ref to Flex's root element", () => {
    const ref = createRef<HTMLDivElement>()
    const { container } = renderWithNexUIProvider(<Flex ref={ref} />)
    expect(container.firstElementChild).toBe(ref.current)
  })

  it('should render inline flex when inline prop is true', () => {
    const { container } = renderWithNexUIProvider(<Flex inline />)

    expect(container.firstElementChild).toHaveStyleRule(
      'display',
      'inline-flex',
    )
  })

  it('should render flex with gap applied', () => {
    const { container } = renderWithNexUIProvider(<Flex gap='16px' />)

    expect(container.firstElementChild).toHaveStyleRule('gap', '16px')
  })

  it('should render flex with flex-direction applied', () => {
    const { container } = renderWithNexUIProvider(<Flex direction='column' />)

    expect(container.firstElementChild).toHaveStyleRule(
      'flex-direction',
      'column',
    )
  })

  it('should render flex with justify-content applied', () => {
    const { container } = renderWithNexUIProvider(<Flex justify='center' />)

    expect(container.firstElementChild).toHaveStyleRule(
      'justify-content',
      'center',
    )
  })

  it('should render flex with align-items applied', () => {
    const { container } = renderWithNexUIProvider(<Flex align='center' />)

    expect(container.firstElementChild).toHaveStyleRule('align-items', 'center')
  })

  it('should render flex with flex-wrap applied', () => {
    const { container } = renderWithNexUIProvider(<Flex wrap='wrap' />)

    expect(container.firstElementChild).toHaveStyleRule('flex-wrap', 'wrap')
  })
})
