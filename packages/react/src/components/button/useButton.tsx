import classNames from 'classnames'
import { button } from '@theme'
import type { HTMLElementTagName } from '@nex-ui/styled'
import { useNexContext } from '../provider'
import { Icon } from '../icon'
import { ButtonStartIcon } from './ButtonStartIcon'
import { ButtonEndIcon } from './ButtonEndIcon'
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
  const { prefix, styles } = useNexContext()

  const htmlElement: HTMLElementTagName =
    typeof href === 'string' && href ? 'a' : 'button'

  const onClick = (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>,
  ) => {
    if (loading || disabled) {
      event.preventDefault()
      return
    }

    ;(onClickProp as ButtonProps['onClick'])?.(event)
  }

  return {
    rootProps: {
      onClick,
      className: classNames(`${prefix}-btn`, className),
      css: styles(button)(
        {
          size,
          iconOnly,
          variant,
          block,
          disabled,
          radius: radius ?? size,
        },
        { specifiedColorPalette: color },
      ),
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
