'use client'

import { nex } from '@nex-ui/styled'
import { addEventListener } from '@nex-ui/utils'
import { useEffect } from 'react'
import { Motion } from './Motion'
import { Portal, useSlotProps } from '../utils'
import { modalRootRecipe } from '../../theme/recipes'
import { useModal } from './ModalContext'
import type { ElementType } from 'react'
import type { ModalRootProps } from './types'

const style = modalRootRecipe()

export const ModalRoot = <RootComponent extends ElementType = 'div'>(
  inProps: ModalRootProps<RootComponent>,
) => {
  const props = inProps as ModalRootProps

  const {
    container,
    open,
    keepMounted,
    setOpen,
    preventScroll,
    closeOnEscape,
  } = useModal()

  const rootProps = useSlotProps({
    style,
    externalForwardedProps: props,
  })

  useEffect(() => {
    if (!open || !closeOnEscape) {
      return
    }

    const removeListener = addEventListener(document.body, 'keyup', (e) => {
      if (e.key === 'Escape' && open) {
        setOpen(false)
        e.stopPropagation()
      }
    })

    return removeListener
  }, [closeOnEscape, open, setOpen])

  useEffect(() => {
    if (preventScroll && open) {
      const body = document.querySelector('body')
      if (body) {
        body.style.overflow = 'hidden'
        return () => {
          body.style.overflow = ''
        }
      }
    }
  }, [open, preventScroll])

  return (
    <Portal container={container}>
      <Motion open={open} keepMounted={keepMounted}>
        <nex.div {...rootProps} />
      </Motion>
    </Portal>
  )
}

ModalRoot.displayName = 'ModalRoot'
