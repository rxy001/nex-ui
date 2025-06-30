import { createContext } from '@nex-ui/utils'
import type { ModalOwnerState } from './types'

interface ModalContentValue {
  open: boolean
  setOpen: (open: boolean) => void
}

export const [ModalProvider, useModal] = createContext<ModalContentValue>({
  contextName: 'ModalContext',
  hookName: 'useModal',
  providerName: 'ModalProvider',
  strict: true,
  defaultValue: {
    open: false,
    setOpen: () => {},
  },
})

export const [ModalPropsProvider, useModalProps] =
  createContext<ModalOwnerState>({
    contextName: 'ModalPropsContext',
    hookName: 'useModalProps',
    providerName: 'ModalPropsProvider',
    strict: true,
    defaultValue: {
      open: false,
      keepMounted: false,
    },
  })
