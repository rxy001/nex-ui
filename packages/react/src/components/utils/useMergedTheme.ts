import { useMemo } from 'react'
import { isPlainObject, isFunction, mergeWith } from '@nex-ui/utils'
import type { StyleObject } from '@nex-ui/system'
import { useNexContext } from '../provider'
import type { ComponentsTheme } from '../../theme'

type Config<T extends object> = {
  name: keyof ComponentsTheme
  styles: T
  props: any
}

function customizer(objValue: any, srcValue: any) {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
}

const mergeStyles = (a: any, b: any) => mergeWith({}, a, b, customizer)

type BaseStyles = {
  base: StyleObject
  [key: string]: any
}

type SlotStyles = {
  slots: Record<string, StyleObject>
  [key: string]: any
}

export function useMergedTheme<T extends BaseStyles>(
  config: Config<T>,
): StyleObject
export function useMergedTheme<T extends SlotStyles>(
  config: Config<T>,
): Record<keyof T['slots'], StyleObject>
export function useMergedTheme<T extends BaseStyles | SlotStyles>({
  name,
  styles,
  props = {},
}: Config<T>) {
  const { styles: stylesFn, components } = useNexContext()
  const componentStyles = styles as any

  return useMemo(() => {
    const styleOverrides = components?.[name]?.styleOverrides

    if (isPlainObject(styleOverrides)) {
      return stylesFn(mergeStyles(componentStyles, styleOverrides))(props)
    }

    if (isFunction(styleOverrides)) {
      return mergeStyles(
        stylesFn(componentStyles)(props),
        styleOverrides(props) ?? {},
      )
    }
    return stylesFn(componentStyles)(props)
  }, [name, stylesFn, components, props, componentStyles])
}
