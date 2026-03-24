import type { HTMLMotionProps } from 'motion/react'

export function useFadeInOutMotionProps(
  props?: HTMLMotionProps<'div'>,
): HTMLMotionProps<'div'> {
  return {
    initial: 'hidden',
    animate: 'visible',
    exit: 'hidden',
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
