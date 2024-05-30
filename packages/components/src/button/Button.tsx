import { forwardRef } from 'react'
import type { Ref } from 'react'
import { WaterWave } from '../waterWave'
import type { ButtonProps } from './types'
import { useButton } from './useButton'

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>((props, ref) => {
  const { children, disabled, type, href, loading } = props

  const { getProps, startIcon, endIcon } = useButton(props)

  const rootProps = {
    ...getProps(),
  }

  if (href !== undefined) {
    return (
      <a
        href={href}
        ref={ref as Ref<HTMLAnchorElement>}
        data-disabled={disabled}
        {...rootProps}
      >
        {children}
      </a>
    )
  }

  return (
    <WaterWave disabled={loading || disabled}>
      <button
        type={type}
        disabled={disabled}
        ref={ref as Ref<HTMLButtonElement>}
        {...rootProps}
      >
        {startIcon}
        {children}
        {endIcon}
      </button>
    </WaterWave>
  )
})
