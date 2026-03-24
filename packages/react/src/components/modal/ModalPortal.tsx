'use client'

import { useMemo } from 'react'
import { Portal } from '@nex-ui/utils'
import { ModalPortalPropsProvider, useModalContext } from './ModalContext'
import type { ModalPortalPropsContextValue } from './ModalContext'
import type { ModalPortalProps } from './types'

export function ModalPortal({
  children,
  container,
  forceMount = false,
}: ModalPortalProps) {
  const { open } = useModalContext()

  const ctx = useMemo<ModalPortalPropsContextValue>(
    () => ({
      container,
      forceMount,
    }),
    [container, forceMount],
  )

  return open || forceMount ? (
    <Portal container={container}>
      <ModalPortalPropsProvider value={ctx}>
        {children}
      </ModalPortalPropsProvider>
    </Portal>
  ) : null
}

ModalPortal.displayName = 'ModalPortal'
