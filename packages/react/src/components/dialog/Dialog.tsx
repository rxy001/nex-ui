'use client'

import { useDefaultProps } from '../utils'
import { Modal } from '../modal'
import { DialogPropsProvider } from './DialogContext'
import type { ElementType } from 'react'
import type { DialogProps } from './types'

export const Dialog = <RootComponent extends ElementType = 'div'>(
  inProps: DialogProps<RootComponent>,
) => {
  const props = useDefaultProps<DialogProps>({
    name: 'Dialog',
    props: inProps,
  })

  const {
    open,
    children,
    onOpenChange,
    defaultOpen,
    onClose,
    hideBackdrop = false,
    ...remainingProps
  } = props

  const ctx = {
    ...remainingProps,
    hideBackdrop,
  }

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      defaultOpen={defaultOpen}
      onClose={onClose}
    >
      <DialogPropsProvider value={ctx}>{children}</DialogPropsProvider>
    </Modal>
  )
}

Dialog.displayName = 'Dialog'
