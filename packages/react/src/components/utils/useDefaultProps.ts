import { useMemo } from 'react'
import { useNexContext } from '../provider/Context'
import type { ComponentNames } from '../../types/componentsTheme'

type Config<T> = {
  name: ComponentNames
  props: T
}

export const useDefaultProps = <T>({ name, props }: Config<T>): T => {
  const { components = {} } = useNexContext()

  return useMemo(
    () => ({
      ...components[name]?.defaultProps,
      ...props,
    }),
    [components, name, props],
  )
}
