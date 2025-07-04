import { useMemo } from 'react'
import { __DEV__, mergeProps } from '@nex-ui/utils'
import { useNexUI } from '../provider/Context'
import type { ComponentNames } from '../../types/componentThemes'

type UseDefaultPropsArgs = {
  name: ComponentNames
  props: Record<string, any>
}

export const useDefaultProps = <T>({ name, props }: UseDefaultPropsArgs): T => {
  const { components = {} } = useNexUI()

  return useMemo(() => {
    const defaultProps = components[name]?.defaultProps ?? {}

    return mergeProps(defaultProps, props) as T
  }, [components, name, props])
}
