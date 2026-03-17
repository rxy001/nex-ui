'use client'

import { nex } from '@nex-ui/styled'
import { useMemo } from 'react'
import {
  useDefaultProps,
  useRecipeStyles,
  useSlot,
  useSlotClasses,
} from '../utils'
import { AvatarGroupProvider } from './AvatarGroupContext'
import { avatarGroupRecipe } from '../../theme/recipes'
import { Avatar } from './Avatar'
import type { ElementType } from 'react'
import type { AvatarGroupProps } from './types'
import type { AvatarGroupContextValue } from './AvatarGroupContext'

const slots = ['root', 'surplus'] as const

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
    disableAnimation = false,
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
    disableAnimation,
  }

  const slotClasses = useSlotClasses({
    name: 'AvatarGroup',
    slots,
    classNames,
  })

  const style = useRecipeStyles({
    ownerState,
    name: 'AvatarGroup',
    recipe: avatarGroupRecipe,
  })

  const [AvatarGroupRoot, getAvatarGroupRootProps] = useSlot({
    style,
    component: nex.div,
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
    component: Avatar,
    externalSlotProps: slotProps?.surplus,
    classNames: slotClasses.surplus,
  })

  const ctx = useMemo<AvatarGroupContextValue>(
    () => ({
      size,
      color,
      outlined,
      radius,
      disableAnimation,
    }),
    [color, outlined, radius, size, disableAnimation],
  )

  const childrenLength = Array.isArray(children) ? children.length : 1

  if (childrenLength === 1 && (total === undefined || total < 2)) {
    return children
  }

  const lastAvatar = Math.min(childrenLength, max)

  const totalAvatars = total ?? childrenLength

  const extraAvatars = Math.max(0, totalAvatars - lastAvatar)

  return (
    <AvatarGroupRoot {...getAvatarGroupRootProps()}>
      <AvatarGroupProvider value={ctx}>
        {Array.isArray(children) ? children.slice(0, lastAvatar) : children}
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
