'use client'

import { useMemo } from 'react'
import { __DEV__ } from '@nex-ui/utils'
import { useNexUI } from '../provider/Context'
import { iconRecipe } from '../../theme/recipes'
import {
  useDefaultProps,
  useStyles,
  composeClasses,
  getUtilityClass,
  useSlot,
} from '../utils'
import type { ElementType } from 'react'
import type { IconProps } from './types'

const useSlotClasses = (ownerState: IconProps) => {
  const { prefix } = useNexUI()

  const { spin, size } = ownerState

  return useMemo(() => {
    const iconRoot = `${prefix}-icon`

    const slots = {
      root: ['root', spin && `spin`, size && `size-${size}`],
    }

    return composeClasses(slots, getUtilityClass(iconRoot))
  }, [prefix, size, spin])
}

export const Icon = <RootComponent extends ElementType = 'svg'>(
  inProps: IconProps<RootComponent>,
) => {
  const props = useDefaultProps<IconProps>({
    name: 'Icon',
    props: inProps,
  })

  const {
    as,
    color,
    focusable = false,
    spin = false,
    size = 'md',
    width = '1em',
    height = '1em',
    ...remainingProps
  } = props

  if (__DEV__ && !as) {
    console.warn('[Nex UI] Icon: Please pass the "as" property.')
  }

  const ownerState: IconProps = {
    ...props,
    color,
    as,
    spin,
    size,
    width,
    height,
  }

  const style = useStyles({
    ownerState,
    name: 'Icon',
    recipe: iconRecipe,
  })

  const classes = useSlotClasses(ownerState)

  const [IconRoot, getIconRootProps] = useSlot({
    style,
    elementType: 'svg',
    externalForwardedProps: remainingProps,
    classNames: classes.root,
    a11y: {
      focusable,
      'aria-hidden': props['aria-hidden'] ?? true,
    },
    additionalProps: {
      as,
      sx: {
        color,
        width,
        height,
      },
    },
  })

  return <IconRoot {...getIconRootProps()} />
}

Icon.displayName = 'Icon'
