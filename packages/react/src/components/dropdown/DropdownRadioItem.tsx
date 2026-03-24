'use client'

import { nex } from '@nex-ui/styled'
import { MenuRadioItem, MenuItemIndicator } from '../menu'
import { dropdownRadioItemRecipe } from '../../theme/recipes'
import {
  useDefaultProps,
  useSlot,
  useRecipeStyles,
  useSlotClasses,
} from '../utils'
import { DropdownItemImpl } from './DropdownItem'
import { useDropdownIndicator } from './useDropdownIndicator'
import type { ElementType } from 'react'
import type { DropdownRadioItemProps } from './types'

const slots = ['root', 'indicator'] as const

export function DropdownRadioItem<RootComponent extends ElementType = 'div'>(
  inProps: DropdownRadioItemProps<RootComponent>,
) {
  const props = useDefaultProps<DropdownRadioItemProps>({
    name: 'DropdownRadioItem',
    props: inProps,
  })

  const { children, classNames, slotProps, indicator, ...remainingProps } =
    props

  const styles = useRecipeStyles({
    name: 'DropdownRadioItem',
    recipe: dropdownRadioItemRecipe,
    ownerState: props,
  })

  const slotClasses = useSlotClasses({
    name: 'DropdownRadioItem',
    slots,
    classNames,
  })

  const [DropdownRadioItemIndicator, getDropdownRadioItemIndicatorProps] =
    useSlot({
      component: nex.span,
      style: styles.indicator,
      externalForwardedProps: slotProps?.indicator,
      classNames: slotClasses.indicator,
    })

  const [DropdownRadioItemRoot, getDropdownRadioItemProps] = useSlot({
    component: DropdownItemImpl,
    style: styles.root,
    externalForwardedProps: remainingProps,
    classNames: slotClasses.root,
    additionalProps: {
      slotProps: {
        shortcut: slotProps?.shortcut,
        content: slotProps?.content,
        startIcon: slotProps?.startIcon,
        endIcon: slotProps?.endIcon,
      },
      classNames: {
        shortcut: classNames?.shortcut,
        content: classNames?.content,
        startIcon: classNames?.startIcon,
        endIcon: classNames?.endIcon,
      },
      rootComponent: MenuRadioItem,
      indicator: (
        <MenuItemIndicator>
          <DropdownRadioItemIndicator {...getDropdownRadioItemIndicatorProps()}>
            {indicator ?? <RadioIcon />}
          </DropdownRadioItemIndicator>
        </MenuItemIndicator>
      ),
    },
  })

  useDropdownIndicator()

  return (
    <DropdownRadioItemRoot {...getDropdownRadioItemProps()}>
      {children}
    </DropdownRadioItemRoot>
  )
}

DropdownRadioItem.displayName = 'DropdownRadioItem'

function RadioIcon() {
  return (
    <svg
      viewBox='0 0 24 24'
      width='1em'
      height='1em'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='12'
        cy='12'
        r='5'
        fill='currentColor'
        style={{ transformOrigin: 'center' }}
      />
    </svg>
  )
}

RadioIcon.displayName = 'RadioIcon'
