import { AnimatePresence } from 'motion/react'
import { Portal } from '../utils'
import { useModal } from './ModalContext'
import type { ModalPortalProps } from './types'

export const ModalPortal = ({
  children,
  container,
  keepMounted,
}: ModalPortalProps) => {
  const { open, containerRef } = useModal()

  containerRef.current = container

  return (
    <Portal>
      <AnimatePresence>{open || keepMounted ? children : null}</AnimatePresence>
    </Portal>
  )
}

ModalPortal.displayName = 'ModalPortal'
