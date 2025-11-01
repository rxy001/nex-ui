import { CloseCircleFilled } from '@nex-ui/icons'
import { useDefaultProps, useSlot, useSlotClasses, useStyles } from '../utils'
import { badgeRecipe } from '../../theme/recipes'
import { useNexUI } from '../provider'
import { ButtonBase } from '../buttonBase'
import type { ElementType } from 'react'
import type { BadgeProps } from './types'

const slots = ['root', 'closeButton']

export const Badge = <RootComponent extends ElementType = 'span'>(
  inProps: BadgeProps<RootComponent>,
) => {
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
    disabled = false,
    closable = false,
    color = primaryThemeColor,
    size = 'md',
    variant = 'solid',
    radius = size,
    ...remainningProps
  } = props

  const ownerState = {
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

  const styles = useStyles({
    name: 'Badge',
    ownerState: ownerState,
    recipe: badgeRecipe,
  })

  const [BadgeRoot, getBadgeRootProps] = useSlot({
    style: styles.root,
    elementType: 'span',
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
    elementType: ButtonBase,
    style: styles.closeButton,
    shouldForwardComponent: false,
    externalSlotProps: slotProps?.closeButton,
    classNames: slotClasses.closeButton,
    additionalProps: {
      disabled,
      onClick: onClose,
      'aria-label': 'Close Badge',
    },
  })

  return (
    <BadgeRoot {...getBadgeRootProps()}>
      {children}
      {closable && (
        <BadgeCloseButton {...getBadgeCloseButtonProps()}>
          <CloseCircleFilled />
        </BadgeCloseButton>
      )}
    </BadgeRoot>
  )
}

Badge.displayName = 'Badge'
