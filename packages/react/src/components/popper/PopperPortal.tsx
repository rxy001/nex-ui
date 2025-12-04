'use client'

import { AnimatePresence } from 'motion/react'
import { useMemo } from 'react'
import { Portal } from '../utils'
import { PopperProvider, usePopper } from './PopperContext'
import type { PopperPortalProps } from './types'

export const PopperPortal = ({
  children,
  container,
  keepMounted = false,
  disableAnimation = false,
}: PopperPortalProps) => {
  const popperState = usePopper()

  const ctx = useMemo(
    () => ({
      ...popperState,
      keepMounted,
      disableAnimation,
    }),
    [popperState, keepMounted, disableAnimation],
  )

  const renderChildren = () =>
    popperState.open || keepMounted ? (
      <PopperProvider value={ctx}>{children}</PopperProvider>
    ) : null

  return (
    <Portal container={container}>
      {disableAnimation ? (
        renderChildren()
      ) : (
        <AnimatePresence>{renderChildren()}</AnimatePresence>
      )}
    </Portal>
  )
}

PopperPortal.displayName = 'PopperPortal'
