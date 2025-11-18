'use client'

import { useMemo } from 'react'
import { breadcrumbItemRecipe } from '../../theme/recipes'
import { useDefaultProps, useSlot, useSlotClasses, useStyles } from '../utils'
import type { ElementType } from 'react'
import type { BreadcrumbItemProps } from './types'

const slots = ['root', 'link']

const useAriaProps = (props: BreadcrumbItemProps) => {
  const ariaCurrent =
    props['aria-current'] ?? (props.isLast ? 'page' : undefined)

  return useMemo(
    () => ({
      'aria-current': ariaCurrent,
    }),
    [ariaCurrent],
  )
}

export const BreadcrumbItem = <LinkComponent extends ElementType = 'a'>(
  inProps: BreadcrumbItemProps<LinkComponent>,
) => {
  const props = useDefaultProps<BreadcrumbItemProps>({
    name: 'BreadcrumbItem',
    props: inProps,
  })

  const {
    children,
    className,
    slotProps,
    classNames,
    color,
    size,
    ...remainingProps
  } = props

  const ariaProps = useAriaProps(props)

  const styles = useStyles({
    ownerState: props,
    name: 'BreadcrumbItem',
    recipe: breadcrumbItemRecipe,
  })

  const slotClasses = useSlotClasses({
    name: 'BreadcrumbItem',
    slots,
    classNames,
  })

  const [BreadcrumbItemRoot, getBreadcrumbItemRootProps] = useSlot({
    elementType: 'li',
    style: styles.root,
    classNames: slotClasses.root,
    externalSlotProps: slotProps?.root,
    externalForwardedProps: {
      className,
    },
    dataAttrs: {
      size,
      color,
    },
  })

  const [BreadcrumbItemLink, getBreadcrumbItemLinkProps] = useSlot({
    elementType: 'a',
    style: styles.link,
    classNames: slotClasses.link,
    externalForwardedProps: remainingProps,
    a11y: ariaProps,
  })

  return (
    <BreadcrumbItemRoot {...getBreadcrumbItemRootProps()}>
      <BreadcrumbItemLink {...getBreadcrumbItemLinkProps()}>
        {children}
      </BreadcrumbItemLink>
    </BreadcrumbItemRoot>
  )
}

BreadcrumbItem.displayName = 'BreadcrumbItem'
