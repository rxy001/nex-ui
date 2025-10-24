import { useSlot } from '../utils'
import { PopperTrigger } from '../popper'
import type { PopoverTriggerProps } from './types'

export const PopoverTrigger = (props: PopoverTriggerProps) => {
  const [PopoverTriggerRoot, getPopoverTriggerRootProps] = useSlot({
    elementType: PopperTrigger,
    shouldForwardComponent: false,
    externalForwardedProps: {
      ...props,
      action: 'click',
    },
  })

  return <PopoverTriggerRoot {...getPopoverTriggerRootProps()} />
}

PopoverTrigger.displayName = 'PopoverTrigger'
