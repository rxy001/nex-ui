import clsx from 'clsx'
import { mergeProps, kebabCase } from '@nex-ui/utils'
import type { ComponentType } from 'react'
import type { ClassValue } from 'clsx'
import type { CSSObject, Interpolation } from '@nex-ui/system'

type DataAttrs = Record<string, string | number | boolean | undefined>

export type UseSlotProps<
  Component,
  SlotProps = {},
  ForwardedProps = {},
  AdditionalProps = {},
  AriaProps = {},
> = {
  /**
   * The slot's default component
   */
  component: Component

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
  additionalProps?: AdditionalProps

  /**
   * The accessibility props of the slot.
   */
  ariaProps?: AriaProps

  /**
   * Data attributes to be spread to the element.
   */
  dataAttrs?: DataAttrs
}

export const useSlot = <
  ElementType extends ComponentType<{
    sx?: Interpolation
  }>,
  SlotProps extends object = {},
  ForwardedProps extends object = {},
  AdditionalProps extends object = {},
  AriaProps extends object = {},
>(
  args: UseSlotProps<
    ElementType,
    SlotProps,
    ForwardedProps,
    AdditionalProps,
    AriaProps
  >,
) => {
  const {
    ariaProps,
    style,
    component,
    classNames,
    externalSlotProps,
    additionalProps,
    externalForwardedProps,
    dataAttrs = {},
  } = args
  const getProps = () => {
    const dataAttrsProps = generateDataAttrs(dataAttrs)

    const props = mergeProps(
      dataAttrsProps,
      ariaProps,
      additionalProps,
      externalForwardedProps,
      externalSlotProps,
    )

    const className = clsx(classNames, props?.className)

    let mergedSx: Interpolation = null

    if (props.sx && style) {
      mergedSx = [style, props.sx]
    } else if (style) {
      mergedSx = style
    } else if (props.sx) {
      mergedSx = props.sx
    }

    return {
      ...props,
      className: className === '' ? undefined : className,
      sx: mergedSx,
    } as {
      className?: string
      sx?: Interpolation
    } & AriaProps &
      AdditionalProps &
      ForwardedProps &
      SlotProps
  }

  return [component, getProps] as const
}

function generateDataAttrs(dataAttrs: DataAttrs) {
  return Object.entries(dataAttrs).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      acc[`data-${kebabCase(key)}`] = value
    }

    return acc
  }, {} as DataAttrs)
}
