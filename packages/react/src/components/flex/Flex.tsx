'use client'

import { flexRecipe } from '../../theme/recipes'
import { useDefaultProps, useStyles, useSlot, useSlotClasses } from '../utils'
import type { ElementType } from 'react'
import type { FlexProps } from './types'

const slots = ['root']

export const Flex = <RootComponent extends ElementType = 'div'>(
  inProps: FlexProps<RootComponent>,
) => {
  const props = useDefaultProps<FlexProps>({ name: 'Flex', props: inProps })

  const {
    gap,
    children,
    justify,
    align,
    wrap,
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

  const style = useStyles({ ownerState, name: 'Flex', recipe: flexRecipe })

  const [FlexRoot, getFlexRootProps] = useSlot({
    style,
    elementType: 'div',
    externalForwardedProps: remainingProps,
    classNames: slotClasses.root,
    additionalProps: {
      sx: {
        gap,
        flexDirection: direction,
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap,
      },
    },
  })

  return <FlexRoot {...getFlexRootProps()}>{children}</FlexRoot>
}

Flex.displayName = 'Flex'
