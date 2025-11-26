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
  animateDisabled = false,
}: PopperPortalProps) => {
  const popperState = usePopper()

  const ctx = useMemo(
    () => ({
      ...popperState,
      keepMounted,
      animateDisabled,
    }),
    [popperState, keepMounted, animateDisabled],
  )

  const renderChildren = () =>
    popperState.open || keepMounted ? (
      <PopperProvider value={ctx}>{children}</PopperProvider>
    ) : null

  return (
    <Portal container={container}>
      {animateDisabled ? (
        renderChildren()
      ) : (
        <AnimatePresence>{renderChildren()}</AnimatePresence>
      )}
    </Portal>
  )
}

PopperPortal.displayName = 'PopperPortal'
