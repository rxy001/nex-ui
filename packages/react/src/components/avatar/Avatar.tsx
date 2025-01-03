'use client'

import clsx from 'clsx'
import { useState, useEffect } from 'react'
import type { ElementType, ReactNode, Ref } from 'react'
import { composeSx, nex } from '@nex-ui/styled'
import {
  useDefaultProps,
  useStyles,
  composeClasses,
  getUtilityClass,
  forwardRef,
} from '../utils'
import { useNexContext } from '../provider'
import type { AvatarOwnerState, AvatarProps, UseLoadedOptions } from './types'

const useUtilityClasses = <RootComponent extends ElementType>(
  ownerState: AvatarOwnerState<RootComponent>,
) => {
  const { prefix } = useNexContext()

  const avatarRoot = `${prefix}-avatar`

  const { color, size, radius, classes } = ownerState

  const slots = {
    root: ['root', `radius-${radius}`, `size-${size}`, `color-${color}`],
    img: [`img`],
  }

  const composedClasses = composeClasses(
    slots,
    getUtilityClass(avatarRoot),
    ownerState,
    classes,
  )

  return composedClasses
}

const useLoaded = ({ src, srcSet }: UseLoadedOptions) => {
  const [loaded, setLoaded] = useState<false | 'error' | 'loaded'>(false)

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

    // @ts-expect-error
    image.src = src
    if (srcSet) {
      image.srcset = srcSet
    }

    return () => {
      active = false
    }
  }, [src, srcSet])

  return loaded
}

export const Avatar = forwardRef(
  <RootComponent extends ElementType = 'div'>(
    inProps: AvatarProps<RootComponent>,
    ref: Ref<HTMLDivElement>,
  ) => {
    const props = useDefaultProps({
      name: 'Avatar',
      props: inProps,
    })

    const {
      sx,
      src,
      as,
      alt,
      srcSet,
      className,
      slotProps,
      children: childrenProp,
      size = 'md',
      radius = size,
      color = 'gray',
      ...remainingProps
    } = props

    const ownerState: AvatarOwnerState<RootComponent> = {
      ...props,
      size,
      radius,
      color,
    }

    const styles = useStyles({
      name: 'Avatar',
      ownerState,
    })

    const classes = useUtilityClasses<RootComponent>(ownerState)

    const loaded = useLoaded({ src, srcSet })

    const hasImg = src || srcSet

    let children: ReactNode = null

    if (hasImg && loaded === 'loaded') {
      children = (
        <nex.img
          {...slotProps?.img}
          src={src}
          alt={alt}
          srcSet={srcSet}
          sx={composeSx(styles.img, slotProps?.img?.sx)}
          className={clsx(classes.img, slotProps?.img?.className)}
        />
      )
    } else if (!!childrenProp && children !== 0) {
      children = childrenProp
    } else if (hasImg && alt) {
      // eslint-disable-next-line prefer-destructuring
      children = alt[0]
    }

    return (
      <nex.div
        {...remainingProps}
        ref={ref}
        as={as as ElementType}
        className={clsx(classes.root, className)}
        sx={composeSx(styles.root, sx)}
      >
        {children}
      </nex.div>
    )
  },
)

Avatar.displayName = 'Avatar'
