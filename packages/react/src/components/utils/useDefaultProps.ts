import { useMemo } from 'react'
import { __DEV__ } from '@nex-ui/utils'
import { mergeProps } from './mergeProps'
import { useNexUI } from '../provider/Context'
import type { ComponentNames } from '../../types/componentThemes'

type useDefaultPropsArgs = {
  name: ComponentNames
  props: Record<string, any>
}

export const useDefaultProps = <T>({ name, props }: useDefaultPropsArgs): T => {
  const { components = {} } = useNexUI()

  // @ts-expect-error
  return useMemo(() => {
    const defaultProps = components[name]?.defaultProps ?? {}

    // @ts-expect-error
    if (__DEV__ && defaultProps.sx) {
      console.warn(
        '[Nex UI] %s: To customize component styles, use "styleOverrides". "defaultProps.sx" will be ignored.',
        name,
      )
    }

    return mergeProps(defaultProps, props)
  }, [components, name, props])
}
