import clsx from 'clsx'
import { mergeProps, mergeRefs } from '@nex-ui/utils'
import { useMemo } from 'react'
import { nex } from '@nex-ui/styled'
import type { ElementType as ReactElementType } from 'react'
import type { ClassValue } from 'clsx'
import type { NexComponent } from '@nex-ui/styled'
import type { CSSObject, Interpolation } from '@nex-ui/system'
import type {
  Overwrite,
  ComponentPropsWithCommonProps,
} from '../../types/utils'

export type UseSlotArgs<
  ElementType extends ReactElementType,
  SlotProps extends {} = {},
  ForwardedProps extends {} = {},
  AdditonalProps extends {} = {},
  ShouldForwardComponent extends boolean = boolean,
> = {
  /**
   * The slot's default component
   */
  elementType: ElementType

  /**
   * The slot's style.
   */
  style?: CSSObject

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
  additionalProps?: AdditonalProps

  /**
   * The accessibility props of the slot.
   */
  a11y?: {}

  /**
   * If true, the component will be resolved from the `nex` styled factory.
   *
   * @default true
   */
  shouldForwardComponent?: ShouldForwardComponent
}

type SlotComponentProps<SlotProps, ForwardedProps> = Overwrite<
  SlotProps & ForwardedProps,
  {
    className: string
    sx: Interpolation
  }
>

export const useSlot = <
  ElementType extends ReactElementType,
  SlotProps extends ComponentPropsWithCommonProps<ElementType>,
  ForwardedProps extends ComponentPropsWithCommonProps<ElementType>,
  AdditonalProps extends ComponentPropsWithCommonProps<ElementType>,
  ShouldForwardComponent extends boolean = true,
>(
  args: UseSlotArgs<
    ElementType,
    SlotProps,
    ForwardedProps,
    AdditonalProps,
    ShouldForwardComponent
  >,
) => {
  const {
    a11y,
    style,
    elementType,
    classNames,
    externalSlotProps,
    additionalProps,
    externalForwardedProps,
    shouldForwardComponent = true,
  } = args
  const getProps = () => {
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

    const className = clsx(classNames, props?.className)

    let mergedSx: Interpolation = style

    if (props.sx) {
      mergedSx = [style, props.sx]
    }

    return {
      ...props,
      ref,
      className,
      sx: mergedSx,
    }
  }

  const Component = useMemo(
    () =>
      shouldForwardComponent
        ? (nex[elementType as keyof typeof nex] ?? nex(elementType))
        : elementType,
    [elementType, shouldForwardComponent],
  )

  return [Component, getProps] as unknown as [
    ShouldForwardComponent extends true
      ? NexComponent<ElementType>
      : ElementType,
    () => SlotComponentProps<SlotProps, ForwardedProps>,
  ]
}
