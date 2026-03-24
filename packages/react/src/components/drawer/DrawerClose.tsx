import { ModalClose } from '../modal'
import type { DrawerCloseProps } from './types'

export function DrawerClose(props: DrawerCloseProps) {
  return <ModalClose {...props} />
}

DrawerClose.displayName = 'DrawerClose'
