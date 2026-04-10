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

export function Text<RootComponent extends ElementType = 'span'>(
  inProps: TextProps<RootComponent>,
) {
  const props = useDefaultProps<TextProps>({
    name: 'Text',
    props: inProps,
  })

  const {
    children,
    size = 'md',
    truncate = false,
    underline = false,
    strikethrough = false,
    ...remainingProps
  } = props

  const ownerState: TextProps = {
    ...props,
    truncate,
    underline,
    size,
    strikethrough,
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
      as: 'span',
    },
    dataAttrs: {
      size,
    },
  })

  return <TextRoot {...getTextRootProps()}>{children}</TextRoot>
}

Text.displayName = 'Text'
