'use client'

import { nex } from '@nex-ui/styled'
import { MenuItem } from '../menu'
import { dropdownItemRecipe } from '../../theme/recipes'
import {
  useDefaultProps,
  useSlot,
  useRecipeStyles,
  useSlotClasses,
} from '../utils'
import { useDropdownContentContext } from './DropdownContext'
import { useDropdownIndicator } from './useDropdownIndicator'
import type { ComponentType, ElementType, ReactNode } from 'react'
import type { Interpolation } from '@nex-ui/system'
import type { DropdownItemProps } from './types'

type DropdownItemImplProps = DropdownItemProps & {
  rootComponent?: ComponentType<{
    sx?: Interpolation
  }>
  indicator?: ReactNode
}

const slots = ['root', 'shortcut', 'content', 'startIcon', 'endIcon'] as const

export const DropdownItemImpl = (inProps: DropdownItemImplProps) => {
  const props = useDefaultProps<DropdownItemImplProps>({
    name: 'DropdownItem',
    props: inProps,
  })

  const { color: defaultColor, variant: defaultVariant } =
    useDropdownContentContext()

  const {
    children,
    shortcut,
    slotProps,
    classNames,
    startIcon,
    endIcon,
    indicator,
    rootComponent = MenuItem,
    color = defaultColor,
    variant = defaultVariant,
    ...remainingProps
  } = props

  const { hasIndicator } = useDropdownIndicator({
    trackIndicatorCount: false,
  })

  const ownerState = {
    ...props,
    color,
    variant,
    hasIndicator,
  }

  const styles = useRecipeStyles({
    name: 'DropdownItem',
    recipe: dropdownItemRecipe,
    ownerState,
  })

  const slotClasses = useSlotClasses({
    name: 'DropdownItem',
    classNames,
    slots,
  })

  const [DropdownItemRoot, getDropdownItemRootProps] = useSlot({
    component: rootComponent,
    style: styles.root,
    classNames: slotClasses.root,
    externalForwardedProps: remainingProps,
  })

  const [DropdownItemShortcut, getDropdownItemShortcutProps] = useSlot({
    component: nex.kbd,
    style: styles.shortcut,
    classNames: slotClasses.shortcut,
    externalSlotProps: slotProps?.shortcut,
  })

  const [DropdownItemContent, getDropdownItemContentProps] = useSlot({
    component: nex.span,
    style: styles.content,
    externalSlotProps: slotProps?.content,
    classNames: slotClasses.content,
  })

  const [DropdownItemStartIcon, getDropdownItemStartIconProps] = useSlot({
    component: nex.span,
    style: styles.startIcon,
    externalSlotProps: slotProps?.startIcon,
    classNames: slotClasses.startIcon,
  })

  const [DropdownItemEndIcon, getDropdownItemEndIconProps] = useSlot({
    component: nex.span,
    style: styles.endIcon,
    externalSlotProps: slotProps?.endIcon,
    classNames: slotClasses.endIcon,
  })

  return (
    <DropdownItemRoot {...getDropdownItemRootProps()}>
      {indicator}
      {startIcon && (
        <DropdownItemStartIcon {...getDropdownItemStartIconProps()}>
          {startIcon}
        </DropdownItemStartIcon>
      )}
      <DropdownItemContent {...getDropdownItemContentProps()}>
        {children}
      </DropdownItemContent>
      {shortcut && (
        <DropdownItemShortcut {...getDropdownItemShortcutProps()}>
          {shortcut}
        </DropdownItemShortcut>
      )}
      {endIcon && (
        <DropdownItemEndIcon {...getDropdownItemEndIconProps()}>
          {endIcon}
        </DropdownItemEndIcon>
      )}
    </DropdownItemRoot>
  )
}

DropdownItemImpl.displayName = 'DropdownItemImpl'

export const DropdownItem = <RootComponent extends ElementType = 'div'>(
  inProps: DropdownItemProps<RootComponent>,
) => {
  return (
    <DropdownItemImpl
      {...(inProps as DropdownItemProps)}
      rootComponent={MenuItem}
      indicator={null}
    />
  )
}

DropdownItem.displayName = 'DropdownItem'
