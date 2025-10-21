'use client'

import { useControlledState, useDebounce, useUnmount } from '@nex-ui/hooks'
import { useCallback, useMemo, useRef, useId, useEffect } from 'react'
import { PopperProvider } from './PopperContext'
import { PopperManager } from './PopperManager'
import type { PopperProps } from './types'
import type { PopperContextValue } from './PopperContext'

const popperManager = new PopperManager()

export const Popper = (props: PopperProps) => {
  const {
    children,
    onOpenChange,
    container,
    shift,
    flip,
    offset,
    showArrow,
    open: openProp,
    openDelay = 100,
    closeDelay = 100,
    keepMounted = false,
    defaultOpen = false,
    closeOnEscape = true,
    placement = 'top',
  } = props
  const referenceRef = useRef<HTMLDivElement>(null)
  const popperRootRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)
  const id = useId()

  const popperRootId = `nui-popper-${id}`

  const [open, setOpen] = useControlledState(
    openProp,
    defaultOpen,
    onOpenChange,
  )

  const debouncedShowPopper = useDebounce(
    () => {
      if (!open) setOpen(true)
    },
    {
      wait: openDelay,
    },
  )

  const debouncedHidePopper = useDebounce(
    () => {
      if (open) setOpen(false)
    },
    {
      wait: closeDelay,
    },
  )

  const showPopper = useCallback(() => {
    debouncedHidePopper.cancel()
    debouncedShowPopper()
    popperManager.flush(id)
  }, [debouncedHidePopper, debouncedShowPopper, id])

  const hidePopper = useCallback(() => {
    debouncedShowPopper.cancel()
    debouncedHidePopper()
  }, [debouncedHidePopper, debouncedShowPopper])

  useUnmount(() => {
    debouncedHidePopper.cancel()
    debouncedShowPopper.cancel()
  })

  const ctx = useMemo<PopperContextValue>(
    () => ({
      open,
      showArrow,
      setOpen,
      referenceRef,
      popperRootRef,
      arrowRef,
      container,
      offset,
      placement,
      flip,
      shift,
      keepMounted,
      closeOnEscape,
      openDelay,
      closeDelay,
      showPopper,
      hidePopper,
      popperRootId,
    }),
    [
      open,
      showArrow,
      setOpen,
      container,
      offset,
      placement,
      flip,
      shift,
      keepMounted,
      closeOnEscape,
      openDelay,
      closeDelay,
      showPopper,
      hidePopper,
      popperRootId,
    ],
  )

  useEffect(() => {
    if (open) {
      popperManager.register(id, debouncedHidePopper.flush)

      return () => popperManager.unregister(id)
    }
  }, [debouncedHidePopper.flush, id, open])

  return <PopperProvider value={ctx}>{children}</PopperProvider>
}

Popper.displayName = 'Popper'
