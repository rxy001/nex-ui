import { useMemo } from 'react'
import { defineRecipe, defineSlotRecipe } from '@nex-ui/system'
import { useNexUI } from '../provider/Context'
import type { RecipeRuntimeFn, SlotRecipeRuntimeFn } from '@nex-ui/system'
import type { ComponentNames } from '../../types/componentThemes'

type UseRecipeStylesProps<
  Recipe extends RecipeRuntimeFn | SlotRecipeRuntimeFn,
> = {
  recipe: Recipe
  name: ComponentNames
  ownerState: object
}

export function useRecipeStyles<
  Recipe extends RecipeRuntimeFn | SlotRecipeRuntimeFn,
>({ name, ownerState, recipe }: UseRecipeStylesProps<Recipe>) {
  const { components } = useNexUI()

  const styleOverrides = components?.[name]?.styleOverrides

  const extendedRecipe = useMemo(() => {
    const slotRecipe = recipe as SlotRecipeRuntimeFn
    if (slotRecipe.__slotRecipe) {
      // @ts-ignore
      return defineSlotRecipe({
        extend: slotRecipe,
        ...styleOverrides,
      })
    }
    // @ts-ignore
    return defineRecipe({
      extend: recipe as RecipeRuntimeFn,
      ...styleOverrides,
    })
  }, [recipe, styleOverrides]) as any

  return extendedRecipe(
    extendedRecipe.splitVariantProps(ownerState),
  ) as ReturnType<Recipe>
}
