import { mergeRefs, supportRef, addEventListener } from '@nex-ui/utils'
import type { ReactElement } from 'react'
import { cloneElement, isValidElement, useEffect, useRef } from 'react'
import { useRippleMotion } from './useRippleMotion'
import type { UseRippleMotionProps } from './useRippleMotion'

export type RippleProps = {
  children?: ReactElement
  disabled?: boolean
} & UseRippleMotionProps

export const Ripple = ({
  children,
  disabled,
  motionProps,
  motionStyle,
}: RippleProps) => {
  const ref = useRef<HTMLElement>(null)

  const showEffect = useRippleMotion({ motionProps, motionStyle })

  useEffect(() => {
    const node = ref.current
    if (!node || disabled) {
      return
    }

    return addEventListener(node, 'click', showEffect)
  }, [showEffect, disabled])

  if (!isValidElement(children)) {
    return children
  }

  const composedRef = supportRef(children)
    ? // @ts-expect-error
      mergeRefs(children.ref, ref)
    : ref

  // @ts-expect-error
  return cloneElement(children, { ref: composedRef })
}
