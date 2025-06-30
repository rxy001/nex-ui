'use client'

import { nex } from '@nex-ui/styled'
import { LazyMotion, AnimatePresence, domAnimation, m } from 'motion/react'
import { useEffect, useRef } from 'react'
import { useNexUI } from '../provider'
import {
  useSlotProps,
  useStyles,
  composeClasses,
  getUtilityClass,
  Portal,
} from '../utils'
import { modalRecipe } from '../../theme/recipes'
import { useModalProps, useModal } from './ModalContext'
import type { MouseEvent } from 'react'
import type { Variants } from 'motion/react'
import type { ModalOwnerState, ModalProps } from './types'

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

const containerVariants: Variants = {
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

const useSlotClasses = (ownerState: ModalOwnerState) => {
  const { prefix } = useNexUI()

  const modalRoot = `${prefix}-modal`

  const { classes, keepMounted, open } = ownerState

  const slots = {
    root: ['root', keepMounted && 'keep-mounted', open && 'open'],
    backdrop: ['backdrop'],
    container: ['container'],
  }

  const composedClasses = composeClasses(
    slots,
    getUtilityClass(modalRoot),
    classes,
  )

  return composedClasses
}

export const ModalRoot = ({ children }: ModalProps) => {
  const modalProps = useModalProps()
  const {
    slotProps,
    container,
    scroll,
    open,
    keepMounted,
    closeOnInteractOutside,
    ...remainingProps
  } = modalProps
  const mountedRef = useRef(false)
  const { setOpen } = useModal()

  if (keepMounted === true && open && mountedRef.current === false) {
    mountedRef.current = true
  }

  const ownerState: ModalOwnerState = modalProps

  const classes = useSlotClasses(ownerState)

  const styles = useStyles({
    ownerState: {
      ...ownerState,
      scroll: scroll === 'outside',
    },
    name: 'Modal',
    recipe: modalRecipe,
  })

  const motionProps = {
    animate: open ? 'visible' : 'hidden',
    initial: 'hidden',
    exit: 'hidden',
  }

  const rootProps = useSlotProps({
    ownerState,
    sx: styles.root,
    classNames: classes.root,
    externalForwardedProps: remainingProps,
    additionalProps: {},
  })

  const backdropProps = useSlotProps({
    ownerState,
    sx: styles.backdrop,
    classNames: classes.backdrop,
    externalSlotProps: slotProps?.backdrop,
    additionalProps: {
      variants: backdropVariants,
      as: m.div,
      ...motionProps,
    },
  })

  const containerProps = useSlotProps({
    ownerState,
    sx: styles.container,
    classNames: classes.container,
    externalSlotProps: slotProps?.container,
    additionalProps: {
      as: m.div,
      variants: containerVariants,
      onClick: (e: MouseEvent<HTMLDivElement>) => {
        if (closeOnInteractOutside && e.target === e.currentTarget) {
          setOpen(false)
        }
      },
      ...motionProps,
    },
  })

  const renderContent = () => {
    return (
      <nex.div {...rootProps}>
        <nex.div {...backdropProps} />
        <nex.div {...containerProps}>{children}</nex.div>
      </nex.div>
    )
  }

  return (
    <LazyMotion features={domAnimation}>
      {keepMounted ? (
        mountedRef.current && (
          <Portal container={container}>
            <m.div
              variants={wrapperVariants}
              style={{ width: 0 }}
              {...motionProps}
            >
              {renderContent()}
            </m.div>
          </Portal>
        )
      ) : (
        <AnimatePresence>
          {open && <Portal container={container}>{renderContent()}</Portal>}
        </AnimatePresence>
      )}
    </LazyMotion>
  )
}

ModalRoot.displayName = 'ModalRoot'
