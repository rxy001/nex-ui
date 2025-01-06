import { useMemo } from 'react'
import { isFunction } from '@nex-ui/utils'
import { defineSlotRecipe, defineRecipe } from '@nex-ui/system'
import type { SlotRecipeRuntimeFn, StyleObject } from '@nex-ui/system'
import { recipes } from '../../theme/recipes'
import { useNexContext } from '../provider/Context'
import type { Recipes } from '../../theme/recipes'

type UseStylesConfig<T, K> = {
  name: T
  ownerState: K
}

type UseStyles = <T extends keyof Recipes, K extends Record<string, any>>(
  option: UseStylesConfig<T, K>,
) => Recipes[T] extends SlotRecipeRuntimeFn
  ? Record<Recipes[T]['slots'][number], StyleObject>
  : StyleObject

export const useStyles: UseStyles = ({ name, ownerState }) => {
  const { components } = useNexContext()
  const styleOverrides = components?.[name]?.styleOverrides as any

  const runtimeFn = useMemo(() => {
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
      ...runtimeFn(ownerState),
      ...styleOverrides(ownerState),
    }
  }

  return runtimeFn(ownerState)
}
