import {
  testComponentStability,
  renderWithNexUIProvider,
  mockGlobalImage,
  restoreGlobalImage,
  testRootClassName,
  flushMockedImages,
  testColorClasses,
  testSizeClasses,
  testVariantClasses,
  testRefForwarding,
} from '~/tests/shared'
import { UserOutlined } from '@nex-ui/icons'
import { Avatar } from '../index'
import { avatarClasses } from '../classes'

afterAll(() => {
  restoreGlobalImage()
})

describe('Avatar', () => {
  testComponentStability(<Avatar />)

  testRootClassName(<Avatar />)

  testColorClasses(<Avatar>Avatar</Avatar>, avatarClasses)

  testSizeClasses(<Avatar>Avatar</Avatar>, avatarClasses)

  testVariantClasses(
    <Avatar>Avatar</Avatar>,
    ['radius', ['none', 'sm', 'md', 'lg', 'xl', 'full']],
    avatarClasses,
  )

  testRefForwarding(<Avatar />)

  testVariantClasses(
    <Avatar outlined>Avatar</Avatar>,
    ['outlined', [true]],
    avatarClasses,
  )

  it('should render with default props', () => {
    const { container } = renderWithNexUIProvider(<Avatar>A</Avatar>)

    const avatarRoot = container.firstElementChild
    expect(avatarRoot).toHaveClass(avatarClasses.root)
    expect(avatarRoot).toHaveClass(avatarClasses['size-md'])
    expect(avatarRoot).toHaveClass(avatarClasses['radius-md'])
    expect(avatarRoot).toHaveClass(avatarClasses['color-gray'])
    expect(avatarRoot).not.toHaveClass(avatarClasses['color-green'])
    expect(avatarRoot).not.toHaveClass(avatarClasses['color-cyan'])
    expect(avatarRoot).not.toHaveClass(avatarClasses['color-orange'])
    expect(avatarRoot).not.toHaveClass(avatarClasses['color-pink'])
    expect(avatarRoot).not.toHaveClass(avatarClasses['color-purple'])
    expect(avatarRoot).not.toHaveClass(avatarClasses['color-yellow'])
    expect(avatarRoot).not.toHaveClass(avatarClasses['color-red'])
    expect(avatarRoot).not.toHaveClass(avatarClasses['color-blue'])
    expect(avatarRoot).not.toHaveClass(avatarClasses['size-sm'])
    expect(avatarRoot).not.toHaveClass(avatarClasses['size-lg'])
    expect(avatarRoot).not.toHaveClass(avatarClasses['radius-sm'])
    expect(avatarRoot).not.toHaveClass(avatarClasses['radius-lg'])
    expect(avatarRoot).not.toHaveClass(avatarClasses['radius-full'])
    expect(avatarRoot).not.toHaveClass(avatarClasses.outlined)

    expect(avatarRoot).toMatchSnapshot()
  })

  describe('Image Avatar', () => {
    afterEach(() => {
      restoreGlobalImage()
    })

    it('should forward classes to img slot', () => {
      mockGlobalImage('loaded')
      const classes = {
        img: 'test-img-class',
      }
      const { container } = renderWithNexUIProvider(
        <Avatar
          src='/fake.png'
          classes={{
            img: classes.img,
          }}
        />,
      )
      const avatarRoot = container.firstElementChild
      expect(avatarRoot?.firstElementChild).toHaveClass(classes.img)
      restoreGlobalImage()
    })

    it('should forward slotProps to img slot', () => {
      mockGlobalImage('loaded')

      const { queryByClassName } = renderWithNexUIProvider(
        <Avatar
          data-testid='avatar'
          src='/fake.png'
          slotProps={{
            img: {
              className: 'test-img-class',
            },
          }}
        >
          Avatar
        </Avatar>,
      )
      expect(queryByClassName(avatarClasses.img)).toHaveClass('test-img-class')
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
