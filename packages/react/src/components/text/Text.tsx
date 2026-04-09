import {
  useDefaultProps,
  useRecipeStyles,
  useSlot,
  useSlotClasses,
} from '../utils'
import { textRecipe } from '../../themes/recipes'
import { Box } from '../box'
import type { ElementType } from 'react'
import type { TextProps } from './types'

const slots = ['root'] as const

export function Text<RootComponent extends ElementType = 'p'>(
  inProps: TextProps<RootComponent>,
) {
  const props = useDefaultProps<TextProps>({
    name: 'Text',
    props: inProps,
  })

  const { truncate = false, children, ...remainingProps } = props

  const ownerState: TextProps = {
    ...props,
    truncate,
  }

  const style = useRecipeStyles({
    ownerState,
    name: 'Text',
    recipe: textRecipe,
  })

  const slotClasses = useSlotClasses({
    slots,
    name: 'Text',
  })

  const [TextRoot, getTextRootProps] = useSlot({
    style,
    component: Box,
    externalForwardedProps: remainingProps,
    classNames: slotClasses.root,
    additionalProps: {
      as: 'p',
    },
  })

  return <TextRoot {...getTextRootProps()}>{children}</TextRoot>
}

Text.displayName = 'Text'
