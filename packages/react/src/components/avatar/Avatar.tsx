'use client'

import { useState, useEffect, useMemo } from 'react'
import { avatarRecipe } from '../../theme/recipes'
import {
  useDefaultProps,
  useStyles,
  composeClasses,
  getUtilityClass,
  useSlot,
} from '../utils'
import { useNexUI } from '../provider'
import { useAvatarGroup } from './AvatarGroupContext'
import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import type {
  AvatarOwnerState,
  AvatarProps,
  UseLoadedOptions,
  LoadedState,
} from './types'

const useSlotClasses = (ownerState: AvatarOwnerState) => {
  const { prefix } = useNexUI()
  const { color, size, radius, classes, outlined } = ownerState

  return useMemo(() => {
    const avatarRoot = `${prefix}-avatar`

    const slots = {
      root: [
        'root',
        `radius-${radius}`,
        `size-${size}`,
        `color-${color}`,
        outlined && 'outlined',
      ],
      img: [`img`],
    }

    return composeClasses(slots, getUtilityClass(avatarRoot), classes)
  }, [classes, color, outlined, prefix, radius, size])
}

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

  const classes = useSlotClasses(ownerState)

  const slotAriaProps = useSlotAriaProps(ownerState)

  const [AvatarRoot, getAvatarRootProps] = useSlot({
    elementType: 'div',
    externalForwardedProps: remainingProps,
    classNames: classes.root,
    style: styles.root,
    a11y: slotAriaProps.root,
  })

  const [AvatarImg, getAvatarImgProps] = useSlot({
    elementType: 'img',
    externalSlotProps: slotProps?.img,
    classNames: classes.img,
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
