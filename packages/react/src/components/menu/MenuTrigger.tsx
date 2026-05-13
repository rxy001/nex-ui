'use client'

import { cloneElement } from 'react'
import { mergeProps, isValidNonFragmentElement } from '@nex-ui/utils'
import { useMenuContext } from './MenuContext'
import { PopperAnchor } from '../popper'
import { ListNavigationTrigger } from '../listNavigation'
import type { KeyboardEvent } from 'react'
import type { MenuTriggerProps } from './types'

export function MenuTrigger(props: MenuTriggerProps) {
  const { children, closeOnClick = true } = props

  const menuCtx = useMenuContext()

  if (!isValidNonFragmentElement(children)) {
    return children
  }

  const handleClick = () => {
    if (!menuCtx.open) {
      menuCtx.setOpen(true)
    } else if (closeOnClick) {
      menuCtx.setOpen(false)
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(event.key)) {
      menuCtx.setOpen(true)
      event.preventDefault()
    }
  }

  return (
    <PopperAnchor>
      <ListNavigationTrigger>
        {cloneElement(
          children,
          mergeProps(
            {
              ref: menuCtx.triggerRef,
              id: menuCtx.triggerId,
              'aria-haspopup': 'menu',
              'aria-expanded': menuCtx.open,
              'aria-controls': menuCtx.open ? menuCtx.contentId : undefined,
              onClick: handleClick,
              onKeyDown: handleKeyDown,
            },
            children.props,
          ),
        )}
      </ListNavigationTrigger>
    </PopperAnchor>
  )
}

MenuTrigger.displayName = 'MenuTrigger'
