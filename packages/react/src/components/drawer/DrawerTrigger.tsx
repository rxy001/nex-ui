import { ModalTrigger } from '../modal'
import type { DrawerTriggerProps } from './types'

export const DrawerTrigger = (props: DrawerTriggerProps) => (
  <ModalTrigger {...props} />
)

DrawerTrigger.displayName = 'DrawerTrigger'
