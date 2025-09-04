import {
  testComponentStability,
  renderWithNexUIProvider,
  testRootClassName,
  testRefForwarding,
  testClassesForwarding,
  testSlotPropsForwarding,
} from '~/tests/shared'
import { AvatarGroup, Avatar } from '../index'
import { avatarClasses, avatarGroupClasses } from '../classes'

const slots = ['surplus'] as const

describe('AvatarGroup', () => {
  testComponentStability(
    <AvatarGroup>
      <Avatar />
      <Avatar />
    </AvatarGroup>,
  )

  testRootClassName(
    <AvatarGroup>
      <Avatar />
      <Avatar />
    </AvatarGroup>,
  )

  testRefForwarding(<AvatarGroup />)

  testClassesForwarding(
    <AvatarGroup max={2}>
      <Avatar />
      <Avatar />
      <Avatar />
      <Avatar />
    </AvatarGroup>,
    slots,
    {
      surplus: 'test-surplus-class',
    },
    avatarGroupClasses,
  )

  testSlotPropsForwarding(
    <AvatarGroup max={2}>
      <Avatar />
      <Avatar />
      <Avatar />
      <Avatar />
    </AvatarGroup>,
    slots,
    { surplus: { className: 'test-surplus-class' } },
    avatarGroupClasses,
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
})
