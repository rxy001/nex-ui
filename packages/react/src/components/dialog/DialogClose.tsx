import { ModalClose } from '../modal'
import type { DialogCloseProps } from './types'

export const DialogClose = (props: DialogCloseProps) => (
  <ModalClose {...props} />
)

DialogClose.displayName = 'DialogClose'
