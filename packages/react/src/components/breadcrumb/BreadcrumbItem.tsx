'use client'

import { nex } from '@nex-ui/styled'
import { useId, useMemo } from 'react'
import { useFocusRing } from '@nex-ui/hooks'
import { isFunction } from '@nex-ui/utils'
import { breadcrumbItemRecipe } from '../../theme/recipes'
import { useBreadcrumbContext } from './BreadcrumbContext'
import {
  useDefaultProps,
  useSlot,
  useSlotClasses,
  useRecipeStyles,
} from '../utils'
import { CollectionItem } from '../collection'
import type { ElementType } from 'react'
import type { BreadcrumbItemProps, ItemData } from './types'

const slots = ['root', 'link'] as const

export const BreadcrumbItem = <LinkComponent extends ElementType = 'a'>(
  inProps: BreadcrumbItemProps<LinkComponent>,
) => {
  const props = useDefaultProps<BreadcrumbItemProps>({
    name: 'BreadcrumbItem',
    props: inProps,
  })

  const ctx = useBreadcrumbContext()

  const {
    children,
    className,
    slotProps,
    classNames,
    href,
    color = ctx.color,
    size = ctx.size,
    disableAnimation = ctx.disableAnimation,
    ...remainingProps
  } = props

  const key = useId()

  const { isLast } = ctx

  const last = useMemo(() => isLast(key), [isLast, key])

  const ownerState = {
    ...props,
    color,
    size,
    last,
    disableAnimation,
  }

  const ariaProps = useMemo(
    () => ({
      'aria-current': last ? 'page' : undefined,
      role:
        props.as && props.as !== 'a' && !isFunction(props.as)
          ? 'link'
          : undefined,
    }),
    [props.as, last],
  )
  const { focusVisible, focusProps } = useFocusRing()

  const styles = useRecipeStyles({
    ownerState,
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
      disableAnimation,
    },
  })

  let additionalProps = {}
  let dataAttrs = {}

  if (!last && href) {
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
    <CollectionItem<ItemData> id={key}>
      <BreadcrumbItemRoot {...getBreadcrumbItemRootProps()}>
        <BreadcrumbItemLink {...getBreadcrumbItemLinkProps()}>
          {children}
        </BreadcrumbItemLink>
      </BreadcrumbItemRoot>
    </CollectionItem>
  )
}

BreadcrumbItem.displayName = 'BreadcrumbItem'
