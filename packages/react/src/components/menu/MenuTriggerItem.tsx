'use client'

import { useEffect } from 'react'
import { MenuItem } from './MenuItem'
import { useSlot } from '../utils'
import {
  useMenuContext,
  useMenuContentContext,
  useSubMenuContext,
} from './MenuContext'
import { PopperAnchor } from '../popper'
import { getSide } from '../utils/computePosition/utils'
import type { KeyboardEvent } from 'react'
import type { MenuTriggerItemProps } from './types'
import type { Placement } from '../utils'

const SUB_MENU_OPEN_KEYS = {
  left: 'ArrowLeft',
  right: 'ArrowRight',
} as const

const EDGE_OFFSET = 5

export function MenuTriggerItem(props: MenuTriggerItemProps) {
  const { children, disabled, ...remainingProps } = props
  const menuCtx = useMenuContext()
  const subMenuCtx = useSubMenuContext()
  const menuContentCtx = useMenuContentContext()

  const handleOpen = () => {
    if (!menuCtx.open && !disabled) {
      menuCtx.setOpen(true)
    }
  }

  const handlePointerLeave = () => {
    if (!subMenuCtx.subMenuContentRef.current) return

    const rect = subMenuCtx.subMenuContentRef.current.getBoundingClientRect()

    const { placement } = subMenuCtx.subMenuContentRef.current.dataset

    const side = getSide(placement as Placement)

    const area = {
      top: rect.top,
      bottom: rect.bottom,
      left: rect.left - (side === 'right' ? EDGE_OFFSET : 0),
      right: rect.right + (side === 'left' ? EDGE_OFFSET : 0),
    }

    menuContentCtx.onPointerGraceIntentChange({
      area,
      side,
    })
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    // if (!subMenuCtx.subMenuContentRef.current) return

    // const { placement } = subMenuCtx.subMenuContentRef.current.dataset

    // const side = getSide(placement as Placement) as 'left' | 'right'

    if (event.key === SUB_MENU_OPEN_KEYS['right']) {
      handleOpen()
      event.preventDefault()
    }
  }

  useEffect(() => {
    return () => {
      menuContentCtx.onPointerGraceIntentChange(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuContentCtx.onPointerGraceIntentChange])

  const [MenuTriggerItemRoot, getMenuTriggerItemProps] = useSlot({
    component: MenuItem,
    externalForwardedProps: remainingProps,
    additionalProps: {
      disabled,
      closeOnSelect: false,
      ref: menuCtx.triggerRef,
      onPointerMove: handleOpen,
      onPointerLeave: handlePointerLeave,
      onSelect: handleOpen,
      onKeyDown: handleKeyDown,
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
      <MenuTriggerItemRoot {...getMenuTriggerItemProps()}>
        {children}
      </MenuTriggerItemRoot>
    </PopperAnchor>
  )
}

MenuTriggerItem.displayName = 'MenuTriggerItem'
