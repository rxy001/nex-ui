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
  const { classes } = ownerState

  return useMemo(() => {
    const avatarGroupRoot = `${prefix}-avatar-group`

    const slots = {
      root: ['root'],
      surplus: ['surplus'],
    }

    return composeClasses(slots, getUtilityClass(avatarGroupRoot), classes)
  }, [classes, prefix])
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

  const childrenLength = isArray(children) ? children.length : 1

  if (childrenLength === 1 && (total === undefined || total < 2)) {
    return children
  }

  const lastAvatar = Math.min(childrenLength, max)

  const totalAvatars = total ?? childrenLength

  const extraAvatars = Math.max(0, totalAvatars - lastAvatar)

  return (
    <AvatarGroupRoot {...getAvatarGroupRootProps()}>
      <AvatarGroupProvider value={ctx}>
        {isArray(children) ? children.slice(0, lastAvatar) : children}
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
