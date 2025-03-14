import clsx from 'clsx'
import type { CssFnParams } from '@nex-ui/system'

type UseSlotPropsArgs<SlotProps, ForwardedProps> = {
  sx?: CssFnParams[] | CssFnParams
  classNames?: string
  externalSlotProps?: SlotProps
  externalForwardedProps?: ForwardedProps
}

type UseSlotPropsResult<SlotProps, ForwardedProps> = Omit<
  SlotProps & ForwardedProps,
  'sx'
> & {
  className?: string
  sx?: CssFnParams
}

export const useSlotProps = <SlotProps, ForwardedProps>({
  sx,
  classNames: classNamesProp,
  externalSlotProps,
  externalForwardedProps,
}: UseSlotPropsArgs<SlotProps, ForwardedProps>): UseSlotPropsResult<
  SlotProps,
  ForwardedProps
> => {
  const combinedProps = {
    ...externalSlotProps,
    ...externalForwardedProps,
  } as UseSlotPropsResult<SlotProps, ForwardedProps>

  const className = clsx(combinedProps.className, classNamesProp)

  return {
    ...combinedProps,
    className,
    sx: Array.isArray(sx) ? sx.flat() : sx,
  }
}
