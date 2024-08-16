import { useMemo } from 'react'
import { isPlainObject, isFunction, mergeWith } from '@nex-ui/utils'
import type { CSSObject, StyleObject } from '@nex-ui/system'
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
): CSSObject
export function useMergedTheme<T extends SlotStyles>(
  config: Config<T>,
): Record<keyof T['slots'], CSSObject>
export function useMergedTheme<T extends BaseStyles | SlotStyles>({
  name,
  styles,
  props = {},
}: Config<T>) {
  const { normalize, styles: stylesFn, components } = useNexContext()
  const componentStyles = styles as any

  return useMemo(() => {
    const styleOverrides = components?.[name]?.styleOverrides

    if (isPlainObject(styleOverrides)) {
      return stylesFn(
        mergeWith({}, componentStyles, styleOverrides, customizer),
      )(props)
    }
    if (isFunction(styleOverrides)) {
      return mergeWith(
        {},
        stylesFn(componentStyles)(props),
        normalize(styleOverrides(props) ?? {}, componentStyles.colorPalette),
        customizer,
      )
    }
    return stylesFn(componentStyles)(props)
  }, [name, stylesFn, components, props, normalize, componentStyles])
}
