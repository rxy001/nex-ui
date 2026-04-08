'use client'

import { nex } from '@nex-ui/styled'
import { useNexUI } from '../provider'
import type { ElementType } from 'react'
import type { BoxProps } from './types'

const htmlProps = new Set([
  'htmlSize',
  'htmlWidth',
  'htmlHeight',
  'htmlTranslate',
])

const htmlPropsMap: Record<string, string> = {
  htmlSize: 'size',
  htmlWidth: 'width',
  htmlHeight: 'height',
  htmlTranslate: 'translate',
}

function isHtmlProp(key: string): boolean {
  return htmlProps.has(key)
}

export function Box<RootComponent extends ElementType = 'div'>(
  inProps: BoxProps<RootComponent>,
) {
  const props = inProps as BoxProps

  const { sx, ...remainingProps } = props

  const { isSystemCSSProperty } = useNexUI()

  const validProps: Record<string, any> = {}

  let cssProps: Record<string, any> | null = null

  for (const key in remainingProps) {
    if (!Object.hasOwn(remainingProps, key)) continue

    const value = remainingProps[key as keyof typeof remainingProps]

    if (isHtmlProp(key)) {
      validProps[htmlPropsMap[key]] = value
    } else if (isSystemCSSProperty(key)) {
      if (!cssProps) cssProps = {}
      cssProps[key] = value
    } else {
      validProps[key] = value
    }
  }

  let mergedSx = sx

  if (mergedSx && cssProps) {
    mergedSx = [cssProps, mergedSx]
  } else if (cssProps) {
    mergedSx = cssProps
  }

  return <nex.div {...validProps} sx={mergedSx} />
}

Box.displayName = 'Box'
