'use client'

import { useMemo } from 'react'
import { useFocusRing } from '@nex-ui/hooks'
import { isFunction } from '@nex-ui/utils'
import { breadcrumbItemRecipe } from '../../theme/recipes'
import { useDefaultProps, useSlot, useSlotClasses, useStyles } from '../utils'
import type { ElementType } from 'react'
import type { BreadcrumbItemProps } from './types'

const slots = ['root', 'link']

const useAriaProps = (props: BreadcrumbItemProps) => {
  const {
    isLast,
    as,
    role,
    'aria-current': ariaCurrent = isLast ? 'page' : undefined,
  } = props

  return useMemo(
    () => ({
      'aria-current': ariaCurrent,
      role: role ?? (as && as !== 'a' && !isFunction(as) ? 'link' : undefined),
    }),
    [ariaCurrent, as, role],
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
    isLast,
    href,
    ...remainingProps
  } = props

  const ariaProps = useAriaProps(props)
  const { focusVisible, focusProps } = useFocusRing()

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

  let additionalProps = {}
  let dataAttrs = {}

  if (!isLast && href) {
    additionalProps = { href, ...focusProps }
    dataAttrs = { focusVisible }
  }

  const [BreadcrumbItemLink, getBreadcrumbItemLinkProps] = useSlot({
    elementType: 'a',
    style: styles.link,
    classNames: slotClasses.link,
    externalForwardedProps: remainingProps,
    a11y: ariaProps,
    additionalProps,
    dataAttrs,
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
