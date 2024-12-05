import { merge } from '@nex-ui/utils'
import { createRuntimeFn } from './createRuntimeFn'
import { memoizeFn } from '../utils'
import type {
  BaseRecipeDefinition,
  BaseVariantGroups,
  RuntimeFn,
} from './types'
import type { StyleObject } from '../types'

export const defineRecipe = memoizeFn(function defineRecipe<
  V extends BaseVariantGroups,
>({ extend, ...args }: BaseRecipeDefinition<V>): RuntimeFn<V, StyleObject> {
  let config = args

  // @ts-ignore
  if (extend?.__original) {
    // @ts-ignore
    config = merge({}, extend?.__original, config)
  }

  const { base, ...other } = config
  const runtimeFn = createRuntimeFn({
    mainStyles: base,
    ...other,
  })

  // @ts-ignore
  runtimeFn.__recipe = true
  // @ts-ignore
  runtimeFn.__original = config
  // @ts-ignore
  runtimeFn.variants = config.variants ? Object.keys(config.variants) : []

  // @ts-ignore
  return runtimeFn
})

const recipe = defineRecipe({
  base: {
    color: 'yellow',
  },
})

console.log(recipe.variants)
