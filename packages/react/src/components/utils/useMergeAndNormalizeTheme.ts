import { useMemo } from 'react'
import { isPlainObject, isFunction, merge } from '@nex-ui/utils'
import type { Components } from '@theme'
import { useNexContext } from '../provider'

export const useMergeAndNormalizeTheme = (
  componentName: keyof Components,
  componentStyles: any,
  variantProps: any = {},
) => {
  const { normalize, styles, components } = useNexContext()

  return useMemo(() => {
    const theme = components?.[componentName] ?? {}

    if (isPlainObject(theme)) {
      return styles(merge({}, componentStyles, theme))(variantProps)
    }
    if (isFunction(theme)) {
      return merge(
        {},
        styles(componentStyles)(variantProps),
        normalize(theme(variantProps) ?? {}, componentStyles.colorPalette),
      )
    }
    return styles(componentStyles)(variantProps)
  }, [
    componentName,
    componentStyles,
    components,
    variantProps,
    normalize,
    styles,
  ])
}
