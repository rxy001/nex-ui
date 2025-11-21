'use client'

import { AnimatePresence } from 'motion/react'
import { Portal } from '../utils'
import { usePopper } from './PopperContext'
import type { PopperPortalProps } from './types'

export const PopperPortal = ({
  children,
  keepMounted = false,
  ...props
}: PopperPortalProps) => {
  const { open, keepMountedRef } = usePopper()

  keepMountedRef.current = keepMounted

  return (
    <Portal {...props}>
      <AnimatePresence>{open || keepMounted ? children : null}</AnimatePresence>
    </Portal>
  )
}

PopperPortal.displayName = 'PopperPortal'
