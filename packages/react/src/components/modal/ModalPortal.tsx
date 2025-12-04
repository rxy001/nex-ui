import { AnimatePresence } from 'motion/react'
import { useMemo } from 'react'
import { Portal } from '../utils'
import { ModalProvider, useModal } from './ModalContext'
import type { ModalPortalProps } from './types'

export const ModalPortal = ({
  children,
  container,
  keepMounted = false,
  disableAnimation = false,
}: ModalPortalProps) => {
  const modalState = useModal()

  const ctx = useMemo(
    () => ({
      ...modalState,
      container,
      keepMounted,
      disableAnimation,
    }),
    [modalState, container, keepMounted, disableAnimation],
  )

  const renderChildren = () =>
    modalState.open || keepMounted ? (
      <ModalProvider value={ctx}>{children}</ModalProvider>
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
