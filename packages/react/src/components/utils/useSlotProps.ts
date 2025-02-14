import clsx from 'clsx'
import { filter } from '@nex-ui/utils'
import type { StyleObject } from '@nex-ui/system'

type UseSlotPropsArgs<SlotProps, ForwardedProps> = {
  sx?: StyleObject | (StyleObject | undefined)[]
  classNames?: string
  externalSlotProps?: SlotProps
  externalForwardedProps?: ForwardedProps
}

type UseSlotPropsResult<SlotProps, ForwardedProps> = Omit<
  SlotProps & ForwardedProps,
  'sx'
> & {
  className?: string
  sx?: StyleObject | StyleObject[]
}

export const useSlotProps = <SlotProps, ForwardedProps>({
  sx,
  classNames,
  externalSlotProps,
  externalForwardedProps,
}: UseSlotPropsArgs<SlotProps, ForwardedProps>): UseSlotPropsResult<
  SlotProps,
  ForwardedProps
> => {
  const combinedProps = {
    ...externalSlotProps,
    ...externalForwardedProps,
  }

  // @ts-ignore
  const className = clsx(combinedProps.className, classNames)

  // @ts-ignore
  return {
    ...combinedProps,
    className,
    sx: Array.isArray(sx) ? filter(sx, Boolean) : sx,
  }
}
