import { useMemo } from 'react'
import { isPlainObject, isFunction, mergeWith, isArray } from '@nex-ui/utils'
import type {
  StyleObject,
  BaseStylesDefinition,
  SlotStylesDefinition,
} from '@nex-ui/system'
import { styles } from '../../theme/styles'
import { useNexContext } from '../provider/Context'
import type { Styles } from '../../theme/styles'

type UseStylesConfig<T, K> = {
  name: T
  ownerState: K
}

type UseStyles = <T extends keyof Styles, K extends Record<string, any>>(
  option: UseStylesConfig<T, K>,
) => Styles[T] extends SlotStylesDefinition
  ? Record<keyof Styles[T]['slots'], StyleObject>
  : StyleObject

const mergeStyles = (a: any, b: any) =>
  mergeWith({}, a, b, (objValue: any, srcValue: any) => {
    if (isArray(objValue)) {
      return objValue.concat(srcValue)
    }
  })

export const useStyles: UseStyles = ({ name, ownerState = {} }) => {
  const { sys, components } = useNexContext()
  const componentStyles = styles[name] as any
  const styleOverrides = components?.[name]?.styleOverrides

  return useMemo(() => {
    if (componentStyles.slots) {
      const s = styles[name] as SlotStylesDefinition

      if (isPlainObject(styleOverrides)) {
        const runtimeFn = sys.sva(mergeStyles(s, styleOverrides))
        return runtimeFn(runtimeFn.splitVariantProps(ownerState))
      }

      if (isFunction(styleOverrides)) {
        const runtimeFn = sys.sva(s)
        return mergeStyles(
          runtimeFn(runtimeFn.splitVariantProps(ownerState)),
          styleOverrides(ownerState) ?? {},
        )
      }

      const runtimeFn = sys.sva(s)
      return runtimeFn(runtimeFn.splitVariantProps(ownerState))
    }

    const s = styles[name] as BaseStylesDefinition

    if (isPlainObject(styleOverrides)) {
      const runtimeFn = sys.cva(mergeStyles(s, styleOverrides))
      return runtimeFn(runtimeFn.splitVariantProps(ownerState))
    }

    if (isFunction(styleOverrides)) {
      const runtimeFn = sys.cva(s)
      return mergeStyles(
        runtimeFn(runtimeFn.splitVariantProps(ownerState)),
        styleOverrides(ownerState) ?? {},
      )
    }

    const runtimeFn = sys.cva(s)
    return runtimeFn(runtimeFn.splitVariantProps(ownerState))
  }, [componentStyles.slots, name, styleOverrides, sys, ownerState])
}
