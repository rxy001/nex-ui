'use client'

import { useMemo } from 'react'
import { defineRecipe } from '@nex-ui/system'
import { useSlot } from '../utils'
import { useModal } from './ModalContext'
import type { ElementType } from 'react'
import type { ModalHeaderProps } from './types'

const recipe = defineRecipe({
  base: {
    w: 'full',
    m: 0,
    boxSizing: 'border-box',
  },
})

const useAriaProps = (props: ModalHeaderProps) => {
  const { modalHeaderId } = useModal()
  const labelId = props.id ?? modalHeaderId

  return useMemo(() => {
    return {
      id: labelId,
    }
  }, [labelId])
}

const style = recipe()

export const ModalHeader = <RootComponent extends ElementType = 'h2'>(
  inProps: ModalHeaderProps<RootComponent>,
) => {
  const props = inProps as ModalHeaderProps

  const ariaProps = useAriaProps(props)

  const [ModalHeaderRoot, getModalHeaderRootProps] = useSlot({
    style,
    a11y: ariaProps,
    externalForwardedProps: props,
    elementType: 'h2',
  })

  return <ModalHeaderRoot {...getModalHeaderRootProps()} />
}

ModalHeader.displayName = 'ModalHeader'
