import {
  testComponentStability,
  renderWithNexUIProvider,
  mockGlobalImage,
  restoreGlobalImage,
  testRootClassName,
  flushMockedImages,
  testColorDataAttrs,
  testSizeDataAttrs,
  testVariantDataAttrs,
  testRefForwarding,
} from '~/tests/shared'
import { UserOutlined } from '@nex-ui/icons'
import { Avatar } from '../index'
import { avatarSlotClasses, avatarDataAttrs } from './constants'

afterAll(() => {
  restoreGlobalImage()
})

describe('Avatar', () => {
  testComponentStability(<Avatar />)

  testRootClassName(<Avatar />)

  testRefForwarding(<Avatar />)

  testColorDataAttrs(<Avatar>Avatar</Avatar>)

  testSizeDataAttrs(<Avatar>Avatar</Avatar>)

  testVariantDataAttrs(<Avatar>Avatar</Avatar>, [
    'radius',
    ['none', 'sm', 'md', 'lg', 'xl', 'full'],
  ])

  testVariantDataAttrs(<Avatar outlined>Avatar</Avatar>, [
    'outlined',
    [true, false],
  ])

  it('should render with default props', () => {
    const { container } = renderWithNexUIProvider(<Avatar>A</Avatar>)

    const avatarRoot = container.firstElementChild
    expect(avatarRoot).toHaveClass(avatarSlotClasses.root)
    expect(avatarRoot).toHaveAttribute(...avatarDataAttrs['inGroup-false'])
    expect(avatarRoot).toHaveAttribute(...avatarDataAttrs['size-md'])
    expect(avatarRoot).toHaveAttribute(...avatarDataAttrs['radius-md'])
    expect(avatarRoot).toHaveAttribute(...avatarDataAttrs['color-gray'])
    expect(avatarRoot).toHaveAttribute(...avatarDataAttrs['outlined-false'])

    expect(avatarRoot).toMatchSnapshot()
  })

  describe('Image Avatar', () => {
    afterEach(() => {
      restoreGlobalImage()
    })

    it('should forward classNames to img slot', () => {
      mockGlobalImage('loaded')
      const classNames = {
        img: 'test-img-class',
      }
      const { container } = renderWithNexUIProvider(
        <Avatar
          src='/fake.png'
          classNames={{
            img: classNames.img,
          }}
        />,
      )
      const avatarRoot = container.firstElementChild
      expect(avatarRoot?.firstElementChild).toHaveClass(classNames.img)
      restoreGlobalImage()
    })

    it('should forward slotProps to img slot', () => {
      mockGlobalImage('loaded')

      const slotProps = {
        img: {
          className: 'test-img-class',
        },
      }

      const { queryByClassName } = renderWithNexUIProvider(
        <Avatar data-testid='avatar' src='/fake.png' slotProps={slotProps}>
          Avatar
        </Avatar>,
      )
      expect(queryByClassName(avatarSlotClasses.img)).toHaveClass(
        slotProps.img.className,
      )
    })

    it('should render an img when the image loads successfully', () => {
      mockGlobalImage('loaded')
      const { container, rerender } = renderWithNexUIProvider(
        <Avatar src='/fake.png' alt='Avatar' />,
      )
      const avatarRoot = container.firstElementChild
      const avatarImg = avatarRoot?.firstElementChild
      expect(avatarRoot?.tagName).toBe('DIV')
      expect(avatarImg?.tagName).toBe('IMG')
      expect(avatarImg).toHaveAttribute('alt', 'Avatar')
      expect(avatarImg).toHaveAttribute('src', '/fake.png')

      rerender(<Avatar srcSet='/fake.png 1x, /fake@2x.png 2x' />)

      expect(avatarImg).toHaveAttribute(
        'srcSet',
        '/fake.png 1x, /fake@2x.png 2x',
      )
    })

    it('should render its children when the image fails to load', () => {
      mockGlobalImage('error')
      const { container } = renderWithNexUIProvider(
        <Avatar src='/fake.png' alt='Avatar' data-testid='avatar-children'>
          B
        </Avatar>,
      )
      expect(container.firstElementChild?.textContent).toBe('B')
    })

    it('should render the first letter of its alt when the image fails to load', () => {
      mockGlobalImage('error')
      const { container } = renderWithNexUIProvider(
        <Avatar src='/fake.png' alt='Avatar' data-testid='avatar-text' />,
      )
      expect(container.firstElementChild?.textContent).toBe('A')
    })

    it('should not update state if image is unmounted before load event', () => {
      mockGlobalImage('loading')

      const { unmount, container } = renderWithNexUIProvider(
        <Avatar src='/fake.png' alt='Avatar' />,
      )

      expect(container.firstElementChild?.textContent).toBe('A')

      unmount()

      flushMockedImages('loaded')

      expect(true).toBe(true)
    })

    it('should not update state if image is unmounted before error event', () => {
      mockGlobalImage('loading')

      const { unmount, container } = renderWithNexUIProvider(
        <Avatar src='/fake.png' alt='Avatar' />,
      )

      expect(container.firstElementChild?.textContent).toBe('A')

      unmount()

      flushMockedImages('error')

      expect(true).toBe(true)
    })
  })

  describe('Text Avatar', () => {
    it('should render a div containing a string', () => {
      const { container } = renderWithNexUIProvider(<Avatar>O</Avatar>)
      const avatarRoot = container.firstElementChild
      expect(avatarRoot?.tagName).toBe('DIV')
      expect(avatarRoot?.firstChild?.textContent).toBe('O')
    })
  })

  describe('Icon Avatar', () => {
    it('should render a div containing an svg icon', () => {
      const { container } = renderWithNexUIProvider(
        <Avatar>
          <UserOutlined className='nui-icon' />
        </Avatar>,
      )
      const avatarRoot = container.firstElementChild
      expect(avatarRoot?.tagName).toBe('DIV')
      const userIcon = avatarRoot?.firstElementChild
      expect(userIcon).toHaveClass('nui-icon')
    })
  })
})
