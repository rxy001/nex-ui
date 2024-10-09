import { useMemo } from 'react'
import { isPlainObject, isFunction, mergeWith, isArray } from '@nex-ui/utils'
import type { StyleObject } from '@nex-ui/system'
import { styles } from '../../theme'
import { useNexContext } from '../provider/Context'
import type { ComponentNames, Styles } from '../../theme'

type UseStylesConfig<T> = {
  name: T
  ownerState: any
}

function customizer(objValue: any, srcValue: any) {
  if (isArray(objValue)) {
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
    let fn: any

    if (componentStyles.slots) {
      fn = sys.sva
    } else {
      fn = sys.cva
    }

    const styleOverrides = components?.[name]?.styleOverrides
    if (isPlainObject(styleOverrides)) {
      return fn(mergeStyles(componentStyles, styleOverrides))(ownerState)
    }

    if (isFunction(styleOverrides)) {
      return mergeStyles(
        fn(componentStyles)(ownerState),
        styleOverrides(ownerState) ?? {},
      )
    }
    return fn(componentStyles)(ownerState)
  }, [components, name, sys, componentStyles, ownerState])
}
