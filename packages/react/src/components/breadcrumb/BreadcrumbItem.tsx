'use client'

import { nex } from '@nex-ui/styled'
import { useMemo } from 'react'
import { useFocusRing } from '@nex-ui/hooks'
import { isFunction } from '@nex-ui/utils'
import { breadcrumbItemRecipe } from '../../theme/recipes'
import {
  useDefaultProps,
  useSlot,
  useSlotClasses,
  useRecipeStyles,
} from '../utils'
import type { ElementType } from 'react'
import type { BreadcrumbItemProps } from './types'

const slots = ['root', 'link'] as const

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

  const ariaProps = useMemo(
    () => ({
      'aria-current': isLast ? 'page' : undefined,
      role:
        props.as && props.as !== 'a' && !isFunction(props.as)
          ? 'link'
          : undefined,
    }),
    [props.as, isLast],
  )
  const { focusVisible, focusProps } = useFocusRing()

  const styles = useRecipeStyles({
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
    component: nex.li,
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
    component: nex.a,
    style: styles.link,
    classNames: slotClasses.link,
    externalForwardedProps: remainingProps,
    ariaProps,
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
