import { ModalClose } from '../modal'
import type { DrawerCloseProps } from './types'

export const DrawerClose = (props: DrawerCloseProps) => (
  <ModalClose {...props} />
)

DrawerClose.displayName = 'DrawerClose'
