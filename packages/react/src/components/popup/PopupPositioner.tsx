'use client'

import { defineRecipe } from '@nex-ui/system'
import { useEffect, useRef, useState } from 'react'
import { useEvent, useDebounce } from '@nex-ui/hooks'
import { ownerWindow } from '@nex-ui/utils'
import { Portal, PresenceMotion, useSlot } from '../utils'
import { usePopup } from './PopupContext'
import type { CSSProperties } from 'react'
import type { PopupPortalProps } from './types'

const recipe = defineRecipe({
  base: {
    position: 'absolute',
    top: 0,
    left: 0,
    transform: 'translate(var(--popup-x), var(--popup-y))',
    w: 'max-content',
  },
})

const style = recipe()

type Position = {
  '--popup-x': string
  '--popup-y': string
}

export const PopupPositioner = ({
  children,
  placement = 'top',
}: PopupPortalProps) => {
  const { open, triggerRef, setOpen } = usePopup()
  const [pos, setPos] = useState<Position | undefined>(undefined)
  const popupRef = useRef<HTMLDivElement>(null)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null)

  // To avoid multiple calculations on the initial render,
  // because ResizeObserver is triggered when observing starts.
  const initialRender = useRef(true)

  // Portal renders asynchronously. Use this variable to avoid multiple handler registrations.
  const initialized = useRef(false)

  const [PopupPortalRoot, getPopupPortalRootProps] = useSlot({
    style,
    elementType: PresenceMotion,
    shouldForwardComponent: false,
    additionalProps: {
      open,
      ref: popupRef,
      style: pos as CSSProperties,
    },
  })

  const calcPos = useEvent(() => {
    if (!triggerRef?.current || !popupRef.current) {
      return
    }

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const popupRect = popupRef.current.getBoundingClientRect()

    let top: number
    let left: number

    const win = ownerWindow(triggerRef!.current)

    const calcTop = () => triggerRect.top - popupRect.height + win.scrollY
    const calcLeft = () => triggerRect.left - popupRect.width + win.scrollX
    const calcRight = () => triggerRect.right + win.scrollX
    const calcBottom = () => triggerRect.bottom + win.scrollY

    const calcHorizontalStart = () => triggerRect.left + win.scrollX
    const calcHorizontalCenter = () =>
      triggerRect.left +
      win.scrollX +
      triggerRect.width / 2 -
      popupRect.width / 2
    const calcHorizontalEnd = () =>
      triggerRect.right - popupRect.width + win.scrollX

    const calcVerticalStart = () => triggerRect.top + win.scrollY
    const calcVerticalCenter = () =>
      triggerRect.top +
      win.scrollY +
      triggerRect.height / 2 -
      popupRect.height / 2
    const calcVerticalEnd = () =>
      triggerRect.bottom - popupRect.height + win.scrollY

    switch (placement) {
      case 'top':
        top = calcPosWithFallback(calcTop, calcBottom, win.scrollY)
        left = calcPosWithFallback(calcHorizontalCenter, win.scrollX)
        break
      case 'top-start':
        top = calcPosWithFallback(calcTop, calcBottom, win.scrollY)
        left = calcPosWithFallback(calcHorizontalStart, win.scrollX)
        break
      case 'top-end':
        top = calcPosWithFallback(calcTop, calcBottom, win.scrollY)
        left = calcPosWithFallback(
          calcHorizontalEnd,
          calcHorizontalStart,
          win.scrollX,
        )
        break
      case 'left':
        left = calcPosWithFallback(calcLeft, calcRight, win.scrollX)
        top = calcPosWithFallback(calcVerticalCenter, win.scrollY)
        break
      case 'left-start':
        left = calcPosWithFallback(calcLeft, calcRight, win.scrollX)
        top = calcPosWithFallback(calcVerticalStart, win.scrollY)
        break
      case 'left-end':
        left = calcPosWithFallback(calcLeft, calcRight, win.scrollX)
        top = calcPosWithFallback(
          calcVerticalEnd,
          calcVerticalStart,
          win.scrollY,
        )
        break
      case 'right':
        left = calcPosWithFallback(calcRight, calcLeft, win.scrollX)
        top = calcPosWithFallback(calcVerticalCenter, win.scrollY)
        break
      case 'right-start':
        left = calcPosWithFallback(calcRight, calcLeft, win.scrollX)
        top = calcPosWithFallback(calcVerticalStart, win.scrollY)
        break
      case 'right-end':
        left = calcPosWithFallback(calcRight, calcLeft, win.scrollX)
        top = calcPosWithFallback(
          calcVerticalEnd,
          calcVerticalStart,
          win.scrollY,
        )
        break
      case 'bottom':
        top = calcPosWithFallback(calcBottom, calcTop, win.scrollY)
        left = calcPosWithFallback(calcHorizontalCenter, win.scrollX)
        break
      case 'bottom-start':
        top = calcPosWithFallback(calcBottom, calcTop, win.scrollY)
        left = calcPosWithFallback(calcHorizontalStart, win.scrollX)
        break
      case 'bottom-end':
        top = calcPosWithFallback(calcBottom, calcTop, win.scrollY)
        left = calcPosWithFallback(
          calcHorizontalEnd,
          calcHorizontalStart,
          win.scrollX,
        )
        break
      default:
        top = calcPosWithFallback(calcBottom, calcTop, win.scrollY)
        left = calcPosWithFallback(calcHorizontalCenter, win.scrollX)
        console.warn(
          '[Nex UI] Popup: Invalid placement value, using "bottom" instead.',
        )
        break
    }

    return {
      '--popup-x': `${left}px`,
      '--popup-y': `${top}px`,
    }
  })

  const recalcPos = useDebounce(
    () => {
      const updatedPos = calcPos()
      if (
        updatedPos?.['--popup-x'] !== pos?.['--popup-x'] ||
        updatedPos?.['--popup-y'] !== pos?.['--popup-y']
      ) {
        setPos(updatedPos)
      }
    },
    {
      wait: 100,
    },
  )

  const handleMount = useEvent(() => {
    if (!triggerRef?.current || !popupRef.current || initialized.current) {
      return
    }

    const newPos = calcPos()

    if (newPos) {
      setPos(newPos)
    }

    window.addEventListener('resize', recalcPos)
    window.addEventListener('scroll', recalcPos)

    const resizeObserver = new ResizeObserver((entries) => {
      if (initialRender.current) {
        initialRender.current = false
        return
      }
      for (const entry of entries) {
        if (
          entry.target === triggerRef.current ||
          entry.target === popupRef.current
        ) {
          recalcPos()
        }
      }
    })
    resizeObserver.observe(triggerRef.current)
    resizeObserver.observe(popupRef.current)
    resizeObserverRef.current = resizeObserver

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === triggerRef.current) {
            if (!entry.isIntersecting) {
              recalcPos.cancel()
              setOpen(false)
            }
          }
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0,
      },
    )
    intersectionObserver.observe(triggerRef.current)
    intersectionObserverRef.current = intersectionObserver

    initialized.current = true
  })

  const handleUnmount = useEvent(() => {
    if (initialized.current === false) {
      return
    }

    window.removeEventListener('resize', recalcPos)
    window.removeEventListener('scroll', recalcPos)
    resizeObserverRef.current?.disconnect()
    intersectionObserverRef.current?.disconnect()
    resizeObserverRef.current = null
    intersectionObserverRef.current = null
    recalcPos.cancel()
    initialized.current = false
    initialRender.current = true
  })

  const onMount = useEvent(() => {
    // Mainly handle the case where open defaults to true.
    if (open) handleMount()
  })

  const onUnmount = useEvent(() => {
    handleUnmount()
  })

  useEffect(() => {
    if (!open) {
      return
    }

    handleMount()

    return handleUnmount
  }, [handleMount, handleUnmount, open, triggerRef])

  return (
    <Portal onMount={onMount} onUnmount={onUnmount}>
      <PopupPortalRoot {...getPopupPortalRootProps()}>
        {children}
      </PopupPortalRoot>
    </Portal>
  )
}

function calcPosWithFallback(preferred: () => number, threshold: number): number
function calcPosWithFallback(
  preferred: () => number,
  fallback: () => number,
  threshold: number,
): number
function calcPosWithFallback(
  preferred: () => number,
  fallbackOrThreshold: (() => number) | number | undefined,
  threshold?: number,
): number {
  const preferredValue = preferred()

  if (typeof fallbackOrThreshold === 'number') {
    return preferredValue >= fallbackOrThreshold
      ? preferredValue
      : fallbackOrThreshold
  }

  if (
    typeof fallbackOrThreshold === 'function' &&
    typeof threshold === 'number'
  ) {
    return preferredValue >= threshold ? preferredValue : fallbackOrThreshold()
  }

  return preferredValue
}

PopupPositioner.displayName = 'PopupPositioner'
