import { forwardRef } from 'react'
import { nex, composeSx } from '@nex-ui/styled'
import clsx from 'clsx'
import {
  useStyles,
  useDefaultProps,
  composeClasses,
  getUtilityClass,
} from '../utils'
import type { InputTextOwnerState, InputTextProps } from './types'

/**
 * sx
 * size
 * color
 * autoFocus
 * classes
 * disabled
 * defaultValue
 * variants
 * fullWidth
 * radius
 */

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  (inProps, ref) => {
    const props = useDefaultProps({
      name: 'InputText',
      props: inProps,
      defaultProps: {
        color: 'blue',
        size: 'md',
        autoFocus: false,
        disabled: false,
        variants: 'outlined',
        fullWidth: false,
        radius: 'md',
      },
    })

    const { as, sx, classes, className, defaultValue } = props

    const ownerState: InputTextOwnerState = {
      ...props,
    }

    const styles = useStyles({
      ownerState,
      name: 'InputText',
    })

    const mergedSx = composeSx(styles, sx)

    return <nex.input sx={mergedSx} className={clsx(classes, className)} />
  },
)
