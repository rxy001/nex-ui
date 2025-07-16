import { createRef } from 'react'
import { mountTest, renderWithNexUIProvider } from '~/tests/shared'
import { Divider } from '../index'
import { dividerClasses } from '../dividerClasses'

describe('Divider', () => {
  mountTest(<Divider />)

  it('renders correctly', () => {
    const { container } = renderWithNexUIProvider(<Divider />)
    expect(container.firstElementChild).toMatchSnapshot()
  })

  it('should forward ref to root element', () => {
    const ref = createRef<HTMLHRElement>()
    const { container } = renderWithNexUIProvider(<Divider ref={ref} />)
    expect(container.firstElementChild).toBe(ref.current)
  })

  it('should render with the root, orientation-horizontal classes but no others', () => {
    const { container } = renderWithNexUIProvider(<Divider />)

    const divider = container.firstElementChild

    expect(divider).toHaveClass(dividerClasses.root)
    expect(divider).toHaveClass(dividerClasses['orientation-horizontal'])
  })

  it('should add the appropriate orientation class to root element based on orientation prop', () => {
    const { getByTestId } = renderWithNexUIProvider(
      <>
        <Divider orientation='vertical' data-testid='orientation-vertical' />
        <Divider
          orientation='horizontal'
          data-testid='orientation-horizontal'
        />
      </>,
    )

    expect(getByTestId('orientation-horizontal')).toHaveClass(
      dividerClasses['orientation-horizontal'],
    )
    expect(getByTestId('orientation-vertical')).toHaveClass(
      dividerClasses['orientation-vertical'],
    )
  })
})
