'use client'

import { AnimatePresence } from 'motion/react'
import { useMemo } from 'react'
import { Portal } from '@nex-ui/utils'
import { PopperPortalPropsProvider, usePopperContext } from './PopperContext'
import type { PopperPortalPropsContextValue } from './PopperContext'
import type { PopperPortalProps } from './types'

export const PopperPortal = ({
  children,
  container,
  keepMounted = false,
  disableAnimation = false,
}: PopperPortalProps) => {
  const { open } = usePopperContext()

  const ctx = useMemo<PopperPortalPropsContextValue>(
    () => ({
      container,
      keepMounted,
      disableAnimation,
    }),
    [container, keepMounted, disableAnimation],
  )

  const renderChildren = () =>
    open || keepMounted ? (
      <PopperPortalPropsProvider value={ctx}>
        {children}
      </PopperPortalPropsProvider>
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
