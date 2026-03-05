'use client'

import { useCallback, useMemo, useRef } from 'react'
import { useMergeRefs } from '@nex-ui/hooks'
import { chain, focus } from '@nex-ui/utils'
import { defineRecipe } from '@nex-ui/system'
import { PopperContent } from '../popper'
import { useSlot } from '../utils'
import { RovingFocusGroup } from '../rovingFocus'
import { FocusTrap } from '../focusTrap'
import {
  useMenuContext,
  MenuContentProvider,
  useSubMenuContext,
  useRootMenuContext,
} from './MenuContext'
import type { KeyboardEvent, PointerEvent, FocusEvent } from 'react'
import type {
  MenuContentImplProps,
  MenuContentProps,
  SubMenuContentProps,
} from './types'
import type { MenuContentContextValue, GraceIntent } from './MenuContext'
import type { Side } from '../utils'
import type {
  FocusOutsideEvent,
  PointerDownOutsideEvent,
} from '../dismissibleLayer'

const recipe = defineRecipe({
  base: {
    outline: 'none',
  },
})

const style = recipe()

const MenuContentImpl = (props: MenuContentImplProps) => {
  const { children, loopFocus = true, restoreFocus, ...remainingProps } = props
  const menuCtx = useMenuContext()
  const rootMenuCtx = useRootMenuContext()
  const ref = useRef<HTMLDivElement>(null)
  const pointerGraceIntentRef = useRef<GraceIntent | null>(null)
  const pointerDirRef = useRef<Side>('right')
  const lastPointerXRef = useRef(0)

  const [MenuContentRoot, getMenuContentRootProps] = useSlot({
    style,
    component: PopperContent,
    externalForwardedProps: remainingProps,
    additionalProps: {
      ref,
      onPointerMove: (event: PointerEvent<HTMLElement>) => {
        const target = event.target as HTMLElement
        const pointerXHasChanged = lastPointerXRef.current !== event.clientX

        // We don't use `event.movementX` for this check because Safari will
        // always return `0` on a pointer event.
        if (event.currentTarget.contains(target) && pointerXHasChanged) {
          const newDir =
            event.clientX > lastPointerXRef.current ? 'right' : 'left'
          pointerDirRef.current = newDir
          lastPointerXRef.current = event.clientX
        }
      },
      onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
        const target = event.target as HTMLElement
        if (event.currentTarget.contains(target) && event.key === 'Tab') {
          event.preventDefault()
        }
      },
      onFocus: (event: FocusEvent<HTMLElement>) => {
        // onItemLeave refocuses on content, blocking RovingFocusGroup's onFocus logic.
        if (!rootMenuCtx.useKeyboardRef.current) {
          event.preventDefault()
        }
      },
      onPointerDownOutside: (event: PointerDownOutsideEvent) => {
        const target = event.target as HTMLElement
        if (menuCtx.triggerRef.current?.contains(target)) {
          event.preventDefault()
        }
      },
      onFocusOutside: (event: FocusOutsideEvent) => {
        // Ensure that the submenu remains displayed when hovering over the sub-trigger,
        // and is hidden when hovering over other items.
        if (event.target === menuCtx.triggerRef.current) {
          event.preventDefault()
        }
      },
    },
    ariaProps: {
      role: 'menu',
      id: menuCtx.contentId,
      'aria-orientation': 'vertical',
      'aria-labelledby': menuCtx.triggerId,
    },
  })

  const isPointerMovingToSubMenu = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (!pointerGraceIntentRef.current) return false

      const { area, side } = pointerGraceIntentRef.current

      if (side !== pointerDirRef.current) return false

      if (
        event.clientX < area.left ||
        event.clientX > area.right ||
        event.clientY < area.top ||
        event.clientY > area.bottom
      ) {
        return false
      }

      return true
    },
    [],
  )

  const ctx = useMemo<MenuContentContextValue>(
    () => ({
      onItemEnter: () => {
        pointerGraceIntentRef.current = null
      },
      onItemLeave: (event: PointerEvent<HTMLElement>) => {
        if (isPointerMovingToSubMenu(event)) return
        if (ref.current) focus(ref.current)
      },
      onPointerGraceIntentChange: (intent: GraceIntent | null) => {
        pointerGraceIntentRef.current = intent
      },
    }),
    [isPointerMovingToSubMenu],
  )

  return (
    <FocusTrap
      paused
      loop={false}
      active={menuCtx.open}
      restoreFocus={restoreFocus}
    >
      <RovingFocusGroup orientation='vertical' loop={loopFocus}>
        <MenuContentRoot {...getMenuContentRootProps()}>
          <MenuContentProvider value={ctx}>{children}</MenuContentProvider>
        </MenuContentRoot>
      </RovingFocusGroup>
    </FocusTrap>
  )
}

MenuContentImpl.displayName = 'MenuContentImpl'

export const MenuContent = (props: MenuContentProps) => {
  const { restoreFocus = true, placement = 'bottom', ...remainingProps } = props

  return (
    <MenuContentImpl
      placement={placement}
      restoreFocus={restoreFocus}
      {...remainingProps}
    />
  )
}

MenuContent.displayName = 'MenuContent'

export const SubMenuContent = (props: SubMenuContentProps) => {
  const menuCtx = useMenuContext()
  const subMenuCtx = useSubMenuContext()
  const mergedRef = useMergeRefs(subMenuCtx?.subMenuContentRef, props.ref)

  return (
    <MenuContentImpl
      {...props}
      ref={mergedRef}
      closeOnEscape={false}
      placement='right-start'
      restoreFocus={false}
      onKeyDown={chain(props.onKeyDown, (event: KeyboardEvent<HTMLElement>) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          menuCtx.setOpen(false)
          focus(menuCtx.triggerRef.current!)
        }
      })}
    />
  )
}

SubMenuContent.displayName = 'SubMenuContent'
