import { createRef } from 'react'
import {
  mountTest,
  renderWithNexUIProvider,
  mockGlobalImage,
  restoreGlobalImage,
  rootClassNameTest,
  flushMockedImages,
} from '~/tests/shared'
import { UserOutlined } from '@nex-ui/icons'
import { Avatar } from '../index'
import { avatarClasses } from '../avatarClasses'

afterAll(() => {
  restoreGlobalImage()
})

describe('Avatar', () => {
  mountTest(<Avatar />)

  rootClassNameTest(<Avatar className='test-class' />, 'test-class')

  it('renders correctly', () => {
    const { container } = renderWithNexUIProvider(<Avatar>A</Avatar>)
    expect(container.firstElementChild).toMatchSnapshot()
  })

  it("should forward ref to Avatar's root element", () => {
    const ref = createRef<HTMLDivElement>()
    const { container } = renderWithNexUIProvider(<Avatar ref={ref}>A</Avatar>)
    expect(container.firstElementChild).toBe(ref.current)
  })

  it('should render with the root, variant-filled, size-md, radius-md, and color-blue classes but no others', () => {
    const { container } = renderWithNexUIProvider(<Avatar>Avatar</Avatar>)
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
  })

  it('should add the appropriate color class to root element based on color prop', () => {
    const { getByTestId } = renderWithNexUIProvider(
      <>
        <Avatar color='red' data-testid='color-red'>
          Avatar
        </Avatar>
        <Avatar color='blue' data-testid='color-blue'>
          Avatar
        </Avatar>
        <Avatar color='cyan' data-testid='color-cyan'>
          Avatar
        </Avatar>
        <Avatar color='orange' data-testid='color-orange'>
          Avatar
        </Avatar>
        <Avatar color='pink' data-testid='color-pink'>
          Avatar
        </Avatar>
        <Avatar color='purple' data-testid='color-purple'>
          Avatar
        </Avatar>
        <Avatar color='gray' data-testid='color-gray'>
          Avatar
        </Avatar>
        <Avatar color='yellow' data-testid='color-yellow'>
          Avatar
        </Avatar>
        <Avatar color='green' data-testid='color-green'>
          Avatar
        </Avatar>
      </>,
    )
    expect(getByTestId('color-red')).toHaveClass(avatarClasses['color-red'])
    expect(getByTestId('color-blue')).toHaveClass(avatarClasses['color-blue'])
    expect(getByTestId('color-cyan')).toHaveClass(avatarClasses['color-cyan'])
    expect(getByTestId('color-orange')).toHaveClass(
      avatarClasses['color-orange'],
    )
    expect(getByTestId('color-pink')).toHaveClass(avatarClasses['color-pink'])
    expect(getByTestId('color-purple')).toHaveClass(
      avatarClasses['color-purple'],
    )
    expect(getByTestId('color-green')).toHaveClass(avatarClasses['color-green'])
    expect(getByTestId('color-yellow')).toHaveClass(
      avatarClasses['color-yellow'],
    )
    expect(getByTestId('color-green')).toHaveClass(avatarClasses['color-green'])
  })

  it('should add the appropriate size class to root element based on size prop', () => {
    const { getByTestId } = renderWithNexUIProvider(
      <>
        <Avatar size='sm' data-testid='size-sm'>
          Avatar
        </Avatar>
        <Avatar size='md' data-testid='size-md'>
          Avatar
        </Avatar>
        <Avatar size='lg' data-testid='size-lg'>
          Avatar
        </Avatar>
      </>,
    )
    expect(getByTestId('size-sm')).toHaveClass(avatarClasses['size-sm'])
    expect(getByTestId('size-md')).toHaveClass(avatarClasses['size-md'])
    expect(getByTestId('size-lg')).toHaveClass(avatarClasses['size-lg'])
  })

  it('should add the appropriate radius class to root element based on radius prop', () => {
    const { getByTestId } = renderWithNexUIProvider(
      <>
        <Avatar radius='sm' data-testid='radius-sm'>
          Avatar
        </Avatar>
        <Avatar radius='md' data-testid='radius-md'>
          Avatar
        </Avatar>
        <Avatar radius='lg' data-testid='radius-lg'>
          Avatar
        </Avatar>
        <Avatar radius='full' data-testid='radius-full'>
          Avatar
        </Avatar>
      </>,
    )
    expect(getByTestId('radius-sm')).toHaveClass(avatarClasses['radius-sm'])
    expect(getByTestId('radius-md')).toHaveClass(avatarClasses['radius-md'])
    expect(getByTestId('radius-lg')).toHaveClass(avatarClasses['radius-lg'])
    expect(getByTestId('radius-full')).toHaveClass(avatarClasses['radius-full'])
  })

  it('should add the outlined class to root element when outlined prop is true', () => {
    const { getByTestId } = renderWithNexUIProvider(
      <Avatar outlined data-testid='outlined'>
        Avatar
      </Avatar>,
    )
    expect(getByTestId('outlined')).toHaveClass(avatarClasses.outlined)
  })

  it('should forward classes to img slots', () => {
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

  it('should forward slotProps to img slots', () => {
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

  describe('Image Avatar', () => {
    afterEach(() => {
      restoreGlobalImage()
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
