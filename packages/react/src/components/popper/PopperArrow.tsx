'use client'

import { defineRecipe } from '@nex-ui/system'
import { useSlot } from '../utils'
import { usePopper } from './PopperContext'
import type { ElementType } from 'react'
import type { PopperArrowProps } from './types'

const recipe = defineRecipe({
  base: {
    width: '2',
    height: '2',
    position: 'absolute',
    left: 'var(--popper-arrow-x)',
    top: 'var(--popper-arrow-y)',

    '::before': {
      background: '#fff',
      content: "' '",
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      position: 'absolute',
      transform: 'rotate(var(--popper-arrow-rotation))',
      boxSizing: 'border-box',
    },
  },
})

const style = recipe()

export const PopperArrow = <RootElement extends ElementType = 'div'>(
  inProps: PopperArrowProps<RootElement>,
) => {
  const { arrowRef } = usePopper()

  const props = inProps as PopperArrowProps

  const [PopperArrowRoot, getPopperArrowRootProps] = useSlot({
    style,
    elementType: 'div',
    externalForwardedProps: props,
    additionalProps: {
      ref: arrowRef,
    },
  })

  return <PopperArrowRoot {...getPopperArrowRootProps()} />
}

PopperArrow.displayName = 'PopperArrow'
