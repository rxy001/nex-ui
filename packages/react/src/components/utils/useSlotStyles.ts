import { useMemo } from 'react'
import { isFunction, isPlainObject } from '@nex-ui/utils'
import { defineSlotRecipe } from '@nex-ui/system'
import type { StyleObject } from '@nex-ui/system'
import { slotRecipes } from '../../theme/slotRecipes'
import { useNexContext } from '../provider/Context'
import type { SlotRecipes } from '../../theme/slotRecipes'

type UseSlotStylesProps<T> = {
  name: T
  ownerState: {}
}

export const useSlotStyles = <T extends keyof SlotRecipes>({
  name,
  ownerState,
}: UseSlotStylesProps<T>): Record<
  SlotRecipes[T]['slots'][number],
  StyleObject
> => {
  const { components } = useNexContext()
  const styleOverrides = components?.[name]?.styleOverrides

  const extendedRecipe = useMemo(() => {
    const slotRecipe = slotRecipes[name]

    if (isPlainObject(styleOverrides)) {
      // @ts-ignore
      return defineSlotRecipe(slotRecipe, styleOverrides)
    }

    return slotRecipe
  }, [name, styleOverrides])

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
