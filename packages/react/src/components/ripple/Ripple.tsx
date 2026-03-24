'use client'

import { cloneElement, isValidElement } from 'react'
import { chain } from '@nex-ui/utils'
import { useRippleMotion } from './useRippleMotion'
import type { MouseEvent, ReactElement } from 'react'
import type { UseRippleMotionProps } from './useRippleMotion'

export interface RippleProps extends UseRippleMotionProps {
  children?: ReactElement<{ onClick?: (e: MouseEvent) => void }>
  disabled?: boolean
  onClick?: (v: MouseEvent) => void
}

export function Ripple({
  children,
  disabled,
  motionProps,
  onClick,
}: RippleProps) {
  const showEffect = useRippleMotion({ motionProps })

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
