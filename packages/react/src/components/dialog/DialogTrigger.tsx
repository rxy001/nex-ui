import { ModalTrigger } from '../modal'
import type { DialogTriggerProps } from './types'

export function DialogTrigger(props: DialogTriggerProps) {
  return <ModalTrigger {...props} />
}

DialogTrigger.displayName = 'DialogTrigger'
