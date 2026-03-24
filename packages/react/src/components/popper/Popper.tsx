'use client'

import { useEvent } from '@nex-ui/hooks'
import { useMemo, useRef } from 'react'
import { PopperProvider } from './PopperContext'
import type { PopperProps } from './types'
import type { PopperContextValue } from './PopperContext'

/**
 * Popper is a lower-level construct that is leveraged by the following components:
 *
 * - Tooltip
 * - Popover
 * - Menu
 */

export function Popper(props: PopperProps) {
  const { open, children, onOpenChange, onClose } = props
  const triggerRef = useRef<HTMLElement>(null)
  const popperRootRef = useRef<HTMLDivElement>(null)

  const previousOpenRef = useRef(open)

  const setOpen = useEvent((value: boolean) => {
    if (previousOpenRef.current && !value) {
      onClose?.()
    }
    onOpenChange?.(value)
    previousOpenRef.current = value
  })

  const ctx = useMemo<PopperContextValue>(
    () => ({
      open,
      triggerRef,
      popperRootRef,
      setOpen,
    }),
    [open, setOpen],
  )

  return <PopperProvider value={ctx}>{children}</PopperProvider>
}

Popper.displayName = 'Popper'
