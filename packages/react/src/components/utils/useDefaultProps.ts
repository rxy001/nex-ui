import { mergeProps } from '@nex-ui/utils'
import { useNexUI } from '../provider/ProviderContext'
import type { ComponentNames } from '../../types/componentThemes'

type UseDefaultPropsArgs = {
  name: ComponentNames
  props: Record<string, any>
}

export function useDefaultProps<T>({ name, props }: UseDefaultPropsArgs): T {
  const { components } = useNexUI()
  const defaultProps = components?.[name]?.defaultProps

  if (defaultProps) {
    return mergeProps(defaultProps, props) as T
  }

  return props as T
}
