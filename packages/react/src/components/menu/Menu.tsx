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
import type { MenuProps } from './types'
import type { MenuContextValue } from './MenuContext'

// eslint-disable-next-line react/display-name
const MenuImpl = (props: MenuProps) => {
  const { open, children, onOpenChange, onClose } = props

  const ariaId = useId()
  const contentId = `menu-${ariaId}-content`
  const triggerId = `menu-${ariaId}-trigger`
  const triggerRef = useRef<HTMLElement>(null)

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

// eslint-disable-next-line react/display-name
const RootMenu = (props: MenuProps) => {
  const useKeyboardRef = useRef(false)
  const close = useEvent(() => {
    props.onOpenChange?.(false)
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
    <RootMenuProvider value={ctx}>
      <MenuImpl {...props} />
    </RootMenuProvider>
  )
}

// eslint-disable-next-line react/display-name
const SubMenu = (props: MenuProps) => {
  const parentMenuCtx = useMenuContext()
  const menuRootRef = useRef<HTMLDivElement>(null)

  const { children, onOpenChange } = props

  const subMenuCtx = useMemo(() => {
    return { menuRootRef }
  }, [])

  useLayoutEffect(() => {
    // Close this menu if the parent menu is closed
    if (parentMenuCtx.open === false) {
      onOpenChange?.(false)
    }
    return () => onOpenChange?.(false)
  }, [parentMenuCtx.open, onOpenChange])

  return (
    <MenuImpl {...props}>
      <SubMenuProvider value={subMenuCtx}>{children}</SubMenuProvider>
    </MenuImpl>
  )
}

export const Menu = (props: MenuProps) => {
  const rootMenu = !useMenuContext()
  return rootMenu ? <RootMenu {...props} /> : <SubMenu {...props} />
}

Menu.displayName = 'Menu'
