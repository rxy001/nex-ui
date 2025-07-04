import { useMemo } from 'react'
import { useControlledState } from '@nex-ui/hooks'
import { useDefaultProps } from '../utils'
import { ModalProvider, ModalPropsProvider } from './ModalContext'
import type { ElementType } from 'react'
import type { ModalOwnerState, ModalProps } from './types'

export const Modal = <RootComponent extends ElementType = 'div'>(
  inProps: ModalProps<RootComponent>,
) => {
  const props = useDefaultProps<ModalProps>({
    name: 'Modal',
    props: inProps,
  })

  const {
    children,
    onOpenChange,
    open: openProp,
    placement = 'center',
    scroll = 'outside',
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

  const rootProps: ModalOwnerState = {
    ...props,
    scroll,
    hideCloseButton,
    placement,
    open,
    keepMounted,
    defaultOpen,
    closeOnInteractBackdrop,
  }

  const ctx = useMemo(
    () => ({
      open,
      setOpen,
    }),
    [open, setOpen],
  )

  return (
    <ModalProvider value={ctx}>
      <ModalPropsProvider value={rootProps}>{children}</ModalPropsProvider>
    </ModalProvider>
  )
}

Modal.displayName = 'Modal'
