'use client'

import { useDefaultProps, useSlot } from '../utils'
import { Modal } from '../modal'
import { DrawerProvider } from './DrawerContext'
import type { DOMMotionComponents } from 'motion/react'
import type { ElementType } from 'react'
import type { DrawerProps } from './types'

export const Drawer = <
  RootComponent extends ElementType = DOMMotionComponents['div'],
>(
  inProps: DrawerProps<RootComponent>,
) => {
  const props = useDefaultProps<DrawerProps>({
    name: 'Drawer',
    props: inProps,
  })

  const {
    open,
    children,
    restoreFocus,
    onOpenChange,
    defaultOpen,
    container,
    keepMounted,
    closeOnEscape,
    closeOnInteractBackdrop,
    preventScroll,
    onClose,
    hideBackdrop = false,
    ...remainingProps
  } = props

  const [RootSlot, getRootSlotProps] = useSlot({
    elementType: Modal,
    shouldForwardComponent: false,
    externalForwardedProps: {
      open,
      container,
      restoreFocus,
      onOpenChange,
      defaultOpen,
      keepMounted,
      preventScroll,
      closeOnEscape,
      onClose,
      closeOnInteractOutside: !hideBackdrop && closeOnInteractBackdrop,
    },
  })

  return (
    <RootSlot {...getRootSlotProps()}>
      <DrawerProvider
        value={{
          ...remainingProps,
          hideBackdrop,
        }}
      >
        {children}
      </DrawerProvider>
    </RootSlot>
  )
}

Drawer.displayName = 'Drawer'
