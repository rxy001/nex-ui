'use client'

import { useState } from 'react'
import { focus } from '@nex-ui/utils'
import { defineRecipe } from '@nex-ui/system'
import { useSlot } from '../utils'
import { RovingFocusItem } from '../rovingFocus'
import { useMenuContentContext, useRootMenuContext } from './MenuContext'
import type { ElementType, KeyboardEvent, PointerEvent } from 'react'
import type { MenuItemProps } from './types'

const recipe = defineRecipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'default',
  },
})

const style = recipe()

export const MenuItem = <RootElement extends ElementType = 'div'>(
  props: MenuItemProps<RootElement>,
) => {
  const rootMenuCtx = useRootMenuContext()
  const menuContentCtx = useMenuContentContext()
  const { disabled, children, closeOnClick = true, ...remainingProps } = props
  const [focused, setFocused] = useState(false)

  const handleClick = () => {
    if (disabled) return
    if (closeOnClick) {
      rootMenuCtx.close()
    }
  }

  const handleFocus = () => {
    setFocused(true)
  }

  const handleBlur = () => {
    setFocused(false)
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (disabled) {
      menuContentCtx.onItemLeave(event)
      event.preventDefault()
      return
    }
    menuContentCtx.onItemEnter(event)
    focus(event.currentTarget)
  }

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    menuContentCtx.onItemLeave(event)
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
    elementType: 'div',
    externalForwardedProps: remainingProps,
    additionalProps: {
      onClick: handleClick,
      onFocus: handleFocus,
      onBlur: handleBlur,
      /**
       * If we used `mouseOver`/`mouseEnter` it would not re-focus when the mouse
       * wiggles. This is to match native menu implementation.
       */
      onPointerMove: handlePointerMove,
      onPointerLeave: handlePointerLeave,
      onKeyDown: handleKeyDown,
    },
    dataAttrs: {
      disabled,
      highlighted: focused,
    },
    ariaProps: {
      role: 'menuitem',
      'aria-disabled': disabled || undefined,
    },
  })

  return (
    <RovingFocusItem focusable={!disabled}>
      <MenuItemRoot {...getMenuItemRootProps()}>{children}</MenuItemRoot>
    </RovingFocusItem>
  )
}

MenuItem.displayName = 'MenuItem'
