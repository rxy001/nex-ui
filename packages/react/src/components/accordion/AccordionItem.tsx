'use client'

import * as m from 'motion/react-m'
import { nex } from '@nex-ui/styled'
import { chain } from '@nex-ui/utils'
import { LazyMotion, AnimatePresence } from 'motion/react'
import { ChevronDownOutlined } from '@nex-ui/icons'
import { useId, useMemo } from 'react'
import { accordionItemRecipe } from '../../themes/recipes'
import { ButtonBase } from '../buttonBase'
import {
  useDefaultProps,
  useRecipeStyles,
  useSlot,
  useSlotClasses,
  motionFeatures,
  FadeInOutMotion,
  useKeepMountedState,
} from '../utils'
import { RovingFocusItem } from '../rovingFocus'
import { useAccordionGroupContext } from './AccordionContext'
import type { ElementType } from 'react'
import type { HTMLMotionProps } from 'motion/react'
import type { AccordionItemOwnerState, AccordionItemProps } from './types'

const slots = ['root', 'heading', 'trigger', 'content', 'indicator'] as const

export function AccordionItem<RootComponent extends ElementType = 'div'>(
  inProps: AccordionItemProps<RootComponent>,
) {
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

  const { resolvedDisplay, onAnimationStart, onAnimationComplete } =
    useKeepMountedState({
      open: expanded,
      keepMounted,
      disableAnimation,
    })

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

  const animate = expanded ? 'visible' : 'hidden'

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
      state: expanded ? 'expanded' : 'collapsed',
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
      tabIndex: disabled ? -1 : 0,
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
    additionalProps: {
      style: {
        display: resolvedDisplay,
      },
    },
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

  const resolvedIndicatorMotionProps = useMemo<HTMLMotionProps<'span'>>(() => {
    return {
      ...indicatorMotionProps,
      variants: {
        ...indicatorMotionProps?.variants,
        visible: {
          rotate: 180,
          ...indicatorMotionProps?.variants?.visible,
        },
        hidden: {
          rotate: 0,
          ...indicatorMotionProps?.variants?.hidden,
        },
      },
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
        ...indicatorMotionProps?.transition,
      },
    }
  }, [indicatorMotionProps])

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
          initial={false}
          animate={animate}
          {...resolvedIndicatorMotionProps}
        >
          {indicatorElement}
        </m.span>
      </LazyMotion>
    )
  }

  const resolvedContentMotionProps = useMemo<HTMLMotionProps<'div'>>(() => {
    return {
      ...motionProps,
      style: {
        overflow: 'hidden',
        ...motionProps?.style,
      },
      variants: {
        ...motionProps?.variants,
        visible: {
          height: 'auto',
          ...motionProps?.variants?.visible,
        },
        hidden: {
          height: 0,
          ...motionProps?.variants?.hidden,
        },
      },
      transition: {
        ...motionProps?.transition,
        height: {
          duration: 0.2,
          ease: 'easeInOut',
          // @ts-expect-error
          ...motionProps?.transition?.height,
        },
        opacity: {
          duration: 0.2,
          delay: 0.1,
          ease: 'easeInOut',
          // @ts-expect-error
          ...motionProps?.transition?.opacity,
        },
      },
    }
  }, [motionProps])

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
      <LazyMotion features={motionFeatures}>
        <AnimatePresence initial={false}>
          {keepMounted || expanded ? (
            <FadeInOutMotion
              animate={animate}
              {...resolvedContentMotionProps}
              style={{
                display: resolvedDisplay,
                ...resolvedContentMotionProps.style,
              }}
              onAnimationStart={chain(
                onAnimationStart,
                resolvedContentMotionProps.onAnimationStart,
              )}
              onAnimationComplete={chain(
                onAnimationComplete,
                resolvedContentMotionProps.onAnimationComplete,
              )}
            >
              {contentElement}
            </FadeInOutMotion>
          ) : null}
        </AnimatePresence>
      </LazyMotion>
    )
  }

  return (
    <AccordionItemRoot {...getAccordionItemRootProps()}>
      <AccordionItemHeading {...getAccordionItemHeadingProps()}>
        <RovingFocusItem focusable={!disabled}>
          <AccordionItemTrigger {...getAccordionItemTriggerProps()}>
            <span>{title}</span>
            {!hideIndicator && renderIndicator()}
          </AccordionItemTrigger>
        </RovingFocusItem>
      </AccordionItemHeading>
      {renderContent()}
    </AccordionItemRoot>
  )
}

AccordionItem.displayName = 'AccordionItem'
