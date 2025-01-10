import { useMemo } from 'react'
import { isFunction } from '@nex-ui/utils'
import { defineSlotRecipe, defineRecipe } from '@nex-ui/system'
import type { SlotRecipeRuntimeFn, StyleObject } from '@nex-ui/system'
import { recipes } from '../../theme/recipes'
import { useNexContext } from '../provider/Context'
import type { Recipes } from '../../theme/recipes'

type UseStylesConfig<T> = {
  name: T
  ownerState: object
}

export const useStyles = <T extends keyof Recipes>({
  name,
  ownerState,
}: UseStylesConfig<T>): Recipes[T] extends SlotRecipeRuntimeFn
  ? Record<Recipes[T]['slots'][number], StyleObject>
  : StyleObject => {
  const { components } = useNexContext()
  const styleOverrides = components?.[name]?.styleOverrides as any

  const extendedRecipe = useMemo(() => {
    const recipe = recipes[name] as any

    if (!styleOverrides || isFunction(styleOverrides)) {
      return recipe
    }

    if (recipe.__slotRecipe) {
      return defineSlotRecipe(recipe, styleOverrides)
    }

    if (recipe.__recipe) {
      return defineRecipe(recipe, styleOverrides)
    }
  }, [name, styleOverrides])

  if (isFunction(styleOverrides)) {
    return {
      ...extendedRecipe(ownerState),
      ...styleOverrides(ownerState),
    }
  }

  return extendedRecipe(ownerState)
}
