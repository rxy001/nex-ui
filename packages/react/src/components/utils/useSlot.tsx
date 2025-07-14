import clsx from 'clsx'
import {
  mergeProps,
  isFunction,
  isArray,
  isPlainObject,
  mergeRefs,
} from '@nex-ui/utils'
import { useMemo } from 'react'
import { nex } from '@nex-ui/styled'
import type { ElementType as ReactElementType } from 'react'
import type { ClassValue } from 'clsx'
import type { NexComponent } from '@nex-ui/styled'
import type { CSSObject, Interpolation } from '@nex-ui/system'
import type {
  FunctionInterpolation,
  Overwrite,
  ComponentPropsWithCommonProps,
} from '../../types/utils'

type UseSlotArgs<
  ElementType extends ReactElementType,
  SlotProps extends {},
  ForwardedProps extends {},
  AdditonalProps extends {},
  OwnerState extends {},
  ShouldForwardComponent extends boolean,
> = {
  /**
   * The slot's default component
   */
  elementType: ElementType

  /**
   * The component's ownerState
   */
  ownerState?: OwnerState

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

  a11y?: {}

  shouldForwardComponent?: ShouldForwardComponent
}

type SlotComponentProps<SlotProps, ForwardedProps> = Overwrite<
  SlotProps & ForwardedProps,
  {
    className: string
    sx: Interpolation
  }
>

const resolve = <T,>(sx: FunctionInterpolation<T>, ownerState: T) => {
  const css = sx(ownerState)
  return isArray(css) ? css : [css]
}

export const useSlot = <
  ElementType extends ReactElementType,
  OwnerState extends {},
  SlotProps extends ComponentPropsWithCommonProps<ElementType, OwnerState>,
  ForwardedProps extends ComponentPropsWithCommonProps<ElementType, OwnerState>,
  AdditonalProps extends ComponentPropsWithCommonProps<ElementType, OwnerState>,
  ShouldForwardComponent extends boolean = true,
>(
  args: UseSlotArgs<
    ElementType,
    SlotProps,
    ForwardedProps,
    AdditonalProps,
    OwnerState,
    ShouldForwardComponent
  >,
) => {
  const {
    a11y,
    style,
    ownerState,
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

    if (isFunction(props.sx)) {
      mergedSx = [style, ...resolve(props.sx, ownerState)]
    } else if (isArray(props.sx)) {
      mergedSx = props.sx.reduce(
        (acc, v) => {
          if (isFunction(v)) {
            return [...acc, ...resolve(v, ownerState)]
          }
          return [...acc, v]
        },
        [style],
      )
    } else if (isPlainObject(props.sx)) {
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
    () => (shouldForwardComponent ? nex(elementType) : elementType),
    [elementType, shouldForwardComponent],
  )

  return [Component, getProps] as unknown as [
    ShouldForwardComponent extends true
      ? NexComponent<ElementType>
      : ElementType,
    () => SlotComponentProps<SlotProps, ForwardedProps>,
  ]
}
