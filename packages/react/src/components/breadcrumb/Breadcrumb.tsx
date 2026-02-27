'use client'

import { nex } from '@nex-ui/styled'
import {
  Children,
  cloneElement,
  isValidElement,
  useMemo,
  useState,
} from 'react'
import { EllipsisFilled } from '@nex-ui/icons'
import { __DEV__ } from '@nex-ui/utils'
import { breadcrumbRecipe } from '../../theme/recipes'
import {
  useDefaultProps,
  useSlot,
  useSlotClasses,
  useRecipeStyles,
} from '../utils'
import { ButtonBase } from '../buttonBase'
import type { ElementType, ReactElement, ReactNode } from 'react'
import type { BreadcrumbProps } from './types'

const slots = ['root', 'list', 'separator', 'collapse', 'expandButton'] as const

export const Breadcrumb = <RootComponent extends ElementType = 'nav'>(
  inProps: BreadcrumbProps<RootComponent>,
) => {
  const props = useDefaultProps<BreadcrumbProps>({
    name: 'Breadcrumb',
    props: inProps,
  })
  const [expanded, setExpanded] = useState(false)

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
    ...remainingProps
  } = props

  const ownerState = { ...props, size, color }

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
      if (isValidElement(child)) {
        const element = child as ReactElement<any, any>
        const props = {
          isLast: index === items.length - 1,
          color: element.props.color ?? color,
          size: element.props.size ?? size,
        }

        return [
          cloneElement(
            element,
            element.type.displayName === 'BreadcrumbItem' ? props : {},
          ),
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

  return (
    <BreadcrumbRoot {...getBreadcrumbRootProps()}>
      <BreadcrumbList {...getBreadcrumbListProps()}>
        {insertSeparators(renderItems())}
      </BreadcrumbList>
    </BreadcrumbRoot>
  )
}

Breadcrumb.displayName = 'Breadcrumb'
