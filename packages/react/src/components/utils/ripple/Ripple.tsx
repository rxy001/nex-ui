import { cloneElement, isValidElement } from 'react'
import { useRippleMotion } from './useRippleMotion'
import type { MouseEvent, ReactElement } from 'react'
import type { UseRippleMotionProps } from './useRippleMotion'

export type RippleProps = {
  children?: ReactElement<{ onClick?: (e: MouseEvent) => void }>
  disabled?: boolean
} & UseRippleMotionProps

export const Ripple = ({
  children,
  disabled,
  motionProps,
  motionStyle,
}: RippleProps) => {
  const showEffect = useRippleMotion({ motionProps, motionStyle })

  if (!isValidElement(children)) {
    return children
  }

  return cloneElement(children, {
    onClick: (e: MouseEvent) => {
      children.props.onClick?.(e)
      if (!disabled) {
        showEffect(e)
      }
    },
  })
}
