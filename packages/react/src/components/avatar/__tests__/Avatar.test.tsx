import { createRef } from 'react'
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
} from '~/tests/shared'
import { UserOutlined } from '@nex-ui/icons'
import { Avatar } from '../index'
import { avatarClasses } from '../avatarClasses'

afterAll(() => {
  restoreGlobalImage()
})

describe('Avatar', () => {
  testComponentStability(<Avatar />)

  testRootClassName(<Avatar className='test-class' />, 'test-class')

  testColorClasses(<Avatar>Avatar</Avatar>, avatarClasses)

  testSizeClasses(<Avatar>Avatar</Avatar>, avatarClasses)

  testVariantClasses(
    <Avatar>Avatar</Avatar>,
    ['radius', ['none', 'sm', 'md', 'lg', 'xl', 'full']],
    avatarClasses,
  )

  it('should render with default props', () => {
    const { container } = renderWithNexUIProvider(<Avatar>A</Avatar>)

    const avatar = container.firstElementChild
    expect(avatar).toHaveClass(avatarClasses.root)
    expect(avatar).toHaveClass(avatarClasses['size-md'])
    expect(avatar).toHaveClass(avatarClasses['radius-md'])
    expect(avatar).toHaveClass(avatarClasses['color-gray'])
    expect(avatar).not.toHaveClass(avatarClasses['color-green'])
    expect(avatar).not.toHaveClass(avatarClasses['color-cyan'])
    expect(avatar).not.toHaveClass(avatarClasses['color-orange'])
    expect(avatar).not.toHaveClass(avatarClasses['color-pink'])
    expect(avatar).not.toHaveClass(avatarClasses['color-purple'])
    expect(avatar).not.toHaveClass(avatarClasses['color-yellow'])
    expect(avatar).not.toHaveClass(avatarClasses['color-red'])
    expect(avatar).not.toHaveClass(avatarClasses['color-blue'])
    expect(avatar).not.toHaveClass(avatarClasses['size-sm'])
    expect(avatar).not.toHaveClass(avatarClasses['size-lg'])
    expect(avatar).not.toHaveClass(avatarClasses['radius-sm'])
    expect(avatar).not.toHaveClass(avatarClasses['radius-lg'])
    expect(avatar).not.toHaveClass(avatarClasses['radius-full'])
    expect(avatar).not.toHaveClass(avatarClasses.outlined)

    expect(avatar).toMatchSnapshot()
  })

  it("should forward ref to Avatar's root element", () => {
    const ref = createRef<HTMLDivElement>()
    const { container } = renderWithNexUIProvider(<Avatar ref={ref}>A</Avatar>)
    expect(container.firstElementChild).toBe(ref.current)
  })

  it('should add the outlined class to root element when outlined prop is true', () => {
    const { getByTestId } = renderWithNexUIProvider(
      <Avatar outlined data-testid='outlined'>
        Avatar
      </Avatar>,
    )
    expect(getByTestId('outlined')).toHaveClass(avatarClasses.outlined)
  })

  it('should forward classes to img slot', () => {
    mockGlobalImage('loaded')
    const imgClassName = 'test-img-class'
    const { container } = renderWithNexUIProvider(
      <Avatar
        src='/fake.png'
        classes={{
          img: imgClassName,
        }}
      />,
    )
    const avatar = container.firstElementChild
    expect(avatar?.firstElementChild).toHaveClass(imgClassName)
    restoreGlobalImage()
  })

  describe('Image Avatar', () => {
    afterEach(() => {
      restoreGlobalImage()
    })

    it('should forward slotProps to img slot', () => {
      mockGlobalImage('loaded')

      const { getByTestId } = renderWithNexUIProvider(
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
      const avatar = getByTestId('avatar')
      expect(avatar.querySelector(`.${avatarClasses.img}`)).toHaveClass(
        'test-img-class',
      )
    })

    it('should render an img when the image loads successfully', () => {
      mockGlobalImage('loaded')
      const { container, rerender } = renderWithNexUIProvider(
        <Avatar src='/fake.png' alt='Avatar' />,
      )
      const avatar = container.firstElementChild
      const img = avatar?.firstElementChild
      expect(avatar?.tagName).toBe('DIV')
      expect(img?.tagName).toBe('IMG')
      expect(img).toHaveAttribute('alt', 'Avatar')
      expect(img).toHaveAttribute('src', '/fake.png')
      rerender(<Avatar srcSet='/fake.png 1x, /fake@2x.png 2x' />)
      expect(img).toHaveAttribute('srcSet', '/fake.png 1x, /fake@2x.png 2x')
    })

    it('should render its children when the image fails to load', () => {
      mockGlobalImage('error')
      const { container } = renderWithNexUIProvider(
        <Avatar src='/fake.png' alt='Avatar' data-testid='avatar-children'>
          B
        </Avatar>,
      )
      const avatar = container.firstElementChild
      expect(avatar?.tagName).toBe('DIV')
      expect(avatar?.textContent).toBe('B')
    })

    it('should render the first letter of its alt when the image fails to load', () => {
      mockGlobalImage('error')
      const { container } = renderWithNexUIProvider(
        <Avatar src='/fake.png' alt='Avatar' data-testid='avatar-text' />,
      )
      const avatar = container.firstElementChild
      expect(avatar?.tagName).toBe('DIV')
      expect(avatar?.textContent).toBe('A')
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
      const avatar = container.firstElementChild
      expect(avatar?.tagName).toBe('DIV')
      expect(avatar?.firstChild?.textContent).toBe('O')
    })
  })

  describe('Icon Avatar', () => {
    it('should render a div containing an svg icon', () => {
      const { container } = renderWithNexUIProvider(
        <Avatar>
          <UserOutlined className='nui-icon' />
        </Avatar>,
      )
      const avatar = container.firstElementChild
      expect(avatar?.tagName).toBe('DIV')
      const userIcon = avatar?.firstElementChild
      expect(userIcon).toHaveClass('nui-icon')
    })
  })
})
