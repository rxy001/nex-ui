'use client'

import { useMemo } from 'react'
import { isArray } from '@nex-ui/utils'
import { useDefaultProps, useStyles, useSlot, useSlotClasses } from '../utils'
import { AvatarGroupProvider } from './AvatarGroupContext'
import { avatarGroupRecipe } from '../../theme/recipes'
import { Avatar } from './Avatar'
import type { ElementType } from 'react'
import type { AvatarGroupProps } from './types'

const slots = ['root', 'surplus']

export const AvatarGroup = <RootComponent extends ElementType = 'div'>(
  inProps: AvatarGroupProps<RootComponent>,
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
    classNames,
    size = 'md',
    color = 'gray',
    outlined = false,
    radius = size,
    max: maxProp = 5,
    ...remainingProps
  } = props

  const max = Math.max(1, maxProp)

  const ownerState: AvatarGroupProps = {
    ...props,
    size,
    color,
    outlined,
    radius,
    max,
  }

  const slotClasses = useSlotClasses({
    name: 'AvatarGroup',
    slots,
    classNames,
  })

  const style = useStyles({
    ownerState,
    name: 'AvatarGroup',
    recipe: avatarGroupRecipe,
  })

  const [AvatarGroupRoot, getAvatarGroupRootProps] = useSlot({
    style,
    elementType: 'div',
    externalForwardedProps: remainingProps,
    classNames: slotClasses.root,
    additionalProps: {
      style: {
        [`--avatar-group-spacing` as string]:
          spacing !== undefined ? `${spacing}px` : undefined,
      },
    },
  })

  const [AvatarSurplus, getAvatarSurplusProps] = useSlot({
    elementType: Avatar,
    externalSlotProps: slotProps?.surplus,
    classNames: slotClasses.surplus,
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
