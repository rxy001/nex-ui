'use client'

import { AnimatePresence } from 'motion/react'
import { useMemo } from 'react'
import { Portal } from '@nex-ui/utils'
import { ModalPortalPropsProvider, useModal } from './ModalContext'
import type { ModalPortalPropsContextValue } from './ModalContext'
import type { ModalPortalProps } from './types'

export const ModalPortal = ({
  children,
  container,
  keepMounted = false,
  disableAnimation = false,
}: ModalPortalProps) => {
  const { open } = useModal()

  const ctx = useMemo<ModalPortalPropsContextValue>(
    () => ({
      container,
      keepMounted,
      disableAnimation,
    }),
    [container, keepMounted, disableAnimation],
  )

  const renderChildren = () =>
    open || keepMounted ? (
      <ModalPortalPropsProvider value={ctx}>
        {children}
      </ModalPortalPropsProvider>
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

ModalPortal.displayName = 'ModalPortal'
