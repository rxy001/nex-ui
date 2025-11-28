'use client'

import { useMemo } from 'react'
import { useControlledState, useEvent } from '@nex-ui/hooks'
import { __DEV__ } from '@nex-ui/utils'
import { AccordionGroupProvider } from './AccordionContext'
import { useDefaultProps, useStyles, useSlotClasses, useSlot } from '../utils'
import { accordionRecipe } from '../../theme/recipes'
import type { ElementType, Key } from 'react'
import type { AccordionProps } from './types'

const slots = ['root']

export const Accordion = <RootComponent extends ElementType = 'div'>(
  inProps: AccordionProps<RootComponent>,
) => {
  const props = useDefaultProps<AccordionProps>({
    name: 'Accordion',
    props: inProps,
  })

  const {
    children,
    indicator,
    motionProps,
    indicatorMotionProps,
    onExpandedKeysChange,
    animateDisabled = false,
    hideIndicator = false,
    variant = 'underlined',
    multiple = false,
    disabled = false,
    disabledKeys = [],
    keepMounted = false,
    defaultExpandedKeys = [],
    expandedKeys: expandedKeysProps,
    ...remainingProps
  } = props

  const [expandedKeys, setExpandedKeys] = useControlledState(
    expandedKeysProps,
    defaultExpandedKeys,
    onExpandedKeysChange,
  )

  if (__DEV__ && !multiple && expandedKeys.length > 1) {
    console.warn(
      '[Nex UI] Accordion: The multiple prop of the Accordion is set to false, but the number of currently expanded items exceeds 1. Please check and set the appropriate props.',
    )
  }

  const ownerState: AccordionProps = {
    ...props,
    hideIndicator,
    multiple,
    disabled,
    disabledKeys,
    keepMounted,
    defaultExpandedKeys,
    expandedKeys,
    variant,
  }

  const slotClasses = useSlotClasses({
    name: 'Accordion',
    slots,
  })

  const style = useStyles({
    ownerState,
    name: 'Accordion',
    recipe: accordionRecipe,
  })

  const [AccordionRoot, getAccordionRootProps] = useSlot({
    style,
    elementType: 'div',
    externalForwardedProps: remainingProps,
    classNames: slotClasses.root,
    dataAttrs: {
      variant,
      multiple,
    },
  })

  const toggleExpandedKey = useEvent((key: Key) => {
    if (expandedKeys.includes(key)) {
      setExpandedKeys(expandedKeys.filter((k: Key) => k !== key))
    } else {
      if (multiple) {
        setExpandedKeys([...expandedKeys, key])
        return
      }
      setExpandedKeys([key])
    }
  })

  const ctx = useMemo(
    () => ({
      expandedKeys,
      toggleExpandedKey,
      motionProps,
      disabledKeys,
      disabled,
      keepMounted,
      hideIndicator,
      indicator,
      variant,
      indicatorMotionProps,
      animateDisabled,
    }),
    [
      disabled,
      disabledKeys,
      expandedKeys,
      hideIndicator,
      indicator,
      keepMounted,
      motionProps,
      toggleExpandedKey,
      variant,
      indicatorMotionProps,
      animateDisabled,
    ],
  )

  return (
    <AccordionGroupProvider value={ctx}>
      <AccordionRoot {...getAccordionRootProps()}>{children}</AccordionRoot>
    </AccordionGroupProvider>
  )
}

Accordion.displayName = 'Accordion'
