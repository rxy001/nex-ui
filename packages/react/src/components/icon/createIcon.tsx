import { jsx } from '@emotion/react'
import classNames from 'classnames'
import { forwardRef } from 'react'
import type { StyleObject } from '@nex-ui/system'
import type { ComponentType } from 'react'
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
  return forwardRef((inProps: InnerIconProps, ref: SVGElement) => {
    const { prefix = 'nui', normalize } = useNexContext()

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

    return jsx(svgComponent, {
      css: normalize({
        color,
        width,
        height,
        _fs: fontSize,
        ...styles,
      } as StyleObject),
      ref,
      className: classNames(`${prefix}-icon`, className),
      ...remainingProps,
    })
  })
}
