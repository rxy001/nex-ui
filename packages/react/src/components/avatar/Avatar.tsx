'use client'

import { useState, useEffect } from 'react'
import { nex } from '@nex-ui/styled'
import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { avatarRecipe } from '../../theme/recipes'
import {
  useDefaultProps,
  useStyles,
  composeClasses,
  getUtilityClass,
  useSlotProps,
} from '../utils'
import { useNexUI } from '../provider'
import { useAvatarGroup } from './AvatarGroupContext'
import type {
  AvatarOwnerState,
  AvatarProps,
  UseLoadedOptions,
  LoadedState,
} from './types'

const useSlotClasses = (ownerState: AvatarOwnerState) => {
  const { prefix } = useNexUI()

  const avatarRoot = `${prefix}-avatar`

  const { color, size, radius, classes, outlined } = ownerState

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

  const composedClasses = composeClasses(
    slots,
    getUtilityClass(avatarRoot),
    classes,
  )

  return composedClasses
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
  const { alt, children, loaded } = ownerState

  let root = {}

  if (loaded === false || loaded === 'error') {
    if (typeof children === 'string') {
      root = {
        role: 'img',
        'aria-label': children,
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
    ref,
    srcSet,
    slotProps,
    children: childrenProp,
    as = 'div',
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
    as,
    outlined,
    inGroup,
    loaded,
  }

  const styles = useStyles({
    name: 'Avatar',
    ownerState,
    recipe: avatarRecipe,
  })

  const classes = useSlotClasses(ownerState)

  const hasImg = src || srcSet

  const slotAriaProps = useSlotAriaProps(ownerState)

  const rootProps = useSlotProps({
    ownerState,
    externalForwardedProps: remainingProps,
    classNames: classes.root,
    sx: styles.root,
    additionalProps: {
      ref,
      as,
      ...slotAriaProps.root,
    },
  })

  const imgProps = useSlotProps({
    ownerState,
    externalSlotProps: slotProps?.img,
    externalForwardedProps: {
      src,
      alt,
      srcSet,
    },
    classNames: classes.img,
    sx: styles.img,
  })

  let children: ReactNode = null

  if (hasImg && loaded === 'loaded') {
    children = <nex.img {...imgProps} />
  } else if (childrenProp) {
    children = childrenProp
  } else if (hasImg && alt) {
    children = alt[0]
  }

  return <nex.div {...rootProps}>{children}</nex.div>
}

Avatar.displayName = 'Avatar'
