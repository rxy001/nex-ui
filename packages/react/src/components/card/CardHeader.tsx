'use client'

import { nex } from '@nex-ui/styled'
import {
  useDefaultProps,
  useSlot,
  useRecipeStyles,
  useSlotClasses,
} from '../utils'
import { cardHeaderRecipe } from '../../themes/recipes'
import type { ElementType } from 'react'
import type { CardHeaderProps } from './types'

const slots = ['root', 'content', 'title', 'subtitle'] as const

export function CardHeader<RootComponent extends ElementType>(
  inProps: CardHeaderProps<RootComponent>,
) {
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

  const styles = useRecipeStyles({
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
    component: nex.div,
    externalForwardedProps: remainingProps,
    classNames: slotClasses.root,
  })

  const [CardContent, getCardContentProps] = useSlot({
    component: nex.div,
    style: styles.content,
    externalSlotProps: slotProps?.content,
    classNames: slotClasses.content,
  })

  const [CardTitle, getCardTitleProps] = useSlot({
    style: styles.title,
    component: nex.div,
    externalSlotProps: slotProps?.title,
    classNames: slotClasses.title,
  })

  const [CardSubtitle, getCardSubtitleProps] = useSlot({
    style: styles.subtitle,
    component: nex.div,
    classNames: slotClasses.subtitle,
    externalSlotProps: slotProps?.subtitle,
  })

  let node = children

  if (!children) {
    node = (
      <>
        {avatar}
        {title && subtitle ? (
          <CardContent {...getCardContentProps()}>
            <CardTitle {...getCardTitleProps()}>{title}</CardTitle>
            <CardSubtitle {...getCardSubtitleProps()}>{subtitle}</CardSubtitle>
          </CardContent>
        ) : title ? (
          <CardTitle {...getCardTitleProps()}>{title}</CardTitle>
        ) : subtitle ? (
          <CardSubtitle {...getCardSubtitleProps()}>{subtitle}</CardSubtitle>
        ) : null}
        {action}
      </>
    )
  }

  return <CardHeaderRoot {...getCardHeaderRootProps()}>{node}</CardHeaderRoot>
}

CardHeader.displayName = 'CardHeader'
