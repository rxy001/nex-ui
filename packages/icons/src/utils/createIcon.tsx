import { jsx, keyframes } from '@emotion/react'
import { useCSSSystem } from '@nex-ui/system'
import { forwardRef, useMemo } from 'react'
import type { NexCSSProperties, StyleObject } from '@nex-ui/system'
import type { FunctionComponent, SVGAttributes } from 'react'

const circle = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

export interface IconProps extends Omit<SVGAttributes<SVGAElement>, 'color'> {
  spin?: boolean
  sx?: StyleObject
  color?: NexCSSProperties['color']
  fontSize?: 'sm' | 'md' | 'lg' | (string & { __type?: never })
}

export const createIcon = (
  svgComponent: FunctionComponent<any>,
  defaultProps?: IconProps,
) => {
  // @ts-ignore
  return forwardRef((inProps: IconProps, ref: SVGElement) => {
    const {
      spin,
      color,
      sx,
      fontSize = 'md',
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
        _w: '1em',
        _h: '1em',
        _fs: '24px',
        userSelect: 'none',
        display: 'inline-block',
        flexShrink: 0,
        animation: spin ? `${circle} 1s infinite linear` : undefined,
        fontSize: mergedFontSize,
        ...sx,
      }),
      ref,
      ...props,
    })
  })
}
