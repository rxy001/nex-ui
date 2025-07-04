import { useControlledState } from '@nex-ui/hooks'
import { ModalPropsProvider } from './ModalContext'
import type { ModalProps } from './types'

export const Modal = (props: ModalProps) => {
  const {
    children,
    onOpenChange,
    open: openProp,
    defaultOpen = false,
    keepMounted = false,
    hideCloseButton = false,
    closeOnInteractBackdrop = true,
  } = props

  const [open, setOpen] = useControlledState(
    openProp,
    defaultOpen,
    onOpenChange,
  )

  const rootProps = {
    ...props,
    setOpen,
    hideCloseButton,
    open,
    keepMounted,
    defaultOpen,
    closeOnInteractBackdrop,
  }

  return <ModalPropsProvider value={rootProps}>{children}</ModalPropsProvider>
}

Modal.displayName = 'Modal'
