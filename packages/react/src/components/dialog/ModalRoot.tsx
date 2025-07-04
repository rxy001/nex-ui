'use client'

import * as m from 'motion/react-m'
import { LazyMotion, AnimatePresence } from 'motion/react'
import { useMemo, useRef } from 'react'
import { useEvent } from '@nex-ui/hooks'
import { useNexUI } from '../provider'
import {
  useStyles,
  composeClasses,
  getUtilityClass,
  Portal,
  useSlot,
  motionFeatures,
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

  const { classes, keepMounted, open } = ownerState

  return useMemo(() => {
    const modalRoot = `${prefix}-modal`

    const slots = {
      root: ['root', keepMounted && 'keep-mounted', open && 'open'],
      backdrop: ['backdrop'],
      container: ['container'],
    }

    return composeClasses(slots, getUtilityClass(modalRoot), classes)
  }, [classes, keepMounted, open, prefix])
}

export const ModalRoot = ({ children }: ModalProps) => {
  const modalProps = useModalProps()
  const {
    slotProps,
    container,
    scroll,
    open,
    keepMounted,
    closeOnInteractBackdrop,
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

  const [Root, getRootProps] = useSlot({
    ownerState,
    elementType: 'div',
    style: styles.root,
    classNames: classes.root,
    externalForwardedProps: remainingProps,
    additionalProps: {},
  })

  const [Backdrop, getBackdropProps] = useSlot({
    ownerState,
    elementType: m.div,
    style: styles.backdrop,
    classNames: classes.backdrop,
    externalSlotProps: slotProps?.backdrop,
    additionalProps: {
      variants: backdropVariants,
      ...motionProps,
    },
  })

  const handleClick = useEvent((e: MouseEvent<HTMLDivElement>) => {
    if (closeOnInteractBackdrop && e.target === e.currentTarget) {
      setOpen(false)
    }
  })

  const [Container, getContainerProps] = useSlot({
    ownerState,
    elementType: m.div,
    style: styles.container,
    classNames: classes.container,
    externalSlotProps: slotProps?.container,
    additionalProps: {
      variants: containerVariants,
      onClick: handleClick,
      ...motionProps,
    },
  })

  const renderContent = () => {
    return (
      <Root {...getRootProps()}>
        <Backdrop {...getBackdropProps()} />
        <Container {...getContainerProps()}>{children}</Container>
      </Root>
    )
  }

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
