'use client'

import { useMemo, useRef } from 'react'
import { useEvent, useMergeRefs } from '@nex-ui/hooks'
import { chain, focus } from '@nex-ui/utils'
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
import type {
  ElementType,
  KeyboardEvent,
  PointerEvent,
  FocusEvent,
} from 'react'
import type { MenuContentProps } from './types'
import type { MenuContentContextValue, GraceIntent } from './MenuContext'
import type { Side } from '../utils'
import type {
  FocusOutsideEvent,
  PointerDownOutsideEvent,
} from '../dismissibleLayer'

// eslint-disable-next-line react/display-name
const MenuContentImpl = <RootComponent extends ElementType = 'div'>(
  inProps: MenuContentProps<RootComponent>,
) => {
  const props = inProps as MenuContentProps<'div'>
  const {
    children,
    loop = true,
    restoreFocus = true,
    ...remainingProps
  } = props
  const menuCtx = useMenuContext()
  const rootMenuCtx = useRootMenuContext()
  const ref = useRef<HTMLDivElement>(null)
  const pointerGraceIntentRef = useRef<GraceIntent | null>(null)
  const pointerDirRef = useRef<Side>('right')
  const lastPointerXRef = useRef(0)

  const handlePointerMove = useEvent((event: PointerEvent<HTMLElement>) => {
    const target = event.target as HTMLElement
    const pointerXHasChanged = lastPointerXRef.current !== event.clientX

    // We don't use `event.movementX` for this check because Safari will
    // always return `0` on a pointer event.
    if (event.currentTarget.contains(target) && pointerXHasChanged) {
      const newDir = event.clientX > lastPointerXRef.current ? 'right' : 'left'
      pointerDirRef.current = newDir
      lastPointerXRef.current = event.clientX
    }
  })

  const handleKeyDown = useEvent((event: KeyboardEvent<HTMLElement>) => {
    if (event.currentTarget.contains(event.target as HTMLElement)) {
      if (event.key === 'Tab') event.preventDefault()
    }
  })

  const handleFocus = useEvent((event: FocusEvent<HTMLElement>) => {
    // onItemLeave refocuses on content, blocking RovingFocusGroup's onFocus logic.
    if (!rootMenuCtx.usingKeyboardRef.current) {
      event.preventDefault()
    }
  })

  const [MenuContentRoot, getMenuContentRootProps] = useSlot({
    elementType: PopperContent,
    externalForwardedProps: remainingProps,
    shouldForwardComponent: false,
    additionalProps: {
      ref,
      onPointerMove: handlePointerMove,
      onKeyDown: handleKeyDown,
      onFocus: handleFocus,
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

  const isPointerMovingToSubMenu = useEvent(
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
      loop={false}
      active={menuCtx.open}
      paused={true}
      restoreFocus={restoreFocus}
    >
      <RovingFocusGroup orientation='vertical' loop={loop}>
        <MenuContentRoot {...getMenuContentRootProps()}>
          <MenuContentProvider value={ctx}>{children}</MenuContentProvider>
        </MenuContentRoot>
      </RovingFocusGroup>
    </FocusTrap>
  )
}

// eslint-disable-next-line react/display-name
const SubMenuContent = <RootComponent extends ElementType = 'div'>(
  inProps: MenuContentProps<RootComponent>,
) => {
  const props = inProps as MenuContentProps<'div'>
  const menuCtx = useMenuContext()
  const subMenuCtx = useSubMenuContext()
  const mergedRef = useMergeRefs(subMenuCtx?.menuRootRef, props.ref)

  return (
    <MenuContentImpl
      {...props}
      ref={mergedRef}
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

const RootMenuContent = MenuContentImpl

export const MenuContent = <RootComponent extends ElementType = 'div'>(
  props: MenuContentProps<RootComponent>,
) => {
  const rootMenu = !useSubMenuContext()

  return rootMenu ? (
    <RootMenuContent {...props} />
  ) : (
    <SubMenuContent {...props} />
  )
}

MenuContent.displayName = 'MenuContent'
