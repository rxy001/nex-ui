'use client'

import { useDefaultProps, useSlot, useStyles, useSlotClasses } from '../utils'
import { cardHeaderRecipe } from '../../theme/recipes'
import type { ElementType } from 'react'
import type { CardHeaderProps } from './types'

const slots = ['root', 'content', 'title', 'subtitle']

export const CardHeader = <RootComponent extends ElementType>(
  inProps: CardHeaderProps<RootComponent>,
) => {
  const props = useDefaultProps<CardHeaderProps<'div'>>({
    name: 'CardHeader',
    props: inProps,
  })

  const {
    title,
    subtitle,
    avatar,
    action,
    children,
    slotProps,
    classNames,
    ...remainingProps
  } = props

  const styles = useStyles({
    ownerState: props,
    name: 'CardHeader',
    recipe: cardHeaderRecipe,
  })

  const slotClasses = useSlotClasses({
    name: 'CardHeader',
    slots,
    classNames,
  })

  const [CardHeaderRoot, getCardHeaderRootProps] = useSlot({
    style: styles.root,
    elementType: 'div',
    externalForwardedProps: remainingProps,
    classNames: slotClasses.root,
  })

  const [CardContent, getCardContentProps] = useSlot({
    elementType: 'div',
    style: styles.content,
    externalSlotProps: slotProps?.content,
    classNames: slotClasses.content,
  })

  const [CardTitle, getCardTitleProps] = useSlot({
    style: styles.title,
    elementType: 'div',
    externalSlotProps: slotProps?.title,
    classNames: slotClasses.title,
    additionalProps: {
      children: title,
    },
  })

  const [CardSubtitle, getCardSubtitleProps] = useSlot({
    style: styles.subtitle,
    elementType: 'div',
    classNames: slotClasses.subtitle,
    externalSlotProps: slotProps?.subtitle,
    additionalProps: {
      children: subtitle,
    },
  })

  let node = children

  if (!children) {
    node = (
      <>
        {avatar}
        {title && subtitle ? (
          <CardContent {...getCardContentProps()}>
            <CardTitle {...getCardTitleProps()} />
            <CardSubtitle {...getCardSubtitleProps()} />
          </CardContent>
        ) : title ? (
          <CardTitle {...getCardTitleProps()} />
        ) : subtitle ? (
          <CardSubtitle {...getCardSubtitleProps()} />
        ) : null}
        {action}
      </>
    )
  }

  return <CardHeaderRoot {...getCardHeaderRootProps()}>{node}</CardHeaderRoot>
}

CardHeader.displayName = 'CardHeader'
