'use client'

import { nex } from '@nex-ui/styled'
import { useState, useEffect, useMemo } from 'react'
import { avatarRecipe } from '../../theme/recipes'
import {
  useDefaultProps,
  useRecipeStyles,
  useSlot,
  useSlotClasses,
} from '../utils'
import { useAvatarGroupContext } from './AvatarGroupContext'
import type { ElementType, ReactNode } from 'react'
import type {
  AvatarOwnerState,
  AvatarProps,
  UseLoadedOptions,
  LoadedState,
} from './types'

const slots = ['root', 'img'] as const

const useLoaded = ({ src, srcSet }: UseLoadedOptions) => {
  const [loaded, setLoaded] = useState<LoadedState>(false)

  useEffect(() => {
    if (!src && !srcSet) {
      return
    }

    setLoaded(false)

    let active = true
    const image = new Image()
    image.onload = () => {
      if (!active) {
        return
      }

      setLoaded('loaded')
    }

    image.onerror = () => {
      if (!active) {
        return
      }

      setLoaded('error')
    }

    image.src = src!
    if (srcSet) {
      image.srcset = srcSet
    }

    return () => {
      active = false
    }
  }, [src, srcSet])

  return loaded
}

export const Avatar = <RootComponent extends ElementType = 'div'>(
  inProps: AvatarProps<RootComponent>,
) => {
  const props = useDefaultProps<AvatarProps>({
    name: 'Avatar',
    props: inProps,
  })

  const groupCtx = useAvatarGroupContext()

  const inGroup = !!groupCtx

  const {
    src,
    alt,
    srcSet,
    slotProps,
    classNames,
    children: childrenProp,
    size = groupCtx?.size ?? 'md',
    radius = groupCtx?.radius ?? size,
    color = groupCtx?.color ?? 'gray',
    outlined = groupCtx?.outlined ?? false,
    ...remainingProps
  } = props

  const loaded = useLoaded({ src, srcSet })

  const ownerState: AvatarOwnerState = {
    ...props,
    size,
    radius,
    color,
    outlined,
    inGroup,
  }

  const styles = useRecipeStyles({
    ownerState,
    name: 'Avatar',
    recipe: avatarRecipe,
  })

  const slotClasses = useSlotClasses({
    name: 'Avatar',
    slots,
    classNames,
  })

  const slotAriaProps = useMemo(() => {
    let root = {}

    if (loaded === false || loaded === 'error') {
      if (typeof childrenProp === 'string') {
        root = {
          role: 'img',
          'aria-label': childrenProp,
        }
      } else if (typeof alt === 'string') {
        root = {
          role: 'img',
          'aria-label': alt,
        }
      }
    }
    return {
      root,
    }
  }, [alt, childrenProp, loaded])

  const [AvatarRoot, getAvatarRootProps] = useSlot({
    component: nex.div,
    externalForwardedProps: remainingProps,
    classNames: slotClasses.root,
    style: styles.root,
    ariaProps: slotAriaProps.root,
    dataAttrs: {
      radius,
      size,
      color,
      outlined,
      inGroup,
    },
  })

  const [AvatarImg, getAvatarImgProps] = useSlot({
    component: nex.img,
    externalSlotProps: slotProps?.img,
    classNames: slotClasses.img,
    style: styles.img,
    additionalProps: {
      src,
      alt,
      srcSet,
    },
  })

  let children: ReactNode = null
  const hasImg = src || srcSet

  if (hasImg && loaded === 'loaded') {
    children = <AvatarImg {...getAvatarImgProps()} />
  } else if (childrenProp) {
    children = childrenProp
  } else if (hasImg && alt) {
    ;[children] = alt
  }

  return <AvatarRoot {...getAvatarRootProps()}>{children}</AvatarRoot>
}

Avatar.displayName = 'Avatar'
