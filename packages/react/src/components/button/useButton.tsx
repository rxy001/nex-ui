import classNames from 'classnames'
import { useMemo } from 'react'
import { useEvent } from '@nex-ui/utils'
import type { HTMLElementTagName } from '@nex-ui/styled'
import { useNexContext } from '../provider'
import { Icon } from '../icon'
import { button } from '../../theme'
import { ButtonStartIcon } from './ButtonStartIcon'
import { ButtonEndIcon } from './ButtonEndIcon'
import { useMergeAndNormalizeTheme } from '../utils'
import type { ButtonProps } from './types'

export const useButton = ({
  className,
  href,
  variant = 'solid',
  radius = 'md',
  size = 'md',
  iconOnly = false,
  loading = false,
  disabled = false,
  block = false,
  type = 'button',
  color = 'blue',
  startIcon: startIconProp,
  endIcon: endIconProp,
  onClick: onClickProp,
  ...restProps
}: ButtonProps) => {
  const { prefix } = useNexContext()

  const variantsProp = useMemo(
    () => ({
      size,
      loading,
      iconOnly,
      variant,
      block,
      disabled,
      radius: radius ?? size,
    }),
    [block, disabled, iconOnly, loading, radius, size, variant],
  )

  const mergedStyles = useMemo(
    () => ({
      ...button,
      colorPalette: color,
    }),
    [color],
  )

  const cssProp = useMergeAndNormalizeTheme(
    'button',
    mergedStyles,
    variantsProp,
  )

  const htmlElement: HTMLElementTagName =
    typeof href === 'string' && href ? 'a' : 'button'

  const onClick = useEvent(
    (
      event: React.MouseEvent<
        HTMLButtonElement | HTMLAnchorElement,
        MouseEvent
      >,
    ) => {
      if (loading || disabled) {
        event.preventDefault()
        return
      }

      ;(onClickProp as ButtonProps['onClick'])?.(event)
    },
  )

  return {
    rootProps: {
      onClick,
      css: cssProp,
      className: classNames(`${prefix}-btn`, className),
      ...(htmlElement === 'a'
        ? {
            href,
            as: htmlElement,
            'data-disabled': disabled || null,
          }
        : {
            type,
            disabled,
          }),
      ...restProps,
    },
    startIcon: (loading || startIconProp) && (
      <ButtonStartIcon size={size} spin={loading}>
        {loading ? <Icon icon="ant-design:loading-outlined" /> : startIconProp}
      </ButtonStartIcon>
    ),
    endIcon: endIconProp && (
      <ButtonEndIcon size={size}>{endIconProp}</ButtonEndIcon>
    ),
  }
}
