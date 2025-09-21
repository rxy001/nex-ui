import {
  testComponentStability,
  renderWithNexUIProvider,
  testRefForwarding,
  testRootClassName,
  testVariantDataAttrs,
} from '~/tests/shared'
import { Divider } from '../index'
import { dividerClasses, dividerDataAttrs } from './constants'

describe('Divider', () => {
  testComponentStability(<Divider />)

  testRefForwarding(<Divider />)

  testRootClassName(<Divider />)

  testVariantDataAttrs(<Divider />, ['orientation', ['horizontal', 'vertical']])

  it('should render with default props', () => {
    const { container } = renderWithNexUIProvider(<Divider />)
    const dividerRoot = container.firstElementChild

    expect(dividerRoot).toHaveClass(dividerClasses.root)
    expect(dividerRoot).toHaveAttribute(
      ...dividerDataAttrs['orientation-horizontal'],
    )

    expect(dividerRoot).toMatchSnapshot()
  })
})
