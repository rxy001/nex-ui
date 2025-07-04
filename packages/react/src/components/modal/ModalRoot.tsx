'use client'

import { nex } from '@nex-ui/styled'
import * as m from 'motion/react-m'
import { LazyMotion, AnimatePresence } from 'motion/react'
import { ElementType, useRef } from 'react'
import { Portal, motionFeatures, useSlotProps } from '../utils'
import { modalRootRecipe } from '../../theme/recipes'
import { useModalProps } from './ModalContext'
import type { Variants } from 'motion/react'
import type { ModalRootProps } from './types'

const wrapperVariants: Variants = {
  hidden: {
    display: 'none',
    transition: {
      when: 'afterChildren',
    },
  },
  visible: {
    display: 'block',
  },
}

const style = modalRootRecipe()

export const ModalRoot = <RootComponent extends ElementType = 'div'>(
  inProps: ModalRootProps<RootComponent>,
) => {
  const props = inProps as ModalRootProps

  const { container, open, keepMounted } = useModalProps()

  const mountedRef = useRef(false)

  if (keepMounted === true && open && mountedRef.current === false) {
    mountedRef.current = true
  }

  const motionProps = {
    animate: open ? 'visible' : 'hidden',
    initial: 'hidden',
    exit: 'hidden',
  }

  const rootProps = useSlotProps({
    style,
    externalForwardedProps: props,
  })

  return (
    <LazyMotion features={motionFeatures}>
      {keepMounted ? (
        mountedRef.current && (
          <Portal container={container}>
            <m.div
              variants={wrapperVariants}
              style={{ width: 0 }}
              {...motionProps}
            >
              <nex.div {...rootProps} />
            </m.div>
          </Portal>
        )
      ) : (
        <AnimatePresence>
          {open && (
            <Portal container={container}>
              <nex.div {...rootProps} />
            </Portal>
          )}
        </AnimatePresence>
      )}
    </LazyMotion>
  )
}

ModalRoot.displayName = 'ModalRoot'
