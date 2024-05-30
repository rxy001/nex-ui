import {
  button,
  buttonStartIcon,
  buttonEndIcon,
  dynamicVars,
  btnTokens,
} from '@wui/theme'
import { useMemo } from 'react'
import classNames from 'classnames'
import { useTheme } from '../provider'
import type { ButtonIconProps, UseButtonParameters } from './types'
import { Icon } from '../icon'

const ButtonStartIcon = ({ children, size, spin }: ButtonIconProps) => (
  // @ts-ignore
  <span className={buttonStartIcon({ size, spin })}>{children}</span>
)

const ButtonEndIcon = ({ children, size }: ButtonIconProps) => (
  // @ts-ignore
  <span className={buttonEndIcon({ size })}>{children}</span>
)

const LoadingIcon = () => <Icon icon="ant-design:loading-outlined" />

export const useButton = ({
  style,
  className,
  size = 'medium',
  disabled = false,
  shape = 'default',
  variant = 'primary',
  block = false,
  startIcon: startIconProp,
  endIcon: endIconProp,
  loading,
  onClick: onClickProp,
  iconOnly,
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
      classNames(
        'antui-btn',
        button({ variant, size, disabled, block, shape, loading, iconOnly }),
        className,
      ),
    [block, className, disabled, shape, size, variant, loading, iconOnly],
  )

  const onClick = (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>,
  ) => {
    if (loading) {
      event.preventDefault()
      return
    }
    ;(
      onClickProp as React.MouseEventHandler<
        HTMLButtonElement | HTMLAnchorElement
      >
    )?.(event)
  }

  return {
    getProps: () => ({
      style: mergedStyle,
      className: mergedClassName,
      onClick,
      ...props,
    }),
    startIcon:
      loading || startIconProp ? (
        <ButtonStartIcon size={size} spin={loading}>
          {loading ? <LoadingIcon /> : startIconProp}
        </ButtonStartIcon>
      ) : null,
    endIcon: endIconProp ? (
      <ButtonEndIcon size={size}>{endIconProp}</ButtonEndIcon>
    ) : null,
  }
}
