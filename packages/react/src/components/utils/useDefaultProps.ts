import { useMemo } from 'react'
import { useNexContext } from '../provider/Context'
import type { ComponentNames } from '../../types/componentsTheme'

type Config = {
  name: ComponentNames
  props: Record<string, any>
}

export const useDefaultProps = <T>({ name, props }: Config): T => {
  const { components = {} } = useNexContext()

  return useMemo(
    () =>
      ({
        ...components[name]?.defaultProps,
        ...props,
      }) as T,
    [components, name, props],
  )
}
