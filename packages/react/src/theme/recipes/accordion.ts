import { defineRecipe } from '@nex-ui/system'
import type { RecipeVariants } from '@nex-ui/system'

export const accordion = defineRecipe({
  base: {},
})

export type AccordionRecipe = typeof accordion
export type AccordionVariants = RecipeVariants<AccordionRecipe>
