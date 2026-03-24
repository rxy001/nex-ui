import { ModalClose } from '../modal'
import type { DialogCloseProps } from './types'

export function DialogClose(props: DialogCloseProps) {
  return <ModalClose {...props} />
}

DialogClose.displayName = 'DialogClose'
