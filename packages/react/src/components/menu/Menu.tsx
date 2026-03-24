'use client'

import { useEffect, useId, useLayoutEffect, useMemo, useRef } from 'react'
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
  const useKeyboardRef = useRef(false)
  const close = useEvent(() => {
    onOpenChange?.(false)
  })

  const ctx = useMemo(
    () => ({ useKeyboardRef, close }),
    [useKeyboardRef, close],
  )

  useEffect(() => {
    // Capture phase ensures we set the boolean before any side effects execute
    // in response to the key or pointer event as they might depend on this value.
    const handlePointer = () => (useKeyboardRef.current = false)
    const handleKeyDown = () => {
      useKeyboardRef.current = true
      document.addEventListener('pointerdown', handlePointer, {
        capture: true,
        once: true,
      })
      document.addEventListener('pointermove', handlePointer, {
        capture: true,
        once: true,
      })
    }
    document.addEventListener('keydown', handleKeyDown, { capture: true })
    return () => {
      document.removeEventListener('keydown', handleKeyDown, { capture: true })
      document.removeEventListener('pointerdown', handlePointer, {
        capture: true,
      })
      document.removeEventListener('pointermove', handlePointer, {
        capture: true,
      })
    }
  }, [])

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
