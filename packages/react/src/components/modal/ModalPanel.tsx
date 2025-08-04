'use client'

import { nex } from '@nex-ui/styled'
import { useEvent } from '@nex-ui/hooks'
import { modalPanelRecipe } from '../../theme/recipes'
import { useSlotProps } from '../utils'
import { useModal } from './ModalContext'
import type { ElementType, MouseEvent } from 'react'
import type { ModalPanelProps } from './types'

const style = modalPanelRecipe()

export const ModalPanel = <RootComponent extends ElementType = 'div'>(
  inProps: ModalPanelProps<RootComponent>,
) => {
  const { closeOnInteractOutside, setOpen } = useModal()

  const props = inProps as ModalPanelProps

  const handleClick = useEvent((e: MouseEvent<HTMLDivElement>) => {
    if (closeOnInteractOutside && e.target === e.currentTarget) {
      setOpen(false)
    }
  })

  const rootProps = useSlotProps({
    style,
    externalForwardedProps: props,
    additionalProps: {
      onClick: handleClick,
    },
  })

  return <nex.div {...rootProps} />
}

ModalPanel.displayName = 'ModalPanel'
