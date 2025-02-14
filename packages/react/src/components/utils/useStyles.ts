import { useMemo } from 'react'
import { isFunction, isPlainObject } from '@nex-ui/utils'
import { defineRecipe } from '@nex-ui/system'
import type { StyleObject } from '@nex-ui/system'
import { recipes } from '../../theme/recipes'
import { useNexContext } from '../provider/Context'
import type { Recipes } from '../../theme/recipes'

type UseStylesProps<T> = {
  name: T
  ownerState: {}
}

export const useStyles = <T extends keyof Recipes>({
  name,
  ownerState,
}: UseStylesProps<T>): StyleObject => {
  const { components } = useNexContext()
  const styleOverrides = components?.[name]?.styleOverrides

  const extendedRecipe = useMemo(() => {
    const recipe = recipes[name]

    if (isPlainObject(styleOverrides)) {
      // @ts-ignore
      return defineRecipe(recipe, styleOverrides)
    }

    return recipe
  }, [name, styleOverrides])

  if (isFunction(styleOverrides)) {
    return {
      // @ts-ignore
      ...extendedRecipe(extendedRecipe.splitVariantProps(ownerState)),
      // @ts-ignore
      ...styleOverrides(ownerState),
    }
  }

  // @ts-ignore
  return extendedRecipe(extendedRecipe.splitVariantProps(ownerState))
}
