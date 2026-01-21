'use client'

import { defineRecipe } from '@nex-ui/system'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useEvent } from '@nex-ui/hooks'
import { addEventListener, ownerWindow, chain } from '@nex-ui/utils'
import { useSlot, getOverflowAncestors, computePosition } from '../utils'
import { DismissibleLayer } from '../dismissibleLayer'
import { usePopperContext, usePopperPortalPropsContext } from './PopperContext'
import type { CSSProperties, ElementType } from 'react'
import type { PopperContentProps } from './types'
import type { Placement } from '../utils'

const recipe = defineRecipe({
  base: {
    pos: 'absolute',
    w: 'max-content',
    left: 'var(--popper-x)',
    top: 'var(--popper-y)',
  },
})

const style = recipe()

type StyleVariables = {
  '--popper-x': string
  '--popper-y': string
}

const DEFAULT_VARS = {
  '--popper-x': '-9999px',
  '--popper-y': '-9999px',
}

const DEFAULT_FLIP_OPTIONS = { mainAxis: true, crossAxis: true }

export const PopperContent = <RootComponent extends ElementType = 'div'>(
  inProps: PopperContentProps<RootComponent>,
) => {
  const props = inProps as PopperContentProps<'div'>
  const { open, referenceRef, popperRootRef, setOpen } = usePopperContext()
  const popperPortalPropsCtx = usePopperPortalPropsContext()

  const {
    children,
    onEscapeKeyDown,
    onFocusOutside,
    onInteractOutside,
    onPointerDownOutside,
    closeOnEscape = true,
    closeOnDetached = true,
    flip = DEFAULT_FLIP_OPTIONS,
    offset = 5,
    shift = true,
    placement = 'top',
    ...remainingProps
  } = props

  const [styleVariables, setStyleVariables] =
    useState<StyleVariables>(DEFAULT_VARS)

  const [computedPlacement, setComputedPlacement] =
    useState<Placement>(placement)

  // To avoid multiple calculations on the initial render,
  // because ResizeObserver is triggered when observing starts.
  const initialRender = useRef(true)

  const [PopperContentRoot, getPopperContentRootProps] = useSlot({
    style,
    elementType: 'div',
    externalForwardedProps: remainingProps,
    additionalProps: {
      ref: popperRootRef,
      style: {
        ...styleVariables,
        display:
          popperPortalPropsCtx?.disablePresence &&
          popperPortalPropsCtx?.keepMounted
            ? open
              ? 'block'
              : 'none'
            : undefined,
      } as CSSProperties,
    },
    a11y: {
      'aria-hidden':
        popperPortalPropsCtx?.keepMounted && !open ? true : undefined,
    },
    dataAttrs: {
      closeOnDetached,
      closeOnEscape,
      placement: computedPlacement,
      state: open ? 'open' : 'closed',
      keepMounted: popperPortalPropsCtx?.keepMounted,
    },
  })

  const setPosition = useCallback(() => {
    // istanbul ignore if
    if (!referenceRef.current || !popperRootRef.current) return

    const {
      x,
      y,
      placement: newComputedPlacement,
    } = computePosition(referenceRef.current, popperRootRef.current, {
      placement,
      offset,
      flip,
      shift,
    })

    const newStyleVars = {
      '--popper-x': x + 'px',
      '--popper-y': y + 'px',
    }
    setComputedPlacement(newComputedPlacement)
    setStyleVariables(newStyleVars)
  }, [referenceRef, popperRootRef, placement, offset, flip, shift])

  // istanbul ignore next
  const resetPosition = useEvent(() => {
    if (!referenceRef.current || !popperRootRef.current) {
      setStyleVariables(DEFAULT_VARS)
      return
    }

    setPosition()
  })

  // istanbul ignore next
  const observeElementResizeChanges = useEvent(() => {
    // istanbul ignore if
    if (!referenceRef.current || !popperRootRef.current) return

    const resizeObserver = new ResizeObserver((entries) => {
      if (initialRender.current) {
        initialRender.current = false
        return
      }
      for (const entry of entries) {
        if (
          entry.target === referenceRef.current ||
          entry.target === popperRootRef.current
        ) {
          resetPosition()
        }
      }
    })

    resizeObserver.observe(referenceRef.current)
    resizeObserver.observe(popperRootRef.current)
    return () => {
      resizeObserver.disconnect()
      initialRender.current = true
    }
  })

  // istanbul ignore next
  const subscribeAncestorScrollEvents = useEvent(() => {
    if (!popperRootRef.current) return

    const ancestors = getOverflowAncestors(popperRootRef.current)

    const unsubscribeScroll = ancestors.map((ancestor) => {
      return addEventListener(ancestor, 'scroll', resetPosition)
    })

    return () => {
      unsubscribeScroll.forEach((unsub) => unsub())
    }
  })

  const subscribeWindowResizeEvent = useEvent(() => {
    if (!referenceRef.current) return

    const win = ownerWindow(referenceRef.current)

    return addEventListener(win, 'resize', resetPosition)
  })

  useEffect(() => {
    if (!open) return

    setPosition()
  }, [setPosition, open])

  useEffect(() => {
    // istanbul ignore next
    if (!referenceRef.current || !closeOnDetached || !open) return

    // istanbul ignore next
    function handleIntersect(entries: IntersectionObserverEntry[]) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          setOpen(false)
        }
      })
    }
    const observer = new IntersectionObserver(handleIntersect)
    observer.observe(referenceRef.current)
    return () => {
      observer.disconnect()
    }
  }, [open, closeOnDetached, referenceRef, setOpen])

  useEffect(() => {
    if (!open) return

    const unobserveElementResizeChanges = observeElementResizeChanges()
    const unsubscribeAncestorScrollEvents = subscribeAncestorScrollEvents()
    const unsubscribeWindowResizeEvent = subscribeWindowResizeEvent()

    return () => {
      unobserveElementResizeChanges?.()
      unsubscribeAncestorScrollEvents?.()
      unsubscribeWindowResizeEvent?.()
    }
  }, [
    open,
    observeElementResizeChanges,
    subscribeAncestorScrollEvents,
    subscribeWindowResizeEvent,
  ])

  return (
    <DismissibleLayer
      onEscapeKeyDown={chain(onEscapeKeyDown, (event) => {
        if (!closeOnEscape) event.preventDefault()
      })}
      onFocusOutside={onFocusOutside}
      onInteractOutside={onInteractOutside}
      onPointerDownOutside={onPointerDownOutside}
      onDismiss={() => setOpen(false)}
    >
      <PopperContentRoot {...getPopperContentRootProps()}>
        {children}
      </PopperContentRoot>
    </DismissibleLayer>
  )
}

PopperContent.displayName = 'PopperContent'
