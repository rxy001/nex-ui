'use client'

import { useControlledState } from '@nex-ui/hooks'
import { useDefaultProps } from '../utils'
import { Modal } from '../modal'
import type { DialogProps } from './types'

export const Dialog = (inProps: DialogProps) => {
  const props = useDefaultProps<DialogProps>({
    name: 'Dialog',
    props: inProps,
  })

  const { children, onOpenChange, defaultOpen, onClose, open: openProp } = props

  const [open, setOpen] = useControlledState(
    openProp,
    defaultOpen,
    onOpenChange,
  )

  return (
    <Modal open={open} onOpenChange={setOpen} onClose={onClose}>
      {children}
    </Modal>
  )
}

Dialog.displayName = 'Dialog'
