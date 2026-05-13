'use client'

import { useRef } from 'react'
import { chain, focus } from '@nex-ui/utils'
import { defineRecipe } from '@nex-ui/system'
import { PopperContent } from '../popper'
import { useSlot } from '../utils'
import { useMenuContext } from './MenuContext'
import { FocusTrap } from '../focusTrap'
import { ListNavigation } from '../listNavigation'
import type { KeyboardEvent } from 'react'
import type {
  MenuContentImplProps,
  MenuContentProps,
  SubMenuContentProps,
} from './types'
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

function MenuContentImpl(props: MenuContentImplProps) {
  const { children, restoreFocus, loopFocus, ...remainingProps } = props
  const menuCtx = useMenuContext()
  const ref = useRef<HTMLDivElement>(null)

  const [MenuContentRoot, getMenuContentRootProps] = useSlot({
    style,
    component: PopperContent,
    externalForwardedProps: remainingProps,
    additionalProps: {
      ref,
      onPointerDownOutside: (event: PointerDownOutsideEvent) => {
        const target = event.detail.originalEvent.target as HTMLElement
        if (menuCtx.triggerRef.current?.contains(target)) {
          event.preventDefault()
        }
      },
      onFocusOutside: (event: FocusOutsideEvent) => {
        // Ensure that the submenu remains displayed when hovering over the sub-trigger,
        // and is hidden when hovering over other items.
        const target = event.detail.originalEvent.target as HTMLElement

        if (target === menuCtx.triggerRef.current) {
          event.preventDefault()
        }
      },
      onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Tab' && menuCtx.open) {
          menuCtx.setOpen(false)
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

  return (
    <FocusTrap paused active={menuCtx.open} restoreFocus={restoreFocus}>
      <ListNavigation
        loop={loopFocus}
        orientation='vertical'
        active={menuCtx.open}
      >
        <MenuContentRoot {...getMenuContentRootProps()}>
          {children}
        </MenuContentRoot>
      </ListNavigation>
    </FocusTrap>
  )
}

MenuContentImpl.displayName = 'MenuContentImpl'

export function MenuContent(props: MenuContentProps) {
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

export function SubMenuContent(props: SubMenuContentProps) {
  const menuCtx = useMenuContext()

  return (
    <MenuContentImpl
      {...props}
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
