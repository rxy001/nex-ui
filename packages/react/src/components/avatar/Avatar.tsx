'use client'

import { useState, useEffect, useMemo } from 'react'
import { avatarRecipe } from '../../theme/recipes'
import { useDefaultProps, useStyles, useSlot, useSlotClasses } from '../utils'
import { useAvatarGroup } from './AvatarGroupContext'
import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import type {
  AvatarOwnerState,
  AvatarProps,
  UseLoadedOptions,
  LoadedState,
} from './types'

const slots = ['root', 'img']

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

const useSlotAriaProps = (
  ownerState: AvatarOwnerState,
): Record<'root', HTMLAttributes<HTMLElement>> => {
  const {
    alt,
    children,
    loaded,
    'aria-label': ariaLabel,
    role = 'img',
  } = ownerState

  return useMemo(() => {
    let root = {}

    if (loaded === false || loaded === 'error') {
      if (typeof children === 'string') {
        root = {
          role,
          'aria-label': ariaLabel ?? children,
        }
      } else if (typeof alt === 'string') {
        root = {
          role,
          'aria-label': ariaLabel ?? alt,
        }
      }
    }
    return {
      root,
    }
  }, [alt, ariaLabel, children, loaded, role])
}

export const Avatar = <RootComponent extends ElementType = 'div'>(
  inProps: AvatarProps<RootComponent>,
) => {
  const props = useDefaultProps<AvatarProps>({
    name: 'Avatar',
    props: inProps,
  })

  const groupCtx = useAvatarGroup()

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
    loaded,
  }

  const styles = useStyles({
    ownerState,
    name: 'Avatar',
    recipe: avatarRecipe,
  })

  const slotClasses = useSlotClasses({
    name: 'Avatar',
    slots,
    classNames,
  })

  const slotAriaProps = useSlotAriaProps(ownerState)

  const [AvatarRoot, getAvatarRootProps] = useSlot({
    elementType: 'div',
    externalForwardedProps: remainingProps,
    classNames: slotClasses.root,
    style: styles.root,
    a11y: slotAriaProps.root,
    dataAttrs: {
      radius,
      size,
      color,
      outlined,
      inGroup,
    },
  })

  const [AvatarImg, getAvatarImgProps] = useSlot({
    elementType: 'img',
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
    children = alt[0]
  }

  return <AvatarRoot {...getAvatarRootProps()}>{children}</AvatarRoot>
}

Avatar.displayName = 'Avatar'
