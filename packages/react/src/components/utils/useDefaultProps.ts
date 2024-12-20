import { useMemo } from 'react'
import { merge } from '@nex-ui/utils'
import { useNexContext } from '../provider/Context'
import type { ComponentNames } from '../../theme/types/componentsTheme'
import { useLatest } from './useLatest'

type Config<T> = {
  name: ComponentNames
  props: T
  defaultProps: T
}

export const useDefaultProps = <T>({
  name,
  props,
  defaultProps,
}: Config<T>): T => {
  const { components = {} } = useNexContext()

  const dp = useLatest(defaultProps)

  return useMemo(() => {
    return merge({}, dp.current, components[name]?.defaultProps, props)
  }, [components, name, dp, props])
}
