'use client'

import { useEffect } from 'react'
import { useEvent } from '@nex-ui/hooks'
import { MenuItem } from './MenuItem'
import { useSlot } from '../utils'
import {
  useMenuContext,
  useMenuContentContext,
  useSubMenuContext,
} from './MenuContext'
import { PopperAnchor } from '../popper'
import { getSide } from '../utils/computePosition/utils'
import type { ElementType, KeyboardEvent } from 'react'
import type { MenuTriggerItemProps } from './types'
import type { Placement } from '../utils'

const SUB_MENU_OPEN_KEYS = {
  left: 'ArrowLeft',
  right: 'ArrowRight',
} as const

const EDGE_OFFSET = 5

export const MenuTriggerItem = <RootComponent extends ElementType = 'div'>(
  inProps: MenuTriggerItemProps<RootComponent>,
) => {
  const props = inProps as MenuTriggerItemProps<'div'>
  const { children, disabled, ...remainingProps } = props
  const menuCtx = useMenuContext()
  const subMenuCtx = useSubMenuContext()
  const menuContentCtx = useMenuContentContext()

  const handleOpen = useEvent(() => {
    if (!menuCtx.open && !disabled) {
      menuCtx.setOpen(true)
    }
  })

  const handlePointerLeave = useEvent(() => {
    if (!subMenuCtx.menuRootRef.current) return

    const rect = subMenuCtx.menuRootRef.current.getBoundingClientRect()

    const { placement } = subMenuCtx.menuRootRef.current.dataset

    const side = getSide(placement as Placement)

    const area = {
      top: rect.top,
      bottom: rect.bottom,
      left: rect.left - (side === 'right' ? EDGE_OFFSET : 0),
      right: rect.right - (side === 'left' ? EDGE_OFFSET : 0),
    }

    menuContentCtx.onPointerGraceIntentChange({
      area,
      side,
    })
  })

  const handleKeyDown = useEvent((event: KeyboardEvent<HTMLElement>) => {
    // if (!subMenuCtx.menuRootRef.current) return

    // const { placement } = subMenuCtx.menuRootRef.current.dataset

    // const side = getSide(placement as Placement) as 'left' | 'right'

    if (event.key === SUB_MENU_OPEN_KEYS['right']) {
      handleOpen()
      event.preventDefault()
    }
  })

  useEffect(() => {
    return () => {
      menuContentCtx.onPointerGraceIntentChange(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuContentCtx.onPointerGraceIntentChange])

  const [MenuTriggerItemRoot, getMenuTriggerItemProps] = useSlot({
    elementType: MenuItem,
    externalForwardedProps: remainingProps,
    shouldForwardComponent: false,
    additionalProps: {
      closeOnClick: false,
      ref: menuCtx.triggerRef,
      'aria-haspopup': 'menu',
      'aria-expanded': menuCtx.open,
      'aria-controls': menuCtx.open ? menuCtx.contentId : undefined,
      id: menuCtx.triggerId,
      onPointerMove: handleOpen,
      onPointerLeave: handlePointerLeave,
      onClick: handleOpen,
      onKeyDown: handleKeyDown,
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
