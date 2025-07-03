'use client'

import * as m from 'motion/react-m'
import { useEvent } from '@nex-ui/hooks'
import { ChevronDownOutlined } from '@nex-ui/icons'
import { LazyMotion, AnimatePresence } from 'motion/react'
import { useId, useMemo, useRef } from 'react'
import { useNexUI } from '../provider'
import { accordionItemRecipe } from '../../theme/recipes'
import { ButtonBase } from '../button/ButtonBase'
import {
  useDefaultProps,
  useStyles,
  composeClasses,
  getUtilityClass,
  motionFeatures,
  useSlot,
} from '../utils'
import { useAccordionGroup } from './AccordionContext'
import type { ElementType, HTMLAttributes } from 'react'
import type { Variants } from 'motion/react'
import type { AccordionItemOwnerState, AccordionItemProps } from './types'

const contentMotionVariants: Variants = {
  expanded: {
    opacity: 1,
    height: 'auto',
    transition: {
      opacity: {
        delay: 0.1,
      },
      ease: 'easeInOut',
      duration: 0.2,
    },
  },
  unexpanded: {
    opacity: 0,
    height: 0,
    overflow: 'hidden',
    transition: {
      ease: 'easeInOut',
      duration: 0.2,
    },
  },
}
const indicatorMotionVariants: Variants = {
  expanded: {
    rotate: 180,
    transition: {
      duration: 0.2,
    },
  },
  unexpanded: {
    rotate: 0,
    transition: {
      duration: 0.2,
    },
  },
}

const useSlotClasses = (ownerState: AccordionItemOwnerState) => {
  const { prefix } = useNexUI()

  const { hideIndicator, keepMounted, disabled, classes } = ownerState

  return useMemo(() => {
    const accordionItemRoot = `${prefix}-accordion-item`

    const slots = {
      root: [
        'root',
        hideIndicator && 'hide-indicator',
        keepMounted && 'keep-mounted',
        disabled && 'disabled',
      ],
      heading: ['heading'],
      trigger: ['trigger'],
      content: ['content'],
      indicator: ['indicator'],
    }

    return composeClasses(slots, getUtilityClass(accordionItemRoot), classes)
  }, [classes, disabled, hideIndicator, keepMounted, prefix])
}

const useSlotAriaProps = (
  ownerState: AccordionItemOwnerState,
): Record<'trigger' | 'content' | 'indicator', HTMLAttributes<HTMLElement>> => {
  const { itemKey, expanded, slotProps } = ownerState
  const id = useId()

  return useMemo(() => {
    const triggerProps = slotProps?.trigger || {}
    const contentProps = slotProps?.content || {}
    const indicatorProps = slotProps?.indicator || {}
    const triggerId = triggerProps.id ?? id
    const contentId = contentProps.id ?? `panel-${itemKey}-content`

    const trigger = {
      id: triggerId,
      'aria-expanded': triggerProps['aria-expanded'] ?? expanded,
      'aria-controls': triggerProps['aria-controls'] ?? contentId,
    }

    const content = {
      id: contentId,
      role: contentProps.role ?? 'region',
      'aria-labelledby': contentProps['aria-labelledby'] ?? triggerId,
    }

    const indicator = {
      'aria-hidden': indicatorProps['aria-hidden'] ?? true,
    }

    return {
      trigger,
      content,
      indicator,
    }
  }, [
    expanded,
    id,
    itemKey,
    slotProps?.content,
    slotProps?.indicator,
    slotProps?.trigger,
  ])
}

