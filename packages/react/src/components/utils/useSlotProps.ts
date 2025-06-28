import clsx from 'clsx'
import { mergeProps, isFunction, isArray, isPlainObject } from '@nex-ui/utils'
import { useMemo } from 'react'
import type { ClassValue } from 'clsx'
import type { ArrayInterpolation } from '@nex-ui/system'
import type { SxProps } from '../../types/utils'

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
  sx?: SxProps<OwnerState>

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

  const resolvedSx = useMemo(() => {
    if (isFunction(props.sx)) {
      return [sx, props.sx(ownerState ?? {})].flat(1)
    }
    if (isArray(props.sx)) {
      return props.sx
        .reduce(
          (acc, v) => {
            if (isFunction(v)) {
              return [...acc, v(ownerState ?? {})]
            }
            return [...acc, v]
          },
          [sx],
        )
        .flat(1)
    }
    if (isPlainObject(props.sx)) {
      return [sx, props.sx]
    }
    return sx
  }, [ownerState, props, sx])

  return {
    ...props,
    className,
    sx: resolvedSx,
  } as unknown as UseSlotPropsResult<SlotProps, ForwardedProps, AdditionalProps>
}
