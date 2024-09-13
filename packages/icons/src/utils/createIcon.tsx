import { jsx, keyframes } from '@emotion/react'
import { useCSSSystem } from '@nex-ui/system'
import { forwardRef, useMemo } from 'react'
import type { NexCSSProperties, StyleObject } from '@nex-ui/system'
import type { SVGAttributes, ComponentType } from 'react'
import { useNexIcons } from './Context'

const circle = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

export interface IconProps
  extends Omit<SVGAttributes<SVGElement>, 'color' | 'width' | 'height'> {
  width?: NexCSSProperties['width']
  height?: NexCSSProperties['height']
  spin?: boolean
  color?: NexCSSProperties['color']
  fontSize?: 'sm' | 'md' | 'lg' | number | (string & { __type?: never })
  sx?: StyleObject
}

export const createIcon = (
  svgComponent: ComponentType<any>,
  defaultProps?: IconProps,
) => {
  // @ts-ignore
  return forwardRef((inProps: IconProps, ref: SVGElement) => {
    const { prefix = 'nui' } = useNexIcons()

    const {
      spin,
      color,
      sx,
      className,
      fontSize = 'md',
      width = '1em',
      height = '1em',
      ...props
    } = {
      ...defaultProps,
      ...inProps,
    }

    const { normalize } = useCSSSystem()

    const mergedFontSize = useMemo(() => {
      if (fontSize === 'lg') {
        return '1.75em'
      }
      if (fontSize === 'md') {
        return '1.5em'
      }
      if (fontSize === 'sm') {
        return '1.25em'
      }

      return fontSize
    }, [fontSize])

    return jsx(svgComponent, {
      css: normalize({
        color,
        width,
        height,
        userSelect: 'none',
        display: 'inline-block',
        flexShrink: 0,
        animation: spin ? `${circle} 1s infinite linear` : undefined,
        fontSize: mergedFontSize,
        ...sx,
      }),
      className: `${prefix}-icon${className ? ` ${className}` : ''}`,
      ref,
      ...props,
    })
  })
}
