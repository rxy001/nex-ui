import { nex } from '@nex-ui/styled'
import * as m from 'motion/react-m'
import { modalBackdropRecipe } from '../../theme/recipes'
import { useSlotProps } from '../utils'
import { useModalProps } from './ModalContext'
import type { ElementType } from 'react'
import type { Variants } from 'motion/react'
import type { ModalBackdropProps } from './types'

const style = modalBackdropRecipe()

const backdropVariants: Variants = {
  visible: {
    opacity: 1,
    transition: {
      ease: 'easeInOut',
      duration: 0.2,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      ease: 'easeInOut',
      duration: 0.2,
    },
  },
}

export const ModalBackdrop = <RootComponent extends ElementType = 'div'>(
  inProps: ModalBackdropProps<RootComponent>,
) => {
  const { open } = useModalProps()
  const props = inProps as ModalBackdropProps

  const motionProps = {
    animate: open ? 'visible' : 'hidden',
    initial: 'hidden',
    exit: 'hidden',
  }

  const rootProps = useSlotProps({
    style,
    externalForwardedProps: props,
    additionalProps: {
      as: m.div,
      variants: backdropVariants,
      ...motionProps,
    },
  })

  return <nex.div {...rootProps} />
}

ModalBackdrop.displayName = 'ModalBackdrop'
