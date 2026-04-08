'use client'

import { flexRecipe } from '../../themes/recipes'
import {
  useDefaultProps,
  useRecipeStyles,
  useSlot,
  useSlotClasses,
} from '../utils'
import { Box } from '../box'
import type { ElementType } from 'react'
import type { FlexProps } from './types'

const slots = ['root'] as const

export function Flex<RootComponent extends ElementType = 'div'>(
  inProps: FlexProps<RootComponent>,
) {
  const props = useDefaultProps<FlexProps>({ name: 'Flex', props: inProps })

  const {
    children,
    justify,
    align,
    wrap,
    gap,
    gapX,
    gapY,
    direction = 'row',
    inline = false,
    ...remainingProps
  } = props

  const ownerState: FlexProps = {
    ...props,
    direction,
    inline,
  }

  const slotClasses = useSlotClasses({
    name: 'Flex',
    slots,
  })

  const style = useRecipeStyles({
    ownerState,
    name: 'Flex',
    recipe: flexRecipe,
  })

  const [FlexRoot, getFlexRootProps] = useSlot({
    style,
    component: Box,
    externalForwardedProps: remainingProps,
    classNames: slotClasses.root,
    additionalProps: {
      gap,
      flexDirection: direction,
      alignItems: align,
      justifyContent: justify,
      flexWrap: wrap,
      columnGap: gapX,
      rowGap: gapY,
    },
  })

  return <FlexRoot {...getFlexRootProps()}>{children}</FlexRoot>
}

Flex.displayName = 'Flex'
