'use client'

import * as m from 'motion/react-m'
import { useEvent, useFocusVisible } from '@nex-ui/hooks'
import { ChevronDownOutlined } from '@nex-ui/icons'
import { LazyMotion, AnimatePresence, domAnimation } from 'motion/react'
import { nex } from '@nex-ui/styled'
import { mergeRefs } from '@nex-ui/utils'
import { useEffect, useId, useRef } from 'react'
import type { Variants } from 'motion/react'
import type {
  ButtonHTMLAttributes,
  ElementType,
  HTMLAttributes,
  KeyboardEvent,
} from 'react'
import { useNexUI } from '../provider'
import { accordionItemRecipe } from '../../theme/recipes'
import {
  useDefaultProps,
  useSlotProps,
  useStyles,
  composeClasses,
  getUtilityClass,
} from '../utils'
import { useAccordionGroup } from './AccordionContext'
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

  const accordionItemRoot = `${prefix}-accordion-item`

  const { hideIndicator, keepMounted, disabled, classes } = ownerState

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

  const composedClasses = composeClasses(
    slots,
    getUtilityClass(accordionItemRoot),
    classes,
  )

  return composedClasses
}

const useSlotAriaProps = (
  ownerState: AccordionItemOwnerState,
): Record<'trigger' | 'content', HTMLAttributes<HTMLElement>> => {
  const { itemKey, disabled, expanded, slotProps } = ownerState
  const triggerProps = slotProps?.trigger || {}
  const triggerId = useId()
  const contentId = `panel-${itemKey}-content`

  let trigger: ButtonHTMLAttributes<HTMLButtonElement> = {
    type: 'button',
    disabled,
    id: triggerId,
    tabIndex: disabled ? -1 : 0,
    'aria-expanded': expanded,
    'aria-controls': contentId,
    'aria-disabled': disabled || undefined,
  }

  if (triggerProps.as && triggerProps.as !== 'button') {
    trigger = {
      ...trigger,
      role: 'button',
    }
  }

  const content = {
    role: 'region',
    'aria-labelledby': triggerId,
    id: contentId,
  }

  return {
    trigger,
    content,
  }
}

export const AccordionItem = <RootComponent extends ElementType = 'div'>(
  inProps: AccordionItemProps<RootComponent>,
) => {
  const defaultKey = useId()

  const firstRender = useRef(true)

  const triggerRef = useRef<HTMLButtonElement>(null)

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
    ref,
    children,
    title,
    slotProps,
    as = 'div',
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

  const [focusVisible] = useFocusVisible({ ref: triggerRef })

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

  const onClick = useEvent(() => {
    toggleExpandedKey(itemKey)
  })

  const onKeyUp = useEvent((event: KeyboardEvent<HTMLButtonElement>) => {
    // Keyboard accessibility for non interactive elements
    if (
      focusVisible &&
      slotProps?.trigger?.as &&
      slotProps?.trigger?.as !== 'button' &&
      (event.code === 'Space' || event.code === 'Enter')
    ) {
      event.currentTarget.click()
    }
  })

  const classes = useSlotClasses(ownerState)

  const slotAriaProps = useSlotAriaProps(ownerState)

  const animate = expanded ? 'expanded' : 'unexpanded'

  const contentMotionProps = keepMounted
    ? {
        animate,
        initial: firstRender.current && animate,
        variants: contentMotionVariants,
      }
    : {
        variants: contentMotionVariants,
        initial: firstRender.current && animate,
        animate: 'expanded',
        exit: 'unexpanded',
      }

  const rootProps = useSlotProps({
    ownerState,
    externalForwardedProps: remainingProps,
    sx: styles.root,
    classNames: classes.root,
    additionalProps: {
      ref,
      as,
    },
  })

  const headingProps = useSlotProps({
    ownerState,
    externalSlotProps: slotProps?.heading,
    sx: styles.heading,
    classNames: classes.heading,
  })

  const triggerProps = useSlotProps({
    ownerState,
    externalSlotProps: {
      ...slotProps?.trigger,
      ref: mergeRefs(triggerRef, slotProps?.trigger?.ref),
    },
    sx: styles.trigger,
    classNames: classes.trigger,
    additionalProps: {
      onClick,
      onKeyUp,
      ...slotAriaProps.trigger,
    },
  })

  const contentProps = useSlotProps({
    ownerState,
    externalSlotProps: slotProps?.content,
    sx: styles.content,
    classNames: classes.content,
    additionalProps: slotAriaProps.content,
  })

  const indicatorProps = useSlotProps({
    ownerState,
    externalSlotProps: slotProps?.indicator,
    sx: styles.indicator,
    classNames: classes.indicator,
    additionalProps: {
      size: 'sm',
      as: m.span,
      animate,
      variants: indicatorMotionVariants,
      ...indicatorMotionProps,
    },
  })

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
    }
  }, [])

  return (
    <LazyMotion features={domAnimation}>
      <nex.div {...rootProps}>
        <nex.h3 {...headingProps}>
          <nex.button {...triggerProps}>
            <span>{title}</span>
            {!hideIndicator && (
              <nex.span {...indicatorProps}>
                {indicator ?? <ChevronDownOutlined />}
              </nex.span>
            )}
          </nex.button>
        </nex.h3>
        <AnimatePresence>
          {(keepMounted || expanded) && (
            // @ts-ignore
            <m.div {...contentMotionProps} {...motionProps}>
              <nex.div {...contentProps}>{children}</nex.div>
            </m.div>
          )}
        </AnimatePresence>
      </nex.div>
    </LazyMotion>
  )
}
