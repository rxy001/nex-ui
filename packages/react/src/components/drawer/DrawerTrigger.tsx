import { ModalTrigger } from '../modal'
import type { DrawerTriggerProps } from './types'

export function DrawerTrigger(props: DrawerTriggerProps) {
  return <ModalTrigger {...props} />
}

DrawerTrigger.displayName = 'DrawerTrigger'
