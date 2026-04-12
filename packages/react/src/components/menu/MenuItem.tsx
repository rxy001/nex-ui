'use client'

import { nex } from '@nex-ui/styled'
import { useEffect, useRef, useState } from 'react'
import { focus } from '@nex-ui/utils'
import { defineRecipe } from '@nex-ui/system'
import { useSlot } from '../utils'
import { RovingFocusItem } from '../rovingFocus'
import { useMenuContentContext, useRootMenuContext } from './MenuContext'
import { CollectionItem } from './Collection'
import type { KeyboardEvent, PointerEvent, MouseEvent } from 'react'
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
    textValue,
    closeOnSelect = true,
    ...remainingProps
  } = props
  const ref = useRef<HTMLDivElement>(null)
  const [focused, setFocused] = useState(false)
  const [textContent, setTextContent] = useState('')

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled) return
    onSelect?.(e)
    if (closeOnSelect) {
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
    component: nex.div,
    externalForwardedProps: remainingProps,
    additionalProps: {
      ref,
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

  useEffect(() => {
    if (!ref.current) return

    setTextContent((ref.current.textContent ?? '').trim())
  }, [children])

  return (
    <CollectionItem textValue={textValue ?? textContent} disabled={disabled}>
      <RovingFocusItem focusable={!disabled}>
        <MenuItemRoot {...getMenuItemRootProps()}>{children}</MenuItemRoot>
      </RovingFocusItem>
    </CollectionItem>
  )
}

MenuItem.displayName = 'MenuItem'
