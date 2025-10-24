import { Popper } from '../popper'
import { useDefaultProps } from '../utils'
import { PopoverProvider } from './PopoverContext'
import type { PopoverProps } from './types'

export const Popover = (inProps: PopoverProps) => {
  const props = useDefaultProps<PopoverProps>({
    name: 'Popover',
    props: inProps,
  })

  const {
    children,
    open,
    openDelay,
    closeDelay,
    defaultOpen,
    onOpenChange,
    ...remainingProps
  } = props

  return (
    <Popper
      open={open}
      openDelay={openDelay}
      closeDelay={closeDelay}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <PopoverProvider value={remainingProps}>{children}</PopoverProvider>
    </Popper>
  )
}

Popover.displayName = 'Popover'
