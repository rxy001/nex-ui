import { useMemo } from 'react'
import { isFunction, isPlainObject } from '@nex-ui/utils'
import { defineRecipe, defineSlotRecipe } from '@nex-ui/system'
import { useNexUI } from '../provider/Context'
import type {
  RecipeRuntimeFn,
  CSSObject,
  SlotRecipeRuntimeFn,
} from '@nex-ui/system'
import type { ComponentNames } from '../../types/componentThemes'

type UseStylesProps<S extends RecipeRuntimeFn | SlotRecipeRuntimeFn> = {
  name: ComponentNames
  ownerState: {}
  recipe: S
}

export const useStyles = <
  Recipe extends RecipeRuntimeFn | SlotRecipeRuntimeFn,
>({
  name,
  ownerState,
  recipe,
}: UseStylesProps<Recipe>): Recipe extends SlotRecipeRuntimeFn
  ? Record<Recipe['slots'][number], CSSObject>
  : CSSObject => {
  const { components } = useNexUI()
  const styleOverrides = components?.[name]?.styleOverrides

  const extendedRecipe = useMemo(() => {
    if (isPlainObject(styleOverrides)) {
      const slotRecipe = recipe as SlotRecipeRuntimeFn
      if (slotRecipe.__slotRecipe) {
        // @ts-ignore
        return defineSlotRecipe(slotRecipe, styleOverrides)
      }
      // @ts-ignore
      return defineRecipe(recipe, styleOverrides)
    }
    return recipe
  }, [recipe, styleOverrides])

  if (isFunction(styleOverrides)) {
    // @ts-ignore
    return {
      ...extendedRecipe(extendedRecipe.splitVariantProps(ownerState)),
      // @ts-ignore
      ...styleOverrides(ownerState),
    }
  }

  // @ts-ignore
  return extendedRecipe(extendedRecipe.splitVariantProps(ownerState))
}
