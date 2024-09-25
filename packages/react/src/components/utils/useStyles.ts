import { useMemo } from 'react'
import { isPlainObject, isFunction, mergeWith } from '@nex-ui/utils'
import type { StyleObject } from '@nex-ui/system'
import { styles } from '../../theme'
import { useNexContext } from '../provider/Context'
import type { ComponentNames, Styles } from '../../theme'

type UseStylesConfig<T> = {
  name: T
  ownerState: any
}

function customizer(objValue: any, srcValue: any) {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
}

const mergeStyles = (a: any, b: any) => mergeWith({}, a, b, customizer)

export function useStyles<T extends ComponentNames>({
  name,
  ownerState = {},
}: UseStylesConfig<T>): 'slots' extends keyof Styles[T]
  ? Record<keyof Styles[T]['slots'], StyleObject>
  : StyleObject {
  const { sys, components } = useNexContext()
  const componentStyles = styles[name] as any

  return useMemo(() => {
    const styleOverrides = components?.[name]?.styleOverrides

    if (isPlainObject(styleOverrides)) {
      return sys.cva(mergeStyles(componentStyles, styleOverrides))(ownerState)
    }

    if (isFunction(styleOverrides)) {
      return mergeStyles(
        sys.cva(componentStyles)(ownerState),
        styleOverrides(ownerState) ?? {},
      )
    }
    return sys.cva(componentStyles)(ownerState)
  }, [components, name, sys, componentStyles, ownerState])
}
