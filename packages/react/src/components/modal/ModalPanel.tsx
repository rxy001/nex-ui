import { nex } from '@nex-ui/styled'
import * as m from 'motion/react-m'
import { useEvent } from '@nex-ui/hooks'
import { modalPanelRecipe } from '../../theme/recipes'
import { useSlotProps } from '../utils'
import { useModalProps } from './ModalContext'
import type { ElementType, MouseEvent } from 'react'
import type { Variants } from 'motion/react'
import type { ModalPanelProps } from './types'

const panelVariants: Variants = {
  visible: {
    opacity: 1,
    transform: 'scale(1)',
    transition: {
      ease: 'easeInOut',
      duration: 0.2,
    },
  },
  hidden: {
    opacity: 0,
    transform: 'scale(1.04)',
    transition: {
      ease: 'easeInOut',
      duration: 0.2,
    },
  },
}

const style = modalPanelRecipe()

export const ModalPanel = <RootComponent extends ElementType>(
  inProps: ModalPanelProps<RootComponent>,
) => {
  const { open, setOpen, closeOnInteractBackdrop } = useModalProps()

  const props = inProps as ModalPanelProps

  const motionProps = {
    animate: open ? 'visible' : 'hidden',
    initial: 'hidden',
    exit: 'hidden',
  }

  const handleClick = useEvent((e: MouseEvent<HTMLDivElement>) => {
    if (closeOnInteractBackdrop && e.target === e.currentTarget) {
      setOpen(false)
    }
  })

  const rootProps = useSlotProps({
    style,
    externalForwardedProps: props,
    additionalProps: {
      as: m.div,
      variants: panelVariants,
      onClick: handleClick,
      ...motionProps,
    },
  })

  return <nex.div {...rootProps} />
}

ModalPanel.displayName = 'ModalPanel'
