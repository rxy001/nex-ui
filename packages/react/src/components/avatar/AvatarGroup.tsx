import { useMemo } from 'react'
import { isArray } from '@nex-ui/utils'
import {
  useDefaultProps,
  useStyles,
  composeClasses,
  getUtilityClass,
  useSlot,
} from '../utils'
import { AvatarGroupProvider } from './AvatarGroupContext'
import { avatarGroupRecipe } from '../../theme/recipes'
import { Avatar } from './Avatar'
import { useNexUI } from '../provider'
import type { ElementType } from 'react'
import type { AvatarGroupOwnerState, AvatarGroupProps } from './types'

const useSlotClasses = (ownerState: AvatarGroupOwnerState) => {
  const { prefix } = useNexUI()

  const avatarGroupRoot = `${prefix}-avatar-group`

  const { color, size, radius, outlined, classes } = ownerState

  const slots = {
    root: [
      'root',
      `radius-${radius}`,
      `size-${size}`,
      `color-${color}`,
      outlined && 'outlined',
    ],
    surplus: ['surplus'],
  }

  const composedClasses = composeClasses(
    slots,
    getUtilityClass(avatarGroupRoot),
    classes,
  )

  return composedClasses
}

export const AvatarGroup = <RootElement extends ElementType = 'div'>(
  inProps: AvatarGroupProps<RootElement>,
) => {
  const props = useDefaultProps<AvatarGroupProps>({
    name: 'AvatarGroup',
    props: inProps,
  })

  const {
    children,
    total,
    slotProps,
    spacing,
    renderSurplus,
    size = 'md',
    color = 'gray',
    outlined = false,
    radius = size,
    max: maxProp = 5,
    ...remainingProps
  } = props

  const max = Math.max(1, maxProp)

  const ownerState: AvatarGroupOwnerState = {
    ...props,
    size,
    color,
    outlined,
    radius,
    max,
  }

  const classes = useSlotClasses(ownerState)

  const style = useStyles({
    ownerState,
    name: 'AvatarGroup',
    recipe: avatarGroupRecipe,
  })

  const [AvatarGroupRoot, getAvatarGroupRootProps] = useSlot({
    style,
    ownerState,
    elementType: 'div',
    externalForwardedProps: remainingProps,
    classNames: classes.root,
    additionalProps: {
      style: {
        [`--avatar-group-spacing` as string]:
          spacing !== undefined ? `${spacing}px` : undefined,
      },
    },
  })

  const [AvatarSurplus, getAvatarSurplusProps] = useSlot({
    ownerState,
    elementType: Avatar,
    externalSlotProps: slotProps?.surplus,
    classNames: classes.surplus,
    shouldForwardComponent: false,
  })

  const ctx = useMemo(
    () => ({
      size,
      color,
      outlined,
      radius,
    }),
    [color, outlined, radius, size],
  )

  if (!isArray(children)) {
    return children
  }

  const lastAvatar = Math.min(children.length, max)

  const totalAvatars = total ?? children.length

  const extraAvatars = Math.max(0, totalAvatars - lastAvatar)

  return (
    <AvatarGroupRoot {...getAvatarGroupRootProps()}>
      <AvatarGroupProvider value={ctx}>
        {children.slice(0, lastAvatar)}
        {!!extraAvatars &&
          (renderSurplus ? (
            renderSurplus(extraAvatars)
          ) : (
            <AvatarSurplus {...getAvatarSurplusProps()}>
              +{extraAvatars}
            </AvatarSurplus>
          ))}
      </AvatarGroupProvider>
    </AvatarGroupRoot>
  )
}

AvatarGroup.displayName = 'AvatarGroup'
