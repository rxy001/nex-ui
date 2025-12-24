'use client'

import { useDefaultProps } from '../utils'
import { Modal } from '../modal'
import { DialogRootPropsProvider } from './DialogContext'
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
      <DialogRootPropsProvider value={ctx}>{children}</DialogRootPropsProvider>
    </Modal>
  )
}

Dialog.displayName = 'Dialog'
