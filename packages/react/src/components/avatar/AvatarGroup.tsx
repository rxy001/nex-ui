import { useMemo } from 'react'
import { isArray } from '@nex-ui/utils'
import { nex } from '@nex-ui/styled'
import type { ElementType } from 'react'
import {
  useDefaultProps,
  useSlotProps,
  useStyles,
  composeClasses,
  getUtilityClass,
} from '../utils'
import { AvatarGroupProvider } from './AvatarGroupContext'
import { avatarGroupRecipe } from '../../theme/recipes'
import { Avatar } from './Avatar'
import { useNexUI } from '../provider'
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
    ref,
    renderSurplus,
    as = 'div',
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
    as,
    max,
  }

  const classes = useSlotClasses(ownerState)

  const styles = useStyles({
    name: 'AvatarGroup',
    ownerState,
    recipe: avatarGroupRecipe,
  })

  const rootProps = useSlotProps({
    ownerState,
    externalForwardedProps: remainingProps,
    sx: styles,
    classNames: classes.root,
    additionalProps: {
      ref,
      as,
      style: {
        [`--avatar-group-spacing`]:
          spacing !== undefined ? `${spacing}px` : undefined,
      },
    },
  })

  const surplusProps = useSlotProps({
    ownerState,
    externalSlotProps: slotProps?.surplus,
    classNames: classes.surplus,
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

  const extraElement = renderSurplus ? (
    renderSurplus(extraAvatars)
  ) : (
    <Avatar {...surplusProps}>+{extraAvatars}</Avatar>
  )

  return (
    <nex.div {...rootProps}>
      <AvatarGroupProvider value={ctx}>
        {children.slice(0, lastAvatar)}
        {!!extraAvatars && extraElement}
      </AvatarGroupProvider>
    </nex.div>
  )
}
