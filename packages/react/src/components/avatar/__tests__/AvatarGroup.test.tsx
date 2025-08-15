import { createRef } from 'react'
import {
  testComponentStability,
  renderWithNexUIProvider,
  testRootClassName,
} from '~/tests/shared'
import { AvatarGroup, Avatar } from '../index'
import { avatarClasses, avatarGroupClasses } from '../classes'

describe('AvatarGroup', () => {
  testComponentStability(
    <AvatarGroup>
      <Avatar />
      <Avatar />
      <Avatar />
    </AvatarGroup>,
  )

  testRootClassName(
    <AvatarGroup className='test-class'>
      <Avatar />
      <Avatar />
    </AvatarGroup>,
    'test-class',
  )

  it('should render group when multiple avatars are passed', () => {
    const { container, rerender } = renderWithNexUIProvider(
      <AvatarGroup>
        <Avatar />
      </AvatarGroup>,
    )

    expect(container.firstElementChild).toHaveClass(avatarClasses.root)

    rerender(
      <AvatarGroup>
        <Avatar />
        <Avatar />
      </AvatarGroup>,
    )

    expect(container.firstElementChild).toHaveClass(avatarGroupClasses.root)
  })

  it("should forward ref to AvatarGroup's root element", () => {
    const ref = createRef<HTMLDivElement>()
    const { container } = renderWithNexUIProvider(
      <AvatarGroup ref={ref} data-testid='avatar-group'>
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarGroup>,
    )

    expect(container.firstElementChild).toBe(ref.current)
  })

  it('should forward classes to surplus slot', () => {
    const classes = {
      surplus: 'test-surplus-class',
    }

    const { getByTestId } = renderWithNexUIProvider(
      <AvatarGroup data-testid='avatar-group' classes={classes} max={2}>
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarGroup>,
    )

    const avatarGroupRoot = getByTestId('avatar-group')
    expect(avatarGroupRoot.lastElementChild).toHaveClass(classes.surplus)
  })

  it('should render `+N` when there are more than 4 avatars', () => {
    const { getByTestId } = renderWithNexUIProvider(
      <AvatarGroup data-testid='avatar-group' max={4}>
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarGroup>,
    )

    const avatarGroupRoot = getByTestId('avatar-group')
    expect(avatarGroupRoot.childNodes.length).toBe(5)
    expect(avatarGroupRoot.lastElementChild?.textContent).toBe('+4')
  })

  it('should render `+N` when total exceeds max children', () => {
    const { getByTestId, rerender, container } = renderWithNexUIProvider(
      <AvatarGroup data-testid='avatar-group' max={3} total={5}>
        <Avatar />
      </AvatarGroup>,
    )

    const avatarGroupRoot = getByTestId('avatar-group')
    expect(avatarGroupRoot.childNodes.length).toBe(2)
    expect(avatarGroupRoot.lastElementChild?.textContent).toBe('+4')

    rerender(
      <AvatarGroup max={3} total={10}>
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarGroup>,
    )

    const updatedRoot = container.firstElementChild
    expect(updatedRoot?.childNodes.length).toBe(4)
    expect(updatedRoot?.lastElementChild?.textContent).toBe('+7')
  })

  it('should render custom surplus content', () => {
    const { getByTestId } = renderWithNexUIProvider(
      <AvatarGroup
        max={5}
        data-testid='avatar-group'
        renderSurplus={() => <Avatar>More</Avatar>}
      >
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarGroup>,
    )

    const avatarGroupRoot = getByTestId('avatar-group')
    expect(avatarGroupRoot.lastElementChild?.textContent).toBe('More')
  })

  it('should customize spacing between avatars', () => {
    const { container } = renderWithNexUIProvider(
      <AvatarGroup spacing={10}>
        <Avatar />
        <Avatar />
      </AvatarGroup>,
    )

    expect(container.firstElementChild).toHaveStyle({
      '--avatar-group-spacing': '10px',
    })
  })

  it('avatar should extend appearance styles', () => {
    const { container } = renderWithNexUIProvider(
      <AvatarGroup size='lg' color='blue' outlined radius='full'>
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarGroup>,
    )

    const avatarRoot = container.firstElementChild?.firstElementChild
    expect(avatarRoot).toHaveClass(avatarClasses['size-lg'])
    expect(avatarRoot).toHaveClass(avatarClasses['color-blue'])
    expect(avatarRoot).toHaveClass(avatarClasses.outlined)
    expect(avatarRoot).toHaveClass(avatarClasses['radius-full'])
  })

  it('should forward slotProps to surplus slot', () => {
    const { container } = renderWithNexUIProvider(
      <AvatarGroup slotProps={{ surplus: { className: 'test-class' } }} max={2}>
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarGroup>,
    )

    const surplusAvatar = container.firstElementChild?.lastElementChild
    expect(surplusAvatar).toHaveClass('test-class')
  })
})
