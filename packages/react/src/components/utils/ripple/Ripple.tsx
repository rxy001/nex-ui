import { cloneElement, isValidElement } from 'react'
import { chain } from '@nex-ui/utils'
import { useRippleMotion } from './useRippleMotion'
import type { MouseEvent, ReactElement } from 'react'
import type { UseRippleMotionProps } from './useRippleMotion'

export type RippleProps = {
  children?: ReactElement<{ onClick?: (e: MouseEvent) => void }>
  disabled?: boolean
  onClick?: (v: MouseEvent) => void
} & UseRippleMotionProps

export const Ripple = ({
  children,
  disabled,
  motionProps,
  motionStyle,
  onClick,
}: RippleProps) => {
  const showEffect = useRippleMotion({ motionProps, motionStyle })

  if (!isValidElement(children)) {
    return children
  }

  return cloneElement(children, {
    onClick: chain(onClick, children.props.onClick, (e: MouseEvent) => {
      if (!disabled) {
        showEffect(e)
      }
    }),
  })
}
