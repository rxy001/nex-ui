import {
  useDefaultProps,
  useRecipeStyles,
  useSlot,
  useSlotClasses,
} from '../utils'
import { headingRecipe } from '../../themes/recipes'
import { Box } from '../box'
import type { ElementType } from 'react'
import type { HeadingProps } from './types'

const slots = ['root'] as const

export function Heading<RootComponent extends ElementType = 'h2'>(
  inProps: HeadingProps<RootComponent>,
) {
  const props = useDefaultProps<HeadingProps>({
    name: 'Heading',
    props: inProps,
  })

  const { children, truncate = false, size = 'md', ...remainingProps } = props

  const ownerState = {
    ...props,
    truncate,
    size,
  }

  const slotClasses = useSlotClasses({
    name: 'Heading',
    slots,
  })

  const style = useRecipeStyles({
    ownerState,
    name: 'Heading',
    recipe: headingRecipe,
  })

  const [HeadingRoot, getHeadingRootProps] = useSlot({
    style,
    component: Box,
    externalForwardedProps: remainingProps,
    classNames: slotClasses.root,
    additionalProps: {
      as: 'h2',
    },
    dataAttrs: {
      size,
    },
  })

  return <HeadingRoot {...getHeadingRootProps()}>{children}</HeadingRoot>
}

Heading.displayName = 'Heading'
