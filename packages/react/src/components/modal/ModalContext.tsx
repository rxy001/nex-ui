import { createContext } from '@nex-ui/utils'
import type { ModalProps } from './types'

interface ModalPropsContentValue extends ModalProps {
  setOpen: (open: boolean) => void
}

export const [ModalPropsProvider, useModalProps] =
  createContext<ModalPropsContentValue>({
    contextName: 'ModalPropsContext',
    hookName: 'useModalProps',
    providerName: 'ModalPropsProvider',
    strict: true,
    defaultValue: {
      setOpen: () => {},
    },
  })
