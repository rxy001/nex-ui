'use client'

import * as m from 'motion/react-m'
import { nex } from '@nex-ui/styled'
import { LazyMotion } from 'motion/react'
import { ChevronDownOutlined } from '@nex-ui/icons'
import { useId, useMemo, useRef } from 'react'
import { accordionItemRecipe } from '../../theme/recipes'
import { ButtonBase } from '../buttonBase'
import {
  useDefaultProps,
  useRecipeStyles,
  useSlot,
  useSlotClasses,
  motionFeatures,
} from '../utils'
import { useAccordionGroupContext } from './AccordionContext'
import { FadeInOutMotion } from '../fadeInOutMotion'
import type { ElementType } from 'react'
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
  collapsed: {
    opacity: 0,
    height: 0,
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
  collapsed: {
    rotate: 0,
    transition: {
      duration: 0.2,
    },
  },
}

const slots = ['root', 'heading', 'trigger', 'content', 'indicator'] as const

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
    disableAnimation: defaultDisableAnimation,
    disabled: defaultDisabled,
    indicator: defaultIndicator,
    motionProps: defaultMotionProps,
    keepMounted: defaultKeepMounted,
    hideIndicator: defaultHideIndicator,
    indicatorMotionProps: defaultIndicatorMotionProps,
  } = useAccordionGroupContext()

  const {
    children,
    title,
    slotProps,
    classNames,
    disableAnimation = defaultDisableAnimation,
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

  const styles = useRecipeStyles({
    name: 'AccordionItem',
    ownerState,
    recipe: accordionItemRecipe,
  })

  const slotClasses = useSlotClasses({
    name: 'AccordionItem',
    slots,
    classNames,
  })

  const slotAriaProps = useMemo(() => {
    const ariaId = defaultKey
    const triggerId = `accordion-${ariaId}-trigger`
    const contentId = `accordion-${ariaId}-content`

    const trigger = {
      id: triggerId,
      'aria-expanded': expanded,
      'aria-controls': expanded || keepMounted ? contentId : undefined,
    }

    const content = {
      id: contentId,
      role: 'region',
      'aria-labelledby': triggerId,
      'aria-hidden': keepMounted ? !expanded : undefined,
    }

    const indicator = {
      'aria-hidden': true,
    }

    return {
      trigger,
      content,
      indicator,
    }
  }, [defaultKey, expanded, keepMounted])

  const animate = expanded ? 'expanded' : 'collapsed'

  // Skip initial animation when first rendering and the item is expanded
  const motionInitialRef = useRef(animate)

  if (motionInitialRef.current === 'expanded' && !expanded) {
    // Restore open animation for subsequent renders
    motionInitialRef.current = 'collapsed'
  }

  const contentMotionProps = keepMounted
    ? {
        animate,
        initial: motionInitialRef.current,
        variants: contentMotionVariants,
        style: {
          overflow: 'hidden',
        },
      }
    : {
        variants: contentMotionVariants,
        initial: motionInitialRef.current,
        animate: 'expanded',
        exit: 'collapsed',
        style: {
          overflow: 'hidden',
        },
      }

  const [AccordionItemRoot, getAccordionItemRootProps] = useSlot({
    component: nex.div,
    externalForwardedProps: remainingProps,
    style: styles.root,
    classNames: slotClasses.root,
    dataAttrs: {
      keepMounted,
      hideIndicator,
      disabled,
      disableAnimation,
      state: animate,
    },
  })

  const [AccordionItemHeading, getAccordionItemHeadingProps] = useSlot({
    component: nex.h3,
    externalSlotProps: slotProps?.heading,
    style: styles.heading,
    classNames: slotClasses.heading,
  })

  const [AccordionItemTrigger, getAccordionItemTriggerProps] = useSlot({
    component: ButtonBase,
    externalSlotProps: slotProps?.trigger,
    style: styles.trigger,
    classNames: slotClasses.trigger,
    ariaProps: slotAriaProps.trigger,
    additionalProps: {
      disabled,
      onClick: () => {
        toggleExpandedKey(itemKey)
      },
    },
  })

  const [AccordionItemContent, getAccordionItemContentProps] = useSlot({
    component: nex.div,
    externalSlotProps: slotProps?.content,
    style: styles.content,
    classNames: slotClasses.content,
    ariaProps: slotAriaProps.content,
    additionalProps: disableAnimation
      ? {
          style: {
            display: keepMounted ? (expanded ? 'block' : 'none') : undefined,
          },
        }
      : undefined,
  })

  const [AccordionItemIndicator, getAccordionItemIndicatorProps] = useSlot({
    component: nex.span,
    externalSlotProps: slotProps?.indicator,
    style: styles.indicator,
    classNames: slotClasses.indicator,
    ariaProps: slotAriaProps.indicator,
    additionalProps: disableAnimation
      ? {
          style: {
            transform: expanded ? 'rotate(180deg)' : 'none',
          },
        }
      : undefined,
  })

  const renderIndicator = () => {
    const indicatorElement = (
      <AccordionItemIndicator {...getAccordionItemIndicatorProps()}>
        {indicator ?? <ChevronDownOutlined />}
      </AccordionItemIndicator>
    )

    if (disableAnimation) {
      return indicatorElement
    }

    return (
      <LazyMotion features={motionFeatures}>
        <m.span
          animate={animate}
          initial={animate}
          variants={indicatorMotionVariants}
          {...indicatorMotionProps}
        >
          {indicatorElement}
        </m.span>
      </LazyMotion>
    )
  }

  const renderContent = () => {
    const contentElement = (
      <AccordionItemContent {...getAccordionItemContentProps()}>
        {children}
      </AccordionItemContent>
    )

    if (disableAnimation) {
      return keepMounted || expanded ? contentElement : null
    }

    return (
      <FadeInOutMotion
        open={expanded}
        keepMounted={keepMounted}
        motionProps={{
          ...contentMotionProps,
          ...motionProps,
        }}
      >
        {contentElement}
      </FadeInOutMotion>
    )
  }

  return (
    <AccordionItemRoot {...getAccordionItemRootProps()}>
      <AccordionItemHeading {...getAccordionItemHeadingProps()}>
        <AccordionItemTrigger {...getAccordionItemTriggerProps()}>
          <span>{title}</span>
          {!hideIndicator && renderIndicator()}
        </AccordionItemTrigger>
      </AccordionItemHeading>
      {renderContent()}
    </AccordionItemRoot>
  )
}

AccordionItem.displayName = 'AccordionItem'
