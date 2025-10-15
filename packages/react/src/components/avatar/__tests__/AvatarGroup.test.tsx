import {
  testComponentStability,
  renderWithNexUIProvider,
  testRootClassName,
  testRefForwarding,
  testClassNamesForwarding,
  testSlotPropsForwarding,
} from '~/tests/shared'
import { AvatarGroup, Avatar } from '../index'
import {
  avatarSlotClasses,
  avatarGroupSlotClasses,
  avatarDataAttrs,
} from './constants'

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

  testRefForwarding(
    <AvatarGroup>
      <Avatar />
      <Avatar />
    </AvatarGroup>,
  )

  testClassNamesForwarding(
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
    avatarGroupSlotClasses,
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
    avatarGroupSlotClasses,
  )

  it('should render with default props', () => {
    const { container, queryByTestId } = renderWithNexUIProvider(
      <AvatarGroup>
        <Avatar data-testid='avatar' />
        <Avatar />
        <Avatar />
      </AvatarGroup>,
    )

    const avatarGroupRoot = container.firstElementChild

    expect(avatarGroupRoot).toHaveClass(avatarGroupSlotClasses.root)
    expect(avatarGroupRoot).toMatchSnapshot()

    const avatarRoot = queryByTestId('avatar')

    expect(avatarRoot).toHaveAttribute(...avatarDataAttrs['inGroup-true'])
    expect(avatarRoot).toHaveAttribute(...avatarDataAttrs['size-md'])
    expect(avatarRoot).toHaveAttribute(...avatarDataAttrs['radius-md'])
    expect(avatarRoot).toHaveAttribute(...avatarDataAttrs['color-gray'])
    expect(avatarRoot).toHaveAttribute(...avatarDataAttrs['outlined-false'])
  })

  it('should render group when multiple avatars are passed', () => {
    const { container, rerender } = renderWithNexUIProvider(
      <AvatarGroup>
        <Avatar />
      </AvatarGroup>,
    )

    expect(container.firstElementChild).toHaveClass(avatarSlotClasses.root)

    rerender(
      <AvatarGroup>
        <Avatar />
        <Avatar />
      </AvatarGroup>,
    )

    expect(container.firstElementChild).toHaveClass(avatarGroupSlotClasses.root)
  })

  it('should render `+N` when there are more avatars than max limit', () => {
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

  it('should not render surplus when total is less than max', () => {
    const { container } = renderWithNexUIProvider(
      <AvatarGroup max={5} total={3}>
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarGroup>,
    )

    const avatarGroupRoot = container.firstElementChild
    expect(avatarGroupRoot?.childNodes.length).toBe(3)
    expect(avatarGroupRoot?.textContent).not.toContain('+')
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

    expect(avatarRoot).toHaveAttribute(...avatarDataAttrs['size-lg'])
    expect(avatarRoot).toHaveAttribute(...avatarDataAttrs['color-blue'])
    expect(avatarRoot).toHaveAttribute(...avatarDataAttrs['outlined-true'])
    expect(avatarRoot).toHaveAttribute(...avatarDataAttrs['radius-full'])
  })
})
