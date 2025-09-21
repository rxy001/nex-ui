import {
  testComponentStability,
  renderWithNexUIProvider,
  testRootClassName,
  testRefForwarding,
} from '~/tests/shared'
import { Flex } from '../index'
import { flexClasses } from './constants'

describe('Flex', () => {
  testComponentStability(<Flex />)

  testRootClassName(<Flex />)

  testRefForwarding(<Flex />)

  it('should render with default props', () => {
    const { container } = renderWithNexUIProvider(<Flex />)

    const flexRoot = container.firstElementChild

    expect(flexRoot).toHaveClass(flexClasses.root)
    expect(flexRoot).toMatchSnapshot()
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
