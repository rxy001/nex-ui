/* eslint-disable react/prop-types */

import classNames from 'classnames'
import { forwardRef } from 'react'
import { nex } from '@nex-ui/styled'
import type { ComponentType, Ref } from 'react'
import { useNexContext } from '../provider/Context'
import { iconStyles } from '../../theme'
import { useDefaultProps, useMergedTheme } from '../utils'
import type { InnerIconProps } from './types'

const COMPONENT_NAME = 'Icon'

export const createIcon = (
  svgComponent: ComponentType<any>,
  defaultProps?: InnerIconProps,
) => {
  // @ts-ignore
  return forwardRef((inProps: InnerIconProps, ref: Ref<SVGElement>) => {
    const { prefix = 'nui' } = useNexContext()

    const props = useDefaultProps({
      name: COMPONENT_NAME,
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

    const ownerState = {
      ...props,
      color,
      spin,
      className,
      fontSize,
      width,
      height,
    }

    const styles = useMergedTheme({
      name: COMPONENT_NAME,
      styles: iconStyles,
      props: ownerState,
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
