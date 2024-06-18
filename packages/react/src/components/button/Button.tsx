import { forwardRef } from 'react'
import type { Ref } from 'react'
import { WaterWave } from '../waterWave'
import type { ButtonProps } from './types'
import { useButton } from './useButton'

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>((props, ref) => {
  const { loading } = props

  const { getRootProps, startIcon, endIcon } = useButton(props)

  const { type, href, disabled, children, ...rootProps } = getRootProps()

  const childNode =
    href !== undefined ? (
      <a
        ref={ref as Ref<HTMLAnchorElement>}
        data-disabled={disabled || null}
        href={href}
        {...rootProps}
      >
        {startIcon}
        {children}
        {endIcon}
      </a>
    ) : (
      <button
        type={type}
        ref={ref as Ref<HTMLButtonElement>}
        disabled={disabled}
        {...rootProps}
      >
        {startIcon}
        {children}
        {endIcon}
      </button>
    )

  return <WaterWave disabled={loading || disabled}>{childNode}</WaterWave>
})
