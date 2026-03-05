'use client'

import { AnimatePresence } from 'motion/react'
import { useMemo } from 'react'
import { Portal } from '@nex-ui/utils'
import {
  ModalPortalPropsProvider,
  useModalContext,
  useModalPortalPropsContext,
} from './ModalContext'
import type { ModalPortalPropsContextValue } from './ModalContext'
import type { ModalPortalProps } from './types'

export const ModalPortal = ({
  children,
  container,
  keepMounted = false,
  disableAnimatePresence = false,
}: ModalPortalProps) => {
  const { open } = useModalContext()
  const subModalPortal = !!useModalPortalPropsContext()

  const ctx = useMemo<ModalPortalPropsContextValue>(
    () => ({
      container,
      keepMounted,
      disableAnimatePresence,
    }),
    [container, keepMounted, disableAnimatePresence],
  )

  const renderChildren = () =>
    open || keepMounted ? (
      <Portal container={container}>
        <ModalPortalPropsProvider value={ctx}>
          {children}
        </ModalPortalPropsProvider>
      </Portal>
    ) : null

  if (disableAnimatePresence) {
    return renderChildren()
  }

  return (
    <AnimatePresence propagate={open && subModalPortal}>
      {renderChildren()}
    </AnimatePresence>
  )
}

ModalPortal.displayName = 'ModalPortal'
