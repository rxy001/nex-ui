import { useMemo } from 'react'
import { useNexUI } from '../provider/Context'
import type { ComponentNames } from '../../types/componentThemes'

type useDefaultPropsArgs = {
  name: ComponentNames
  props: Record<string, any>
}

export const useDefaultProps = <T>({ name, props }: useDefaultPropsArgs): T => {
  const { components = {} } = useNexUI()

  return useMemo(
    () =>
      ({
        ...components[name]?.defaultProps,
        ...props,
      }) as T,
    [components, name, props],
  )
}
