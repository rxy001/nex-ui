'use client'

import { useMemo } from 'react'
import { nex } from '@nex-ui/styled'
import { useSlotProps } from '../utils'
import { useModal } from './ModalContext'
import { modalHeaderRecipe } from '../../theme/recipes'
import type { ElementType } from 'react'
import type { ModalHeaderProps } from './types'

const style = modalHeaderRecipe()

const useAriaProps = (props: ModalHeaderProps) => {
  const modal = useModal()
  const labelId = props.id ?? modal['aria-labelledby']

  return useMemo(() => {
    return {
      id: labelId,
    }
  }, [labelId])
}

export const ModalHeader = <RootComponent extends ElementType = 'h2'>(
  inProps: ModalHeaderProps<RootComponent>,
) => {
  const props = inProps as ModalHeaderProps

  const ariaProps = useAriaProps(props)

  const rootProps = useSlotProps({
    style,
    a11y: ariaProps,
    externalForwardedProps: props,
  })

  return <nex.h2 {...rootProps} />
}

ModalHeader.displayName = 'ModalHeader'
