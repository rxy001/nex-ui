import type { HTMLMotionProps } from 'motion/react'

export function useFadeInOutMotionProps(
  props?: HTMLMotionProps<'div'>,
): HTMLMotionProps<'div'> {
  return {
    ...props,
    transition: {
      ease: 'easeInOut',
      duration: 0.2,
      ...props?.transition,
    },
    variants: {
      ...props?.variants,
      visible: {
        opacity: 1,
        ...props?.variants?.visible,
      },
      hidden: {
        opacity: 0,
        ...props?.variants?.hidden,
      },
    },
  }
}
