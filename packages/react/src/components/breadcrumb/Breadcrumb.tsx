'use client'

import { nex } from '@nex-ui/styled'
import { Children, useMemo, useState } from 'react'
import { EllipsisFilled } from '@nex-ui/icons'
import { __DEV__ } from '@nex-ui/utils'
import { breadcrumbRecipe } from '../../themes/recipes'
import {
  useDefaultProps,
  useSlot,
  useSlotClasses,
  useRecipeStyles,
} from '../utils'
import { ButtonBase } from '../buttonBase'
import { BreadcrumbProvider } from './BreadcrumbContext'
import { Collection, useCollection } from '../collection'
import type { ElementType, ReactNode } from 'react'
import type { BreadcrumbContextValue } from './BreadcrumbContext'
import type { BreadcrumbProps, ItemData } from './types'
import type { CollectionItemData } from '../collection'

const slots = ['root', 'list', 'separator', 'collapse', 'expandButton'] as const

export function Breadcrumb<RootComponent extends ElementType = 'nav'>(
  inProps: BreadcrumbProps<RootComponent>,
) {
  const props = useDefaultProps<BreadcrumbProps>({
    name: 'Breadcrumb',
    props: inProps,
  })

  const {
    children,
    slotProps,
    classNames,
    separatorGap,
    maxItems = 8,
    itemsBeforeCollapse = 1,
    itemsAfterCollapse = 1,
    color = 'default',
    size = 'md',
    separator = '/',
    disableAnimation = false,
    ...remainingProps
  } = props

  const ownerState = { ...props, size, color, disableAnimation }

  const [expanded, setExpanded] = useState(false)
  const collection = useCollection<ItemData>()
  const [items, setItems] = useState<CollectionItemData<ItemData>[]>([])

  const styles = useRecipeStyles({
    ownerState,
    name: 'Breadcrumb',
    recipe: breadcrumbRecipe,
  })

  const slotAriaProps = useMemo(
    () => ({
      root: {
        'aria-label': 'breadcrumb',
      },
      separator: {
        'aria-hidden': true,
      },
      expandButton: {
        'aria-label': 'Expand breadcrumb items',
      },
    }),
    [],
  )

  const slotClasses = useSlotClasses({
    name: 'Breadcrumb',
    slots,
    classNames,
  })

  const [BreadcrumbRoot, getBreadcrumbRootProps] = useSlot({
    component: nex.nav,
    style: styles.root,
    externalForwardedProps: remainingProps,
    classNames: slotClasses.root,
    ariaProps: slotAriaProps.root,
    dataAttrs: {
      size,
      color,
    },
  })

  const [BreadcrumbList, getBreadcrumbListProps] = useSlot({
    component: nex.ol,
    style: styles.list,
    externalSlotProps: slotProps?.list,
    classNames: slotClasses.list,
  })

  const [BreadcrumbSeparator, getBreadcrumbSeparatorProps] = useSlot({
    component: nex.li,
    style: styles.separator,
    externalSlotProps: slotProps?.separator,
    classNames: slotClasses.separator,
    ariaProps: slotAriaProps.separator,
    additionalProps: {
      style: {
        // @ts-ignore
        '--breadcrumb-separator-gap':
          typeof separatorGap === 'number' ? `${separatorGap}px` : separatorGap,
      },
    },
  })

  const [BreadcrumbCollapse, getBreadcrumbCollapseProps] = useSlot({
    component: nex.li,
    style: styles.collapse,
    externalSlotProps: slotProps?.collapse,
    classNames: slotClasses.collapse,
  })

  const [BreadcrumbExpandButton, getBreadcrumbExpandButtonProps] = useSlot({
    component: ButtonBase,
    style: styles.expandButton,
    externalSlotProps: slotProps?.expandButton,
    classNames: slotClasses.expandButton,
    ariaProps: slotAriaProps.expandButton,
    additionalProps: {
      onClick: () => setExpanded(true),
    },
  })

  const renderItems = () => {
    const allItems = Children.toArray(children)
    const collapsable = maxItems && allItems.length >= maxItems

    if (expanded || !collapsable) {
      return allItems
    }

    if (itemsBeforeCollapse + itemsAfterCollapse >= maxItems) {
      if (__DEV__) {
        console.error(
          [
            '[Nex UI] Breadcrumb: You have provided an invalid combination of props to the Breadcrumb.',
            `itemsAfterCollapse={${itemsAfterCollapse}} + itemsBeforeCollapse={${itemsBeforeCollapse}} >= maxItems={${maxItems}}`,
          ].join('\n'),
        )
      }
      return allItems
    }

    return [
      ...allItems.slice(0, itemsBeforeCollapse),
      <BreadcrumbCollapse key='collapse' {...getBreadcrumbCollapseProps()}>
        <BreadcrumbExpandButton {...getBreadcrumbExpandButtonProps()}>
          <EllipsisFilled />
        </BreadcrumbExpandButton>
      </BreadcrumbCollapse>,
      ...allItems.slice(allItems.length - itemsAfterCollapse, allItems.length),
    ]
  }

  const insertSeparators = (items: ReactNode[]) => {
    return items.map((child, index) => {
      if (child) {
        return [
          child,
          index < items.length - 1 ? (
            <BreadcrumbSeparator
              {...getBreadcrumbSeparatorProps()}
              key={`separator-${index}`}
            >
              {separator}
            </BreadcrumbSeparator>
          ) : null,
        ]
      }
      return child
    })
  }

  const ctx = useMemo<BreadcrumbContextValue>(
    () => ({
      color,
      size,
      disableAnimation,
      isLast: (id: string) => items[items.length - 1]?.id === id,
    }),
    [color, size, disableAnimation, items],
  )

  return (
    <BreadcrumbRoot {...getBreadcrumbRootProps()}>
      <BreadcrumbList {...getBreadcrumbListProps()}>
        <Collection collection={collection} onItemsChange={setItems}>
          <BreadcrumbProvider value={ctx}>
            {insertSeparators(renderItems())}
          </BreadcrumbProvider>
        </Collection>
      </BreadcrumbList>
    </BreadcrumbRoot>
  )
}

Breadcrumb.displayName = 'Breadcrumb'
