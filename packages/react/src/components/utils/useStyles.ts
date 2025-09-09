import { useMemo } from 'react'
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
    const slotRecipe = recipe as SlotRecipeRuntimeFn
    if (slotRecipe.__slotRecipe) {
      // @ts-ignore
      return defineSlotRecipe({
        extend: slotRecipe,
        ...styleOverrides,
      })
    }
    return defineRecipe({
      // @ts-ignore
      extend: recipe,
      ...styleOverrides,
    })
  }, [recipe, styleOverrides])

  // @ts-ignore
  return extendedRecipe(extendedRecipe.splitVariantProps(ownerState))
}
