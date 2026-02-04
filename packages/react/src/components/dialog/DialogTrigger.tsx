import { ModalTrigger } from '../modal'
import type { DialogTriggerProps } from './types'

export const DialogTrigger = (props: DialogTriggerProps) => (
  <ModalTrigger {...props} />
)

DialogTrigger.displayName = 'DialogTrigger'
