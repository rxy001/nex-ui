/* eslint-disable react/prop-types */

import classNames from 'classnames'
import { forwardRef } from 'react'
import { nex } from '@nex-ui/styled'
import type { ComponentType, Ref } from 'react'
import { useNexContext } from '../provider/Context'
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
      sx,
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
    })

    const Icon = nex(svgComponent)

    return (
      <Icon
        sx={{
          color,
          width,
          height,
          fs: fontSize,
          ...styles,
          ...sx,
        }}
        ref={ref}
        className={classNames(`${prefix}-icon`, className)}
        {...remainingProps}
      />
    )
  })
}
