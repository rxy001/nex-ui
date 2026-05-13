'use client'

import { MenuItem } from './MenuItem'
import { useSlot } from '../utils'
import { useMenuContext } from './MenuContext'
import { PopperAnchor } from '../popper'
import { ListNavigationTrigger } from '../listNavigation'
import type { KeyboardEvent } from 'react'
import type { MenuTriggerItemProps } from './types'

export function MenuTriggerItem(props: MenuTriggerItemProps) {
  const { children, disabled, ...remainingProps } = props
  const menuCtx = useMenuContext()

  const handleOpen = () => {
    if (!menuCtx.open && !disabled) {
      menuCtx.setOpen(true)
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowRight') {
      handleOpen()
      event.preventDefault()
    }
  }

  const [MenuTriggerItemRoot, getMenuTriggerItemProps] = useSlot({
    component: MenuItem,
    externalForwardedProps: remainingProps,
    additionalProps: {
      disabled,
      closeOnSelect: false,
      ref: menuCtx.triggerRef,
      onPointerMove: handleOpen,
      onKeyDown: handleKeyDown,
      onSelect: handleOpen,
    },
    ariaProps: {
      'aria-haspopup': 'menu',
      'aria-expanded': menuCtx.open,
      'aria-controls': menuCtx.open ? menuCtx.contentId : undefined,
      id: menuCtx.triggerId,
    },
  })

  return (
    <PopperAnchor>
      <ListNavigationTrigger>
        <MenuTriggerItemRoot {...getMenuTriggerItemProps()}>
          {children}
        </MenuTriggerItemRoot>
      </ListNavigationTrigger>
    </PopperAnchor>
  )
}

MenuTriggerItem.displayName = 'MenuTriggerItem'
