'use client'

import { useId, useLayoutEffect, useMemo, useRef } from 'react'
import { useEvent } from '@nex-ui/hooks'
import { Popper } from '../popper'
import {
  MenuProvider,
  RootMenuProvider,
  SubMenuProvider,
  useMenuContext,
} from './MenuContext'
import type { MenuProps, MenuImplProps, SubMenuProps } from './types'
import type { MenuContextValue } from './MenuContext'

function MenuImpl(props: MenuImplProps) {
  const { open, children, onOpenChange, onClose } = props

  const ariaId = useId()
  const contentId = `menu-${ariaId}-content`
  const triggerId = `menu-${ariaId}-trigger`
  const triggerRef = useRef<HTMLDivElement>(null)

  const setOpen = useEvent((value: boolean) => {
    onOpenChange?.(value)
  })

  const menuCtx = useMemo<MenuContextValue>(
    () => ({
      open,
      setOpen,
      triggerRef,
      contentId,
      triggerId,
    }),
    [contentId, open, setOpen, triggerId],
  )

  return (
    <Popper open={open} onOpenChange={setOpen} onClose={onClose}>
      <MenuProvider value={menuCtx}>{children}</MenuProvider>
    </Popper>
  )
}
MenuImpl.displayName = 'MenuImpl'

export function Menu(props: MenuProps) {
  const { children, onOpenChange, ...remainingProps } = props
  const close = useEvent(() => {
    onOpenChange?.(false)
  })

  const ctx = useMemo(() => ({ close }), [close])

  return (
    <MenuImpl onOpenChange={onOpenChange} {...remainingProps}>
      <RootMenuProvider value={ctx}>{children}</RootMenuProvider>
    </MenuImpl>
  )
}
Menu.displayName = 'Menu'

export function SubMenu(props: SubMenuProps) {
  const parentMenuCtx = useMenuContext()
  const subMenuContentRef = useRef<HTMLDivElement>(null)

  const { children, onOpenChange, ...remainingProps } = props

  const subMenuCtx = useMemo(() => ({ subMenuContentRef }), [])

  useLayoutEffect(() => {
    // Close this menu if the parent menu is closed
    if (parentMenuCtx.open === false) {
      onOpenChange?.(false)
    }
    return () => onOpenChange?.(false)
  }, [parentMenuCtx.open, onOpenChange])

  return (
    <MenuImpl onOpenChange={onOpenChange} {...remainingProps}>
      <SubMenuProvider value={subMenuCtx}>{children}</SubMenuProvider>
    </MenuImpl>
  )
}

SubMenu.displayName = 'SubMenu'
