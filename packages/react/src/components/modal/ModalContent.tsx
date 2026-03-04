'use client'

import { nex } from '@nex-ui/styled'
import { ownerDocument, ownerWindow, isFunction, chain } from '@nex-ui/utils'
import { defineRecipe } from '@nex-ui/system'
import { useEffect, useRef } from 'react'
import { useEvent } from '@nex-ui/hooks'
import { useSlot } from '../utils'
import { useModalContext, useModalPortalPropsContext } from './ModalContext'
import { useModalManager } from './ModalManager'
import { DismissibleLayer } from '../dismissibleLayer'
import { FocusTrap } from '../focusTrap'
import type { ModalContentProps } from './types'

const recipe = defineRecipe({
  base: {
    outline: 'none',
    display: 'flex',
    flexDirection: 'column',
    bg: 'content',
    position: 'relative',
  },
})

const style = recipe()

export const ModalContent = (props: ModalContentProps) => {
  const {
    children,
    onEscapeKeyDown,
    onPointerDownOutside,
    onInteractOutside,
    onFocusOutside,
    restoreFocus,
    autoFocus,
    closeOnInteractOutside = true,
    closeOnEscape = true,
    preventScroll = false,
    ...remainingProps
  } = props
  const rootRef = useRef<HTMLDivElement>(null)
  const { modalId, open, setOpen, modalContentId, modalHeaderId, modalBodyId } =
    useModalContext()
  const modalPortalPropsCtx = useModalPortalPropsContext()
  const modalManager = useModalManager()
  const registeredRef = useRef(false)

  if (registeredRef.current === false && open) {
    modalManager.register(modalId)
    registeredRef.current = true
  }

  const [ModalContentRoot, getModalContentRootProps] = useSlot({
    style,
    component: nex.div,
    externalForwardedProps: remainingProps,
    additionalProps: {
      ref: rootRef,
      style: {
        display:
          modalPortalPropsCtx?.disablePresence &&
          modalPortalPropsCtx?.keepMounted
            ? open
              ? 'block'
              : 'none'
            : undefined,
      },
    },
    ariaProps: {
      'aria-hidden':
        modalPortalPropsCtx?.keepMounted && !open ? true : undefined,
      id: modalContentId,
      role: 'dialog',
      'aria-modal': true,
      'aria-labelledby': modalHeaderId,
      'aria-describedby': modalBodyId,
    },
    dataAttrs: {
      preventScroll,
      keepMounted: modalPortalPropsCtx?.keepMounted,
      state: open ? 'open' : 'closed',
      closeOnEscape,
      restoreFocus,
    },
  })

  const isTopmostModal = useEvent(() => modalManager.isTopmostModal(modalId))

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
        (isFunction(modalPortalPropsCtx?.container)
          ? modalPortalPropsCtx.container()
          : modalPortalPropsCtx?.container) || doc.body

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
        if (prevOverflow !== null) {
          resolvedContainer.style.overflow = prevOverflow
          resolvedContainer.style.overflowX = prevOverflowX!
          resolvedContainer.style.overflowY = prevOverflowY!
        }
        if (prevPaddingRight !== null) {
          resolvedContainer.style.paddingRight = prevPaddingRight
        }
        unsubscribe()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isTopmostModal,
    modalManager,
    open,
    preventScroll,
    modalPortalPropsCtx?.container,
  ])

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
    <DismissibleLayer
      onInteractOutside={onInteractOutside}
      onFocusOutside={chain(onFocusOutside, (event) => {
        event.preventDefault()
      })}
      onEscapeKeyDown={chain(onEscapeKeyDown, (event) => {
        if (!closeOnEscape || !isTopmostModal()) event.preventDefault()
      })}
      onPointerDownOutside={chain(onPointerDownOutside, (event) => {
        if (!closeOnInteractOutside || !isTopmostModal()) event.preventDefault()
      })}
      onDismiss={() => {
        setOpen(false)
      }}
    >
      <FocusTrap
        loop
        active={open}
        restoreFocus={restoreFocus}
        autoFocus={autoFocus}
      >
        <ModalContentRoot {...getModalContentRootProps()}>
          {children}
        </ModalContentRoot>
      </FocusTrap>
    </DismissibleLayer>
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

ModalContent.displayName = 'ModalContent'
