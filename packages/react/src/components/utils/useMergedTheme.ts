import { useMemo } from 'react'
import { isPlainObject, isFunction, mergeWith } from '@nex-ui/utils'
import { useNexContext } from '../provider'
import type { ComponentsTheme } from '../../theme'

type Config = {
  name: keyof ComponentsTheme
  styles: any
  props: any
}

function customizer(objValue: any, srcValue: any) {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
}

export const useMergedTheme = ({ name, styles, props = {} }: Config) => {
  const { normalize, styles: stylesFn, components } = useNexContext()

  return useMemo(() => {
    const styleOverrides = components?.[name]?.styleOverrides

    if (isPlainObject(styleOverrides)) {
      return stylesFn(mergeWith({}, styles, styleOverrides, customizer))(props)
    }
    if (isFunction(styleOverrides)) {
      return mergeWith(
        {},
        stylesFn(styles)(props),
        normalize(styleOverrides(props) ?? {}, styles.colorPalette),
        customizer,
      )
    }
    return stylesFn(styles)(props)
  }, [name, stylesFn, components, props, normalize, styles])
}
