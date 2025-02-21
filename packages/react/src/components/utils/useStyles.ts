import { useMemo } from 'react'
import { isFunction, isPlainObject } from '@nex-ui/utils'
import { defineRecipe } from '@nex-ui/system'
import type { RecipeRuntimeFn, CSSObject } from '@nex-ui/system'
import { useNexContext } from '../provider/Context'
import type { RecipeComponentNames } from '../../theme/recipes'

type UseStylesProps<S extends RecipeRuntimeFn> = {
  name: RecipeComponentNames
  ownerState: {}
  recipe: S
}

export const useStyles = <Recipe extends RecipeRuntimeFn>({
  name,
  ownerState,
  recipe,
}: UseStylesProps<Recipe>): CSSObject => {
  const { components } = useNexContext()
  const styleOverrides = components?.[name]?.styleOverrides

  const extendedRecipe = useMemo(() => {
    if (isPlainObject(styleOverrides)) {
      // @ts-ignore
      return defineRecipe(recipe, styleOverrides)
    }

    return recipe
  }, [recipe, styleOverrides])

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
