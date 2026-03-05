'use client'

import { nex } from '@nex-ui/styled'
import { defineRecipe } from '@nex-ui/system'
import { useSlot } from '../utils'
import { useModalContext, useModalPortalPropsContext } from './ModalContext'
import type { ModalBackdropProps } from './types'

const recipe = defineRecipe({
  base: {
    position: 'fixed',
    inset: 0,
    bg: 'black/50',
    userSelect: 'none',
  },
})

const style = recipe()

export const ModalBackdrop = (props: ModalBackdropProps) => {
  const modalPortalPropsCtx = useModalPortalPropsContext()
  const { open } = useModalContext()

  const [ModalBackdropRoot, getModalBackdropRootProps] = useSlot({
    style,
    component: nex.div,
    externalForwardedProps: props,
    ariaProps: {
      'aria-hidden': true,
      role: 'presentation',
    },
    additionalProps: {
      style: {
        display:
          modalPortalPropsCtx?.disableAnimatePresence &&
          modalPortalPropsCtx?.keepMounted
            ? open
              ? 'block'
              : 'none'
            : undefined,
      },
    },
  })

  return <ModalBackdropRoot {...getModalBackdropRootProps()} />
}

ModalBackdrop.displayName = 'ModalBackdrop'
