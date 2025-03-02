import { useMemo } from 'react'
import { isFunction, isPlainObject } from '@nex-ui/utils'
import { defineSlotRecipe } from '@nex-ui/system'
import type { SlotRecipeRuntimeFn, CSSObject } from '@nex-ui/system'
import { useNexUI } from '../provider/Context'
import type { SlotRecipeComponentNames } from '../../theme/slotRecipes'

type UseSlotStylesProps<S extends SlotRecipeRuntimeFn> = {
  name: SlotRecipeComponentNames
  ownerState: {}
  slotRecipe: S
}

export const useSlotStyles = <SlotRecipe extends SlotRecipeRuntimeFn>({
  name,
  ownerState,
  slotRecipe,
}: UseSlotStylesProps<SlotRecipe>): Record<
  SlotRecipe['slots'][number],
  CSSObject
> => {
  const { components } = useNexUI()
  const { styleOverrides } = components?.[name] ?? {}

  const extendedRecipe = useMemo(() => {
    if (isPlainObject(styleOverrides)) {
      // @ts-ignore
      return defineSlotRecipe(slotRecipe, styleOverrides)
    }

    return slotRecipe
  }, [slotRecipe, styleOverrides])

  if (isFunction(styleOverrides)) {
    // @ts-ignore
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
