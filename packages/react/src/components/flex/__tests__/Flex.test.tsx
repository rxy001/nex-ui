import { mountTest, refTest, renderWithNexProvider } from '~/tests/shared'
import { Flex } from '../Flex'
import { flexClasses } from '../flexClasses'

describe('Flex', () => {
  mountTest(<Flex />)
  refTest(<Flex />)

  it('renders correctly', () => {
    const { container } = renderWithNexProvider(<Flex />)
    expect(container.firstElementChild).toMatchSnapshot()
  })

  it('should render with the root, direction classes but no others', () => {
    const { container } = renderWithNexProvider(<Flex />)

    const flex = container.firstElementChild

    expect(flex).toHaveClass(flexClasses.root)
  })
})
