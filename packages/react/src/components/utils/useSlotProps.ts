import { mergeProps, mergeRefs } from '@nex-ui/utils'
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

  /**
   * The accessibility props of the slot.
   */
  a11y?: {}
}

type UseSlotPropsResult<SlotProps, ForwardedProps, AdditionalProps> =
  SlotProps & ForwardedProps & AdditionalProps

export const useSlotProps = <
  SlotProps extends Record<string, any>,
  ForwardedProps extends Record<string, any>,
  AdditionalProps extends Record<string, any>,
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

  const ref = mergeRefs(
    additionalProps?.ref,
    externalForwardedProps?.ref,
    externalSlotProps?.ref,
  )

  const resolvedSx = useMemo(() => {
    if (style && props.sx) {
      return [style, props.sx]
    }
    if (props.sx) {
      return props.sx
    }
    return style
  }, [props.sx, style])

  return {
    ...props,
    ref,
    sx: resolvedSx,
  } as unknown as UseSlotPropsResult<SlotProps, ForwardedProps, AdditionalProps>
}
