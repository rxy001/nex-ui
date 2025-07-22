import { mergeProps, isArray, isPlainObject } from '@nex-ui/utils'
import { useMemo } from 'react'
import type { Interpolation } from '@nex-ui/system'

export type UseSlotPropsArgs<
  SlotProps extends {} = {},
  ForwardedProps extends {} = {},
  AdditionalProps extends {} = {},
> = {
  /**
   * The style of the slot.
   */
  style?: Interpolation

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

  a11y?: {}
}

type UseSlotPropsResult<SlotProps, ForwardedProps, AdditionalProps> =
  SlotProps & ForwardedProps & AdditionalProps

export const useSlotProps = <
  SlotProps extends {},
  ForwardedProps extends {},
  AdditionalProps extends {},
>({
  style,
  externalSlotProps,
  externalForwardedProps,
  additionalProps,
  a11y,
}: UseSlotPropsArgs<
  SlotProps,
  ForwardedProps,
  AdditionalProps
>): UseSlotPropsResult<SlotProps, ForwardedProps, AdditionalProps> => {
  const props = mergeProps(
    additionalProps,
    externalForwardedProps,
    externalSlotProps,
    a11y,
  )

  const resolvedSx = useMemo(() => {
    if (!style) {
      return props.sx
    }
    if (isArray(props.sx)) {
      return props.sx.reduce((acc, v) => [...acc, v], [style]).flat(1)
    }
    if (isPlainObject(props.sx)) {
      return [style, props.sx]
    }
    return style
  }, [props.sx, style])

  return {
    ...props,
    sx: resolvedSx,
  } as unknown as UseSlotPropsResult<SlotProps, ForwardedProps, AdditionalProps>
}
