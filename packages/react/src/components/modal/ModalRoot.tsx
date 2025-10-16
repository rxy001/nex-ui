'use client'

import {
  addEventListener,
  isFunction,
  ownerDocument,
  ownerWindow,
} from '@nex-ui/utils'
import { defineRecipe } from '@nex-ui/system'
import { useEffect, useMemo, useRef, useId } from 'react'
import { useEvent } from '@nex-ui/hooks'
import { Portal, useSlot, PresenceMotion } from '../utils'
import { ModalProvider, useModal } from './ModalContext'
import { useModalManager } from './ModalManager'
import type { ElementType } from 'react'
import type { DOMMotionComponents } from 'motion/react'
import type { ModalRootProps } from './types'

const recipe = defineRecipe({
  base: {
    position: 'fixed',
    inset: 0,
    zIndex: 'modal',
  },
})

const style = recipe()

export const ModalRoot = <
  RootComponent extends ElementType = DOMMotionComponents['div'],
>(
  inProps: ModalRootProps<RootComponent>,
) => {
  const { children, ...props } = inProps as ModalRootProps
  const rootRef = useRef<HTMLDivElement>(null)
  const modalId = useId()
  const modalState = useModal()
  const modalManager = useModalManager()
  const registeredRef = useRef(false)
  const resolver = useRef<() => void>(undefined)

  const {
    open,
    container,
    keepMounted,
    setOpen,
    closeOnEscape,
    preventScroll,
  } = modalState

  if (registeredRef.current === false && open) {
    modalManager.register(modalId)
    registeredRef.current = true
  }

  const [Motion, getMotionProps] = useSlot({
    style,
    elementType: PresenceMotion,
    externalForwardedProps: props,
    shouldForwardComponent: false,
    additionalProps: {
      open,
      keepMounted,
      ref: rootRef,
      tabIndex: -1,
      onAnimationComplete: (animation: string) => {
        if (animation === 'hidden') {
          resolver.current?.()
        }
      },
    },
    a11y: {
      // Ignore the user's settings to ensure proper access for assistive technologies.
      'aria-hidden': open ? undefined : 'true',
    },
    dataAttrs: {
      state: open ? 'open' : 'closed',
    },
  })

  const isTopmostModal = useEvent(() => modalManager.isTopmostModal(modalId))

  // Portal renders asynchronously.
  const handlePortalMount = () => {
    if (open && rootRef.current && isTopmostModal()) {
      modalManager.mount(modalId)
    }
  }

  const ctx = useMemo(
    () => ({
      ...modalState,
      isTopmostModal: isTopmostModal,
    }),
    [modalState, isTopmostModal],
  )

  useEffect(() => {
    if (!open || !closeOnEscape) {
      return
    }

    const doc = ownerDocument(rootRef.current)

    const removeListener = addEventListener(doc.body, 'keyup', (e) => {
      if (open && e.key === 'Escape' && isTopmostModal()) {
        setOpen(false)
        e.stopPropagation()
      }
    })

    return removeListener
  }, [closeOnEscape, isTopmostModal, open, setOpen])

  useEffect(() => {
    if (open) {
      const unsubscribe = modalManager.subscribe(() => {
        const ariaHidden = rootRef.current?.getAttribute('aria-hidden')
        if (isTopmostModal()) {
          if (ariaHidden === 'false' || ariaHidden === null) {
            return
          }
          rootRef.current?.removeAttribute('aria-hidden')
        } else {
          if (ariaHidden === 'true') {
            return
          }
          rootRef.current?.setAttribute('aria-hidden', 'true')
        }
      })

      return () => {
        unsubscribe()
      }
    }
  }, [modalManager, open, isTopmostModal])

  useEffect(() => {
    if (open) {
      const doc = ownerDocument(rootRef.current)

      let prevOverflow: string | null = null
      let prevOverflowX: string | null = null
      let prevOverflowY: string | null = null
      let prevPaddingRight: string | null = null

      const resolvedContainer =
        (isFunction(container) ? container() : container) || doc.body

      const unsubscribe = modalManager.subscribe(() => {
        // Store overflow and paddingRight only if the modal first mounts.
        if (preventScroll && prevOverflow === null && isTopmostModal()) {
          // Is vertical scrollbar displayed?
          if (isOverflowing(resolvedContainer)) {
            // Avoid scroll content jumping.
            const scrollBarWidth = getScrollBarWidth(resolvedContainer)
            prevPaddingRight = resolvedContainer.style.paddingRight
            resolvedContainer.style.paddingRight = `${parseInt(prevPaddingRight || '0', 10) + scrollBarWidth}px`
          }
          prevOverflow = resolvedContainer.style.overflow
          prevOverflowX = resolvedContainer.style.overflowX
          prevOverflowY = resolvedContainer.style.overflowY
          resolvedContainer.style.overflow = 'hidden'
        }
      })

      return () => {
        const { promise, resolve } = Promise.withResolvers<void>()
        resolver.current = resolve
        promise.then(() => {
          if (prevOverflow !== null) {
            resolvedContainer.style.overflow = prevOverflow
            resolvedContainer.style.overflowX = prevOverflowX!
            resolvedContainer.style.overflowY = prevOverflowY!
          }
          if (prevPaddingRight !== null) {
            resolvedContainer.style.paddingRight = prevPaddingRight
          }
        })
        unsubscribe()
      }
    }
  }, [container, isTopmostModal, modalManager, open, preventScroll])

  useEffect(() => {
    if (open) {
      if (rootRef.current && isTopmostModal()) {
        modalManager.mount(modalId)
      }

      return () => {
        modalManager.unregister(modalId)
        registeredRef.current = false
      }
    }
  }, [isTopmostModal, modalId, modalManager, open])

  return (
    <Portal container={container} onMount={handlePortalMount}>
      <ModalProvider value={ctx}>
        <Motion {...getMotionProps()}>{children}</Motion>
      </ModalProvider>
    </Portal>
  )
}

// Is a vertical scrollbar displayed?
function isOverflowing(container: Element): boolean {
  const doc = ownerDocument(container)

  if (doc.body === container) {
    return ownerWindow(container).innerWidth > doc.documentElement.clientWidth
  }

  return container.scrollHeight > container.clientHeight
}

export function getScrollBarWidth(container: HTMLElement): number {
  const doc = ownerDocument(container)
  const win = ownerWindow(container)

  if (doc.body === container) {
    return Math.max(0, win.innerWidth - doc.documentElement.clientWidth)
  }

  return container.offsetWidth - container.clientWidth
}

ModalRoot.displayName = 'ModalRoot'
