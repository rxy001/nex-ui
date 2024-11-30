import { useMemo } from 'react'
import { merge } from '@nex-ui/utils'
import { useNexContext } from '../provider/Context'
import type { ComponentNames } from '../../theme/types/componentsTheme'

type Config<T> = {
  name: ComponentNames
  props: T
}

export const useDefaultProps = <T>({ name, props }: Config<T>): T => {
  const { components = {} } = useNexContext()

  return useMemo(() => {
    return merge({}, components[name]?.defaultProps, props)
  }, [components, name, props])
}
