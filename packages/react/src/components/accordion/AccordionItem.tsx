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
  Ref,
} from 'react'
import { useNexUI } from '../provider'
import { accordionItemRecipe } from '../../theme/recipes'
import {
  forwardRef,
  useDefaultProps,
  useSlotProps,
  useStyles,
  composeClasses,
  getUtilityClass,
} from '../utils'
import { useAccordion } from './Context'
import { Icon } from '../icon'
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
): Record<'trigger' | 'content' | 'indicator', HTMLAttributes<HTMLElement>> => {
  const { itemKey, disabled, expanded, slotProps } = ownerState
  const triggerProps = slotProps?.trigger || {}
  const triggerId = useId()
  const contentId = `panel-${itemKey}-content`

  let triggerAriaProps: ButtonHTMLAttributes<HTMLButtonElement> = {
    'aria-expanded': expanded,
    'aria-controls': contentId,
    type: 'button',
    tabIndex: disabled ? -1 : (slotProps?.trigger?.tabIndex ?? 0),
    'aria-disabled': disabled || undefined,
    id: triggerId,
    disabled,
  }

  if (triggerProps.as && triggerProps.as !== 'button') {
    triggerAriaProps = {
      ...triggerAriaProps,
      role: 'button',
      type: undefined,
      disabled: undefined,
    }
  }

  return {
    trigger: triggerAriaProps,
    content: {
      role: 'region',
      'aria-labelledby': triggerId,
      id: contentId,
    },
    indicator: {
      'aria-hidden': true,
      // @ts-ignore
      focusable: false,
    },
  }
}

export const AccordionItem = forwardRef(
  <RootComponent extends ElementType = 'div'>(
    inProps: AccordionItemProps<RootComponent>,
    ref: Ref<HTMLDivElement>,
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
      disabledExpandedKeys,
      disabled: defaultDisabled,
      indicator: defaultIndicator = ChevronDownOutlined,
      motionProps: defaultMotionProps,
      keepMounted: defaultKeepMounted,
      hideIndicator: defaultHideIndicator,
    } = useAccordion()

    const {
      children,
      title,
      slotProps,
      as = 'div',
      motionProps = defaultMotionProps,
      hideIndicator = defaultHideIndicator,
      keepMounted = defaultKeepMounted,
      indicator = defaultIndicator,
      itemKey = defaultKey,
      disabled = disabledExpandedKeys.includes(itemKey) || defaultDisabled,
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

    const rootProps = useSlotProps({
      externalForwardedProps: remainingProps,
      sx: styles.root,
      classNames: classes.root,
      additionalProps: {
        ref,
        as,
      },
    })

    const headingProps = useSlotProps({
      externalSlotProps: slotProps?.heading,
      sx: styles.heading,
      classNames: classes.heading,
    })

    const triggerProps = useSlotProps({
      externalSlotProps: {
        ...slotProps?.trigger,
        ref: mergeRefs(
          triggerRef,
          slotProps?.trigger?.ref as Ref<HTMLButtonElement>,
        ),
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
      externalSlotProps: slotProps?.content,
      sx: styles.content,
      classNames: classes.content,
      additionalProps: slotAriaProps.content,
    })

    const indicatorProps = useSlotProps({
      externalSlotProps: slotProps?.indicator,
      sx: styles.indicator,
      classNames: classes.indicator,
      additionalProps: {
        as: indicator,
        ...slotAriaProps.indicator,
      },
    })

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
                <m.span variants={indicatorMotionVariants} animate={animate}>
                  <Icon {...indicatorProps} />
                </m.span>
              )}
            </nex.button>
          </nex.h3>
          <AnimatePresence>
            {(keepMounted || expanded) && (
              // @ts-ignore MotionProps is not compatible with MotionComponent?
              <m.div {...contentMotionProps} {...motionProps}>
                <nex.div {...contentProps}>{children}</nex.div>
              </m.div>
            )}
          </AnimatePresence>
        </nex.div>
      </LazyMotion>
    )
  },
)
