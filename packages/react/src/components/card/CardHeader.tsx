'use client'

import { useMemo } from 'react'
import {
  useDefaultProps,
  useSlot,
  useStyles,
  composeClasses,
  getUtilityClass,
} from '../utils'
import { cardHeaderRecipe } from '../../theme/recipes'
import { useNexUI } from '../provider'
import type { ElementType } from 'react'
import type { CardHeaderProps } from './types'

const useSlotClasses = (ownerState: CardHeaderProps) => {
  const { classes } = ownerState
  const { prefix } = useNexUI()
  const cardHeaderRoot = `${prefix}-card-header`

  return useMemo(() => {
    const slots = {
      root: ['root'],
      content: ['content'],
      title: ['title'],
      subtitle: ['subtitle'],
    }

    return composeClasses(slots, getUtilityClass(cardHeaderRoot), classes)
  }, [cardHeaderRoot, classes])
}

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
    ...remainingProps
  } = props

  const ownerState: CardHeaderProps = {
    ...props,
  }

  const styles = useStyles({
    ownerState,
    name: 'CardHeader',
    recipe: cardHeaderRecipe,
  })

  const classes = useSlotClasses(ownerState)

  const [CardHeaderRoot, getCardHeaderRootProps] = useSlot({
    style: styles.root,
    elementType: 'div',
    externalForwardedProps: remainingProps,
    classNames: classes.root,
  })

  const [CardContent, getCardContentProps] = useSlot({
    elementType: 'div',
    style: styles.content,
    externalSlotProps: slotProps?.content,
    classNames: classes.content,
  })

  const [CardTitle, getCardTitleProps] = useSlot({
    style: styles.title,
    elementType: 'div',
    externalSlotProps: slotProps?.title,
    classNames: classes.title,
    additionalProps: {
      children: title,
    },
  })

  const [CardSubtitle, getCardSubtitleProps] = useSlot({
    style: styles.subtitle,
    elementType: 'div',
    classNames: classes.subtitle,
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
