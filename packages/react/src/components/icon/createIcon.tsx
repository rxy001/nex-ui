/* eslint-disable react/prop-types */

import classNames from 'classnames'
import { forwardRef } from 'react'
import { nex } from '@nex-ui/styled'
import type { ComponentType, Ref } from 'react'
import { useNexContext } from '../provider/Context'
import { iconStyles } from '../../theme'
import { useDefaultProps, useStyles } from '../utils'
import type { IconOwnerState, InnerIconProps } from './types'

export const createIcon = (
  svgComponent: ComponentType<any>,
  defaultProps?: InnerIconProps,
) => {
  // @ts-ignore
  return forwardRef((inProps: InnerIconProps, ref: Ref<SVGElement>) => {
    const { prefix = 'nui' } = useNexContext()

    const props = useDefaultProps({
      name: 'Icon',
      props: { ...defaultProps, ...inProps },
    })

    const {
      color,
      className,
      spin = false,
      fontSize = 'md',
      width = '1em',
      height = '1em',
      ...remainingProps
    } = props

    const ownerState: IconOwnerState = {
      ...props,
      color,
      spin,
      className,
      fontSize,
      width,
      height,
    }

    const styles = useStyles({
      ownerState,
      name: 'Icon',
      styles: iconStyles,
    })

    const Icon = nex(svgComponent)

    return (
      <Icon
        sx={{
          color,
          width,
          height,
          _fs: fontSize,
          ...styles,
        }}
        ref={ref}
        className={classNames(`${prefix}-icon`, className)}
        {...remainingProps}
      />
    )
  })
}
