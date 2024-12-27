'use client'

import clsx from 'clsx'
import { forwardRef, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { composeSx, nex } from '@nex-ui/styled'
import {
  useDefaultProps,
  useStyles,
  composeClasses,
  getUtilityClass,
} from '../utils'
import { useNexContext } from '../provider'
import type { AvatarOwnerState, AvatarProps, UseLoadedOptions } from './types'

const useUtilityClasses = (ownerState: AvatarOwnerState) => {
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

    // @ts-ignore
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

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (inProps, ref) => {
    const props = useDefaultProps({
      name: 'Avatar',
      props: inProps,
    })

    const {
      sx,
      src,
      srcSet,
      alt,
      className,
      children: childrenProp,
      size = 'md',
      radius = size,
      color = 'gray',
      ...remainingProps
    } = props

    const ownerState = {
      ...props,
      size,
      radius,
      color,
    }

    const styles = useStyles({
      name: 'Avatar',
      ownerState,
    })

    const classes = useUtilityClasses(ownerState)

    const loaded = useLoaded({ src, srcSet })

    const hasImg = src || srcSet

    let children: ReactNode = null

    if (hasImg && loaded === 'loaded') {
      children = (
        <nex.img
          src={src}
          alt={alt}
          sx={styles.img}
          srcSet={srcSet}
          className={classes.img}
        />
      )
    } else if (!!childrenProp && children !== 0) {
      children = childrenProp
    } else if (hasImg && alt) {
      ;[children] = alt
    }

    return (
      <nex.div
        ref={ref}
        className={clsx(className, classes.root)}
        sx={composeSx(styles.root, sx)}
        {...remainingProps}
      >
        {children}
      </nex.div>
    )
  },
)
