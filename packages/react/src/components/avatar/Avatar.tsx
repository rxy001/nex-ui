'use client'

import { useState, useEffect } from 'react'
import { nex } from '@nex-ui/styled'
import type { ElementType, ReactNode, Ref } from 'react'
import {
  useDefaultProps,
  useStyles,
  composeClasses,
  getUtilityClass,
  forwardRef,
  useSlotProps,
  resolveSxProps,
} from '../utils'
import { useNexContext } from '../provider'
import type { AvatarOwnerState, AvatarProps, UseLoadedOptions } from './types'

const useSlotClasses = (ownerState: AvatarOwnerState) => {
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

export const Avatar = forwardRef(
  <RootComponent extends ElementType = 'div'>(
    inProps: AvatarProps<RootComponent>,
    ref: Ref<HTMLDivElement>,
  ) => {
    const props = useDefaultProps<AvatarProps>({
      name: 'Avatar',
      props: inProps,
    })

    const {
      sx,
      src,
      alt,
      srcSet,
      slotProps,
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

    const classes = useSlotClasses(ownerState)

    const loaded = useLoaded({ src, srcSet })

    const hasImg = src || srcSet

    const rootProps = useSlotProps({
      externalSlotProps: remainingProps,
      externalForwardedProps: {
        ref,
        className,
      },
      classNames: classes.root,
      sx: [styles.root, resolveSxProps(sx, ownerState)],
    })

    const imgProps = useSlotProps({
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
    } else if (!!childrenProp && children !== 0) {
      children = childrenProp
    } else if (hasImg && alt) {
      // eslint-disable-next-line prefer-destructuring
      children = alt[0]
    }

    return <nex.div {...rootProps}>{children}</nex.div>
  },
)

Avatar.displayName = 'Avatar'
