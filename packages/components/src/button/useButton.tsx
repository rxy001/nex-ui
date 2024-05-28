import { button, dynamicVars, btnTokens } from '@ant-ui/theme'
import { useMemo } from 'react'
import classNames from 'classnames'
import { useTheme } from '../provider'
import type { UseButtonParameters } from './types'

export const useButton = ({
  style,
  className,
  size = 'medium',
  disabled = false,
  shape = 'default',
  variant = 'primary',
  block = false,
  ...props
}: UseButtonParameters) => {
  const theme = useTheme('button')

  const mergedStyle = useMemo(
    () => ({
      ...dynamicVars(btnTokens, theme),
      ...style,
    }),
    [style, theme],
  )

  const mergedClassName = useMemo(
    () =>
      classNames(button({ variant, size, disabled, block, shape }), className),
    [block, className, disabled, shape, size, variant],
  )

  return {
    getProps: () => ({
      style: mergedStyle,
      className: mergedClassName,
      ...props,
    }),
  }
}
