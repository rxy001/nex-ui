import clsx from 'clsx'
import { mergeProps, map, isFunction, isArray } from '@nex-ui/utils'
import type { ClassValue } from 'clsx'
import type { ArrayInterpolation, Interpolation } from '@nex-ui/system'

type UseSlotPropsArgs<
  SlotProps extends {},
  ForwardedProps extends {},
  AdditionalProps extends {},
  OwnerState extends {},
> = {
  ownerState?: OwnerState
  /**
   * The style of the slot.
   */
  sx?: Interpolation<OwnerState>

  /**
   * Extra class name(s) to be placed on the slot.
   */
  classNames?: ClassValue

  /**
   * The properties of the component SlotProps.*
   */
  externalSlotProps?: SlotProps

  /**
   * Extra props placed on the component that should be forwarded to the slot.
   */
  externalForwardedProps?: ForwardedProps

  /**
   * Additional props to be placed on the slot.
   */
  additionalProps?: AdditionalProps
}

type UseSlotPropsResult<SlotProps, ForwardedProps, AdditionalProps> = Omit<
  SlotProps & ForwardedProps & AdditionalProps,
  'className' | 'sx'
> & {
  className: string
  sx: ArrayInterpolation
}

export const useSlotProps = <
  SlotProps extends {},
  ForwardedProps extends {},
  AdditionalProps extends {},
  OwnerState extends {},
>({
  ownerState,
  sx,
  externalSlotProps,
  externalForwardedProps,
  additionalProps,
  classNames: classNamesProp,
}: UseSlotPropsArgs<
  SlotProps,
  ForwardedProps,
  AdditionalProps,
  OwnerState
>): UseSlotPropsResult<SlotProps, ForwardedProps, AdditionalProps> => {
  const props = mergeProps(
    additionalProps,
    externalForwardedProps,
    externalSlotProps,
  )

  const className = clsx(classNamesProp, props?.className)

  const resolveSx = (
    arg: ArrayInterpolation<OwnerState>,
  ): ArrayInterpolation<OwnerState> => {
    return map(arg, (v) => {
      if (isFunction(v)) {
        return v(ownerState!)
      }
      if (isArray(v)) {
        return resolveSx(v)
      }
      return v
    })
  }

  return {
    ...props,
    className,
    sx: resolveSx([sx, props.sx]),
  } as unknown as UseSlotPropsResult<SlotProps, ForwardedProps, AdditionalProps>
}
