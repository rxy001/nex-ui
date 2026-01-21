'use client'

import { AnimatePresence } from 'motion/react'
import { useMemo } from 'react'
import { Portal } from '@nex-ui/utils'
import {
  PopperPortalPropsProvider,
  usePopperContext,
  usePopperPortalPropsContext,
} from './PopperContext'
import type { PopperPortalPropsContextValue } from './PopperContext'
import type { PopperPortalProps } from './types'

export const PopperPortal = ({
  children,
  container,
  keepMounted = false,
  disablePresence = false,
}: PopperPortalProps) => {
  const { open } = usePopperContext()
  const subPopperPortal = !!usePopperPortalPropsContext()

  const ctx = useMemo<PopperPortalPropsContextValue>(
    () => ({
      keepMounted,
      disablePresence,
    }),
    [keepMounted, disablePresence],
  )

  const renderChildren = () =>
    open || keepMounted ? (
      <Portal container={container}>
        <PopperPortalPropsProvider value={ctx}>
          {children}
        </PopperPortalPropsProvider>
      </Portal>
    ) : null

  if (disablePresence) {
    return renderChildren()
  }

  return (
    <AnimatePresence propagate={open && subPopperPortal}>
      {renderChildren()}
    </AnimatePresence>
  )
}

PopperPortal.displayName = 'PopperPortal'
