'use client'

import { nex } from '@nex-ui/styled'
import { useRef } from 'react'
import { defineRecipe } from '@nex-ui/system'
import { useSlot } from '../utils'
import { useMenuContentContext, useRootMenuContext } from './MenuContext'
import type { KeyboardEvent, MouseEvent } from 'react'
import type { MenuItemProps } from './types'

const recipe = defineRecipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'default',
    outline: 'none',
    userSelect: 'none',
    whiteSpace: 'nowrap',
  },
})

const style = recipe()

export function MenuItem(props: MenuItemProps) {
  const rootMenuCtx = useRootMenuContext()
  const menuContentCtx = useMenuContentContext()
  const {
    disabled,
    children,
    onSelect,
    closeOnSelect = true,
    ...remainingProps
  } = props
  const ref = useRef<HTMLDivElement>(null)

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled) return
    onSelect?.(e)
    if (closeOnSelect) {
      rootMenuCtx.close()
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.currentTarget.click()
      event.preventDefault()
    }
  }

  const [MenuItemRoot, getMenuItemRootProps] = useSlot({
    style,
    component: nex.div,
    externalForwardedProps: remainingProps,
    additionalProps: {
      ref,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      onPointerMove: menuContentCtx.onItemEnter,
      onPointerLeave: menuContentCtx.onItemLeave,
    },
    dataAttrs: {
      disabled,
    },
    ariaProps: {
      role: 'menuitem',
      'aria-disabled': disabled || undefined,
    },
  })

  return <MenuItemRoot {...getMenuItemRootProps()}>{children}</MenuItemRoot>
}

MenuItem.displayName = 'MenuItem'
