import {
  testComponentStability,
  renderWithNexUIProvider,
  testRefForwarding,
  testVariantClasses,
  testRootClassName,
} from '~/tests/shared'
import { Divider } from '../index'
import { dividerClasses } from '../dividerClasses'

describe('Divider', () => {
  testComponentStability(<Divider />)

  testRefForwarding(<Divider />)

  testRootClassName(<Divider />)

  testVariantClasses(
    <Divider />,
    ['orientation', ['horizontal', 'vertical']],
    dividerClasses,
  )

  it('should render with default props', () => {
    const { container } = renderWithNexUIProvider(<Divider />)
    const dividerRoot = container.firstElementChild

    expect(dividerRoot).toHaveClass(dividerClasses.root)
    expect(dividerRoot).toHaveClass(dividerClasses['orientation-horizontal'])
    expect(dividerRoot).not.toHaveClass(dividerClasses['orientation-vertical'])

    expect(dividerRoot).toMatchSnapshot()
  })
})