export const AccordionItem = <RootComponent extends ElementType = 'div'>(
  inProps: AccordionItemProps<RootComponent>,
) => {
  const defaultKey = useId()

  const props = useDefaultProps<AccordionItemProps>({
    name: 'AccordionItem',
    props: inProps,
  })

  const {
    variant,
    toggleExpandedKey,
    expandedKeys,
    disabledKeys,
    disabled: defaultDisabled,
    indicator: defaultIndicator,
    motionProps: defaultMotionProps,
    keepMounted: defaultKeepMounted,
    hideIndicator: defaultHideIndicator,
    indicatorMotionProps: defaultIndicatorMotionProps,
  } = useAccordionGroup()

  const {
    children,
    title,
    slotProps,
    indicatorMotionProps = defaultIndicatorMotionProps,
    motionProps = defaultMotionProps,
    hideIndicator = defaultHideIndicator,
    keepMounted = defaultKeepMounted,
    indicator = defaultIndicator,
    itemKey = defaultKey,
    disabled = disabledKeys.includes(itemKey) || defaultDisabled,
    ...remainingProps
  } = props

  const expanded = expandedKeys.includes(itemKey)

  const ownerState: AccordionItemOwnerState = {
    ...props,
    variant,
    itemKey,
    expanded,
    indicator,
    keepMounted,
    hideIndicator,
    disabled,
    motionProps,
  }

  const styles = useStyles({
    name: 'AccordionItem',
    ownerState,
    recipe: accordionItemRecipe,
  })

  const classes = useSlotClasses(ownerState)

  const slotAriaProps = useSlotAriaProps(ownerState)

  const animate = expanded ? 'expanded' : 'unexpanded'

  const motionInitialRef = useRef(animate)

  const contentMotionProps = keepMounted
    ? {
        animate,
        initial: motionInitialRef.current,
        variants: contentMotionVariants,
      }
    : {
        variants: contentMotionVariants,
        initial: motionInitialRef.current,
        animate: 'expanded',
        exit: 'unexpanded',
      }

  const [AccordionItemRoot, getAccordionItemRootProps] = useSlot({
    ownerState,
    elementType: 'div',
    externalForwardedProps: remainingProps,
    style: styles.root,
    classNames: classes.root,
  })

  const [AccordionItemHeading, getAccordionItemHeadingProps] = useSlot({
    ownerState,
    elementType: 'h3',
    externalSlotProps: slotProps?.heading,
    style: styles.heading,
    classNames: classes.heading,
  })

  const handleClick = useEvent(() => {
    toggleExpandedKey(itemKey)
  })

  const [AccordionItemTrigger, getAccordionItemTriggerProps] = useSlot({
    ownerState,
    elementType: ButtonBase,
    externalSlotProps: slotProps?.trigger,
    style: styles.trigger,
    classNames: classes.trigger,
    a11y: slotAriaProps.trigger,
    shouldForwardComponent: false,
    additionalProps: {
      disabled,
      onClick: handleClick,
    },
  })

  const [AccordionItemContent, getAccordionItemContentProps] = useSlot({
    ownerState,
    elementType: 'div',
    externalSlotProps: slotProps?.content,
    style: styles.content,
    classNames: classes.content,
    a11y: slotAriaProps.content,
  })

  const [AccordionItemIndicator, getAccordionItemIndicatorProps] = useSlot({
    ownerState,
    elementType: m.span,
    externalSlotProps: slotProps?.indicator,
    style: styles.indicator,
    classNames: classes.indicator,
    a11y: slotAriaProps.indicator,
    additionalProps: {
      animate,
      variants: indicatorMotionVariants,
      initial: animate,
      ...indicatorMotionProps,
    },
  })

  return (
    <LazyMotion features={motionFeatures}>
      <AccordionItemRoot {...getAccordionItemRootProps()}>
        <AccordionItemHeading {...getAccordionItemHeadingProps()}>
          <AccordionItemTrigger {...getAccordionItemTriggerProps()}>
            <span>{title}</span>
            {!hideIndicator && (
              <AccordionItemIndicator {...getAccordionItemIndicatorProps()}>
                {indicator ?? <ChevronDownOutlined />}
              </AccordionItemIndicator>
            )}
          </AccordionItemTrigger>
        </AccordionItemHeading>
        <AnimatePresence>
          {(keepMounted || expanded) && (
            <m.div {...contentMotionProps} {...motionProps}>
              <AccordionItemContent {...getAccordionItemContentProps()}>
                {children}
              </AccordionItemContent>
            </m.div>
          )}
        </AnimatePresence>
      </AccordionItemRoot>
    </LazyMotion>
  )
}

AccordionItem.displayName = 'AccordionItem'
