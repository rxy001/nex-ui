'use client'

import { useControlledState } from '@nex-ui/hooks'
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
    children,
    onOpenChange,
    defaultOpen,
    onClose,
    open: openProp,
    hideBackdrop = false,
    ...remainingProps
  } = props

  const [open, setOpen] = useControlledState(
    openProp,
    defaultOpen,
    onOpenChange,
  )

  const ctx = {
    ...remainingProps,
    hideBackdrop,
  }

  return (
    <Modal open={open} onOpenChange={setOpen} onClose={onClose}>
      <DialogPropsProvider value={ctx}>{children}</DialogPropsProvider>
    </Modal>
  )
}

Dialog.displayName = 'Dialog'
