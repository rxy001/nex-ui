'use client'

import { nex } from '@nex-ui/styled'
import type { ElementType, Ref, SVGProps } from 'react'
import { __DEV__ } from '@nex-ui/utils'
import { useNexUI } from '../provider/Context'
import { iconRecipe } from '../../theme/recipes'
import {
  useDefaultProps,
  useStyles,
  composeClasses,
  getUtilityClass,
  forwardRef,
  useSlotProps,
} from '../utils'
import type { IconOwnerState, IconProps } from './types'

const useSlotClasses = (ownerState: IconOwnerState) => {
  const { prefix } = useNexUI()

  const iconRoot = `${prefix}-icon`

  const { spin, size } = ownerState

  const slots = {
    root: ['root', spin && `spin`, size && `size-${size}`],
  }

  const composedClasses = composeClasses(slots, getUtilityClass(iconRoot))

  return composedClasses
}

const useAriaProps = (): SVGProps<SVGSVGElement> => {
  return {
    'aria-hidden': true,
    focusable: false,
  }
}

export const Icon = forwardRef(
  <RootComponent extends ElementType = 'svg'>(
    inProps: IconProps<RootComponent>,
    ref: Ref<SVGSVGElement>,
  ) => {
    const props = useDefaultProps<IconProps>({
      name: 'Icon',
      props: inProps,
    })

    const {
      as,
      color,
      spin = false,
      size = 'md',
      width = '1em',
      height = '1em',
      ...remainingProps
    } = props

    if (__DEV__ && !as) {
      console.warn('[Nex UI] Icon: Please pass the "as" property.')
    }

    const ownerState: IconOwnerState = {
      ...props,
      color,
      as,
      spin,
      size,
      width,
      height,
    }

    const ariaProps = useAriaProps()

    const styles = useStyles({
      ownerState,
      name: 'Icon',
      recipe: iconRecipe,
    })

    const classes = useSlotClasses(ownerState)

    const rootIcon = useSlotProps({
      ownerState,
      externalForwardedProps: remainingProps,
      sx: styles,
      classNames: classes.root,
      additionalProps: {
        ref,
        as,
        ...ariaProps,
        sx: {
          color,
          width,
          height,
        },
      },
    })

    return <nex.span {...rootIcon} />
  },
)

Icon.displayName = 'Icon'
