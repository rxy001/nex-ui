import { describe, it, expect } from '@jest/globals'
import { mountTest, refTest, renderWithNexProvider } from '~/tests/shared'
import { Flex } from '../Flex'

describe('Flex', () => {
  mountTest(<Flex />)
  refTest(<Flex />)

  it('renders correctly', () => {
    const { container } = renderWithNexProvider(<Flex>Button</Flex>)
    expect(container.firstElementChild).toMatchSnapshot()
  })
})
