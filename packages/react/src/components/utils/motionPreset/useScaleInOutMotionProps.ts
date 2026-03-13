import type { HTMLMotionProps } from 'motion/react'

export const useScaleInOutMotionProps = (
  props?: HTMLMotionProps<'div'>,
): HTMLMotionProps<'div'> => {
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
        scale: 1,
        ...props?.variants?.visible,
      },
      hidden: {
        scale: 0.96,
        ...props?.variants?.hidden,
      },
    },
  }
}
