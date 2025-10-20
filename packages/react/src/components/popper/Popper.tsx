'use client'

import { useControlledState, useDebounce, useUnmount } from '@nex-ui/hooks'
import { useCallback, useMemo, useRef, useId } from 'react'
import { PopperProvider } from './PopperContext'
import type { PopperProps } from './types'
import type { PopperContextValue } from './PopperContext'

export const Popper = (props: PopperProps) => {
  const {
    children,
    onOpenChange,
    container,
    shift,
    flip,
    offset,
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
  }, [debouncedHidePopper, debouncedShowPopper])

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
      setOpen,
      referenceRef,
      popperRootRef,
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

  return <PopperProvider value={ctx}>{children}</PopperProvider>
}

Popper.displayName = 'Popper'
