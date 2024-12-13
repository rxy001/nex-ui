import { useMemo } from 'react'
import { isFunction, mergeWith, isArray } from '@nex-ui/utils'
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

const mergeStyles = (...args: any[]) =>
  mergeWith({}, ...args, (objValue: any, srcValue: any) => {
    if (isArray(objValue)) {
      return objValue.concat(srcValue)
    }
  })

export const useStyles: UseStyles = ({ name, ownerState }) => {
  const { components } = useNexContext()
  const recipe = recipes[name] as any
  const styleOverrides = components?.[name]?.styleOverrides as any

  return useMemo(() => {
    if (isFunction(styleOverrides)) {
      return mergeStyles(recipe(ownerState), styleOverrides(ownerState))
    }

    if (recipe.__slotRecipe && styleOverrides) {
      return defineSlotRecipe(recipe, {
        ...styleOverrides,
      })(ownerState)
    }

    if (recipe.__recipe && styleOverrides) {
      return defineRecipe(recipe, {
        ...styleOverrides,
      })(ownerState)
    }

    return recipe(ownerState)
  }, [recipe, styleOverrides, ownerState])
}
