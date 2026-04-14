'use client'

import { useMemo } from 'react'
import { nex } from '@nex-ui/styled'
import { useControlledState, useEvent } from '@nex-ui/hooks'
import { __DEV__ } from '@nex-ui/utils'
import { AccordionGroupProvider } from './AccordionContext'
import {
  useDefaultProps,
  useRecipeStyles,
  useSlotClasses,
  useSlot,
} from '../utils'
import { accordionRecipe } from '../../themes/recipes'
import { Collection, useCollection } from './Collection'
import type { ElementType, Key, KeyboardEvent } from 'react'
import type { AccordionProps } from './types'
import type { AccordionGroupContextValue } from './AccordionContext'

const slots = ['root'] as const

const navigationKeys = [
  'Home',
  'End',
  'ArrowDown',
  'ArrowUp',
  'ArrowLeft',
  'ArrowRight',
]

export function Accordion<RootComponent extends ElementType = 'div'>(
  inProps: AccordionProps<RootComponent>,
) {
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
    disableAnimation = false,
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

  const collection = useCollection()

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

  const style = useRecipeStyles({
    ownerState,
    name: 'Accordion',
    recipe: accordionRecipe,
  })

  const [AccordionRoot, getAccordionRootProps] = useSlot({
    style,
    component: nex.div,
    externalForwardedProps: remainingProps,
    classNames: slotClasses.root,
    dataAttrs: {
      variant,
      multiple,
    },
    additionalProps: {
      onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => {
        if (!navigationKeys.includes(event.key) || disabled) return
        const target = event.target as HTMLElement
        const items = collection.getItems().filter((item) => !item.disabled)
        const currentItemIndex = items.findIndex(
          (item) => item.element === target,
        )
        const itemCount = items.length

        if (itemCount === 0 || currentItemIndex === -1) return

        let nextItemIndex: number | null = null
        switch (event.key) {
          case 'ArrowUp':
          case 'ArrowLeft':
            nextItemIndex = currentItemIndex - 1
            break
          case 'ArrowDown':
          case 'ArrowRight':
            nextItemIndex = currentItemIndex + 1
            break
          case 'Home':
            nextItemIndex = 0
            break
          case 'End':
            nextItemIndex = itemCount - 1
            break
        }

        if (nextItemIndex === null) return
        if (nextItemIndex < 0) nextItemIndex = itemCount - 1
        const nextItem = items[nextItemIndex % itemCount]
        nextItem.element.focus()
      },
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

  const ctx = useMemo<AccordionGroupContextValue>(
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
      disableAnimation,
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
      disableAnimation,
    ],
  )

  return (
    <AccordionGroupProvider value={ctx}>
      <Collection collection={collection}>
        <AccordionRoot {...getAccordionRootProps()}>{children}</AccordionRoot>
      </Collection>
    </AccordionGroupProvider>
  )
}

Accordion.displayName = 'Accordion'
