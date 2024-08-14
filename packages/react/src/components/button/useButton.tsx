import classNames from 'classnames'
import { useMemo } from 'react'
import { useEvent } from '@nex-ui/utils'
import type { MouseEvent } from 'react'
import type { HTMLElementTagName } from '@nex-ui/styled'
import { useNexContext } from '../provider'
import { Icon } from '../icon'
import { button } from '../../theme'
import { ButtonStartIcon } from './ButtonStartIcon'
import { ButtonEndIcon } from './ButtonEndIcon'
import { useMergedTheme, useDefaultProps } from '../utils'
import type { ButtonProps } from './types'

const COMPONENT_NAME = 'button'

export const useButton = (inProps: ButtonProps) => {
  const props = useDefaultProps({ name: COMPONENT_NAME, props: inProps })

  const { prefix } = useNexContext()

  const {
    href,
    className,
    variant = 'solid',
    radius = 'md',
    size = 'md',
    iconOnly = false,
    loading = false,
    disabled = false,
    block = false,
    type = 'button',
    color,
    startIcon: startIconProp,
    endIcon: endIconProp,
    onClick: onClickProp,
    ...remainingProps
  } = props

  const mergedStyles = useMemo(
    () => ({
      ...button,
      colorPalette: color ?? 'primary',
    }),
    [color],
  )

  const cssProp = useMergedTheme({
    name: COMPONENT_NAME,
    styles: mergedStyles,
    props: {
      ...props,
      variant,
      radius,
      size,
      iconOnly,
      loading,
      disabled,
      block,
      type,
      color,
    },
  })

  const htmlElement: HTMLElementTagName =
    typeof href === 'string' && href ? 'a' : 'button'

  const onClick = useEvent(
    (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (loading || disabled) {
        event.preventDefault()
        return
      }

      ;(onClickProp as ButtonProps['onClick'])?.(event)
    },
  )

  const startIcon = (loading || startIconProp) && (
    <ButtonStartIcon size={size} spin={loading}>
      {loading ? <Icon icon="ant-design:loading-outlined" /> : startIconProp}
    </ButtonStartIcon>
  )

  const endIcon = endIconProp && (
    <ButtonEndIcon size={size}>{endIconProp}</ButtonEndIcon>
  )

  return {
    startIcon,
    endIcon,
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
      ...remainingProps,
    },
  }
}
