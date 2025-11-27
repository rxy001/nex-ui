'use client'

import { useDefaultProps, useSlot } from '../utils'
import { Modal } from '../modal'
import { DrawerProvider } from './DrawerContext'
import type { ElementType } from 'react'
import type { DrawerProps } from './types'

export const Drawer = <RootComponent extends ElementType = 'div'>(
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
    closeOnEscape,
    closeOnInteractBackdrop,
    preventScroll,
    onClose,
    hideBackdrop = false,
    ...remainingProps
  } = props

  const ctx = {
    ...remainingProps,
    hideBackdrop,
  }

  const [DrawerRoot, getDrawerRootProps] = useSlot({
    elementType: Modal,
    shouldForwardComponent: false,
    externalForwardedProps: {
      open,
      restoreFocus,
      onOpenChange,
      defaultOpen,
      preventScroll,
      closeOnEscape,
      onClose,
      closeOnInteractOutside: !hideBackdrop && closeOnInteractBackdrop,
    },
  })

  return (
    <DrawerRoot {...getDrawerRootProps()}>
      <DrawerProvider value={ctx}>{children}</DrawerProvider>
    </DrawerRoot>
  )
}

Drawer.displayName = 'Drawer'
