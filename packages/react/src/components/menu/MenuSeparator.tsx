'use client'

import { defineRecipe } from '@nex-ui/system'
import { useSlot } from '../utils'
import type { ElementType } from 'react'
import type { MenuSeparatorProps } from './types'

const recipe = defineRecipe({
  base: {
    border: 'none',
    my: '1.5',
    w: 'full',
    borderBottom: '1px solid {colors.gray.highlight}',
  },
})

const style = recipe()

export const MenuSeparator = <RootComponent extends ElementType = 'hr'>(
  props: MenuSeparatorProps<RootComponent>,
) => {
  const [MenuSeparatorRoot, getMenuSeparatorRootProps] = useSlot({
    style,
    elementType: 'hr',
    externalForwardedProps: props,
    ariaProps: {
      role: 'separator',
    },
  })

  return <MenuSeparatorRoot {...getMenuSeparatorRootProps()} />
}

MenuSeparator.displayName = 'MenuSeparator'
