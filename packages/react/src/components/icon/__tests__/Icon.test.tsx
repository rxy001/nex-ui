import { createRef, forwardRef } from 'react'
import {
  testComponentStability,
  renderWithNexUIProvider,
  testSizeClasses,
} from '~/tests/shared'
import { Icon } from '../Icon'
import { iconClasses } from '../iconClasses'

const HeartSvg = forwardRef<SVGSVGElement>((props, ref) => (
  <svg
    {...props}
    ref={ref}
    width='1em'
    height='1em'
    fill='currentColor'
    viewBox='0 0 1024 1024'
  >
    <title>heart icon</title>
    <path d='M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z' />
  </svg>
))

HeartSvg.displayName = 'HeartSvg'

describe('Icon', () => {
  testComponentStability(<Icon as={HeartSvg} />)

  testSizeClasses(<Icon as={HeartSvg} />, iconClasses)

  it('should forward ref to the SVG element', () => {
    const ref = createRef<SVGSVGElement>()

    const { container } = renderWithNexUIProvider(
      <Icon as={HeartSvg} ref={ref} />,
    )
    expect(container.firstElementChild).toBe(ref.current)
  })

  it('should add the spin class to root element when spin=true', () => {
    const { container } = renderWithNexUIProvider(<Icon as={HeartSvg} spin />)

    expect(container.firstElementChild).toHaveClass(iconClasses.spin)
  })

  it('should render correctly', () => {
    const { container } = renderWithNexUIProvider(<Icon as={HeartSvg} />)
    expect(container.firstElementChild).toMatchSnapshot()
  })

  it('should warn when `as` prop is not provided', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()

    renderWithNexUIProvider(<Icon />)

    expect(consoleSpy).toHaveBeenCalled()
    consoleSpy.mockRestore()
  })
})
