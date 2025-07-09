'use client'

import { nex } from '@nex-ui/styled'
import { useMemo } from 'react'
import { useSlotProps } from '../utils'
import { modalBodyRecipe } from '../../theme/recipes'
import { useModal } from './ModalContext'
import type { ElementType } from 'react'
import type { ModalBodyProps } from './types'

const style = modalBodyRecipe()

const useAriaProps = (props: ModalBodyProps) => {
  const modal = useModal()
  const bodyId = props.id ?? modal['aria-describedby']

  return useMemo(() => {
    return {
      id: bodyId,
    }
  }, [bodyId])
}

export const ModalBody = <RootComponent extends ElementType = 'div'>(
  inProps: ModalBodyProps<RootComponent>,
) => {
  const props = inProps as ModalBodyProps

  const ariaProps = useAriaProps(props)

  const rootProps = useSlotProps({
    style,
    a11y: ariaProps,
    externalForwardedProps: props,
  })

  return <nex.div {...rootProps} />
}

ModalBody.displayName = 'ModalBody'
