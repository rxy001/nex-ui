'use client'

import { nex } from '@nex-ui/styled'
import { useMemo } from 'react'
import { useControlledState, useEvent } from '@nex-ui/hooks'
import { __DEV__, filter } from '@nex-ui/utils'
import type { ElementType, Key } from 'react'
import { AccordionGroupProvider } from './AccordionContext'
import { useNexUI } from '../provider'
import {
  useDefaultProps,
  useSlotProps,
  useStyles,
  composeClasses,
  getUtilityClass,
} from '../utils'
import { accordionRecipe } from '../../theme/recipes'
import type { AccordionOwnerState, AccordionProps } from './types'

const useSlotClasses = (ownerState: AccordionProps) => {
  const { prefix } = useNexUI()

  const { disabled, hideIndicator, multiple, variant, keepMounted } = ownerState

  const accordionRoot = `${prefix}-accordion`

  const slots = {
    root: [
      'root',
      variant && `variant-${variant}`,
      hideIndicator && 'hide-indicator',
      keepMounted && 'keep-mounted',
      disabled && 'disabled',
      multiple && 'multiple',
    ],
  }

  const composedClasses = composeClasses(slots, getUtilityClass(accordionRoot))

  return composedClasses
}

export const Accordion = <RootComponent extends ElementType = 'div'>(
  inProps: AccordionProps<RootComponent>,
) => {
  const props = useDefaultProps<AccordionProps>({
    name: 'Accordion',
    props: inProps,
  })

  const {
    ref,
    children,
    indicator,
    motionProps,
    indicatorMotionProps,
    hideIndicator = false,
    variant = 'underlined',
    multiple = false,
    disabled = false,
    disabledKeys = [],
    keepMounted = true,
    defaultExpandedKeys = [],
    as = 'div',
    onExpandedKeysChange,
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

  const ownerState: AccordionOwnerState = {
    ...props,
    hideIndicator,
    multiple,
    disabled,
    disabledKeys,
    keepMounted,
    defaultExpandedKeys,
    expandedKeys,
    variant,
    as,
  }

  const classes = useSlotClasses(ownerState)

  const styles = useStyles({
    ownerState,
    name: 'Accordion',
    recipe: accordionRecipe,
  })

  const rootProps = useSlotProps({
    ownerState,
    externalForwardedProps: remainingProps,
    sx: styles,
    classNames: classes.root,
    additionalProps: {
      ref,
      as,
    },
  })

  const toggleExpandedKey = useEvent((key: Key) => {
    if (expandedKeys.includes(key)) {
      setExpandedKeys(filter(expandedKeys, (k: Key) => k !== key))
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
    ],
  )

  return (
    <AccordionGroupProvider value={ctx}>
      <nex.div {...rootProps}>{children}</nex.div>
    </AccordionGroupProvider>
  )
}
