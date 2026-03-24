'use client'

import { nex } from '@nex-ui/styled'
import { CloseCircleFilled } from '@nex-ui/icons'
import {
  useDefaultProps,
  useSlot,
  useSlotClasses,
  useRecipeStyles,
} from '../utils'
import { badgeRecipe } from '../../theme/recipes'
import { useNexUI } from '../provider'
import { ButtonBase } from '../buttonBase'
import type { ElementType } from 'react'
import type { BadgeProps } from './types'

const slots = ['root', 'closeButton', 'startIcon', 'endIcon'] as const

export function Badge<RootComponent extends ElementType = 'span'>(
  inProps: BadgeProps<RootComponent>,
) {
  const { primaryThemeColor } = useNexUI()

  const props = useDefaultProps<BadgeProps>({
    name: 'Badge',
    props: inProps,
  })

  const {
    children,
    onClose,
    classNames,
    slotProps,
    startIcon,
    endIcon,
    disabled = false,
    closable = false,
    color = primaryThemeColor,
    size = 'md',
    variant = 'solid',
    radius = size,
    ...remainningProps
  } = props

  const ownerState: BadgeProps = {
    ...props,
    color,
    size,
    variant,
    radius,
    closable,
    disabled,
  }

  const slotClasses = useSlotClasses({
    name: 'Badge',
    slots,
    classNames,
  })

  const styles = useRecipeStyles({
    name: 'Badge',
    ownerState,
    recipe: badgeRecipe,
  })

  const [BadgeRoot, getBadgeRootProps] = useSlot({
    style: styles.root,
    component: nex.span,
    externalForwardedProps: remainningProps,
    classNames: slotClasses.root,
    dataAttrs: {
      color,
      size,
      variant,
      radius,
      closable,
      disabled,
    },
  })

  const [BadgeCloseButton, getBadgeCloseButtonProps] = useSlot({
    component: ButtonBase,
    style: styles.closeButton,
    externalSlotProps: slotProps?.closeButton,
    classNames: slotClasses.closeButton,
    additionalProps: {
      disabled,
      onClick: onClose,
    },
    ariaProps: {
      'aria-label': 'Close Badge',
    },
  })

  const [BadgeStartIcon, getBadgeStartIconProps] = useSlot({
    component: nex.span,
    style: styles.startIcon,
    externalSlotProps: slotProps?.startIcon,
    classNames: slotClasses.startIcon,
  })

  const [BadgeEndIcon, getBadgeEndIconProps] = useSlot({
    component: nex.span,
    style: styles.endIcon,
    externalSlotProps: slotProps?.endIcon,
    classNames: slotClasses.endIcon,
  })

  return (
    <BadgeRoot {...getBadgeRootProps()}>
      {startIcon && (
        <BadgeStartIcon {...getBadgeStartIconProps()}>
          {startIcon}
        </BadgeStartIcon>
      )}
      {children}
      {endIcon && (
        <BadgeEndIcon {...getBadgeEndIconProps()}>{endIcon}</BadgeEndIcon>
      )}
      {closable && (
        <BadgeCloseButton {...getBadgeCloseButtonProps()}>
          <CloseCircleFilled />
        </BadgeCloseButton>
      )}
    </BadgeRoot>
  )
}

Badge.displayName = 'Badge'
