'use client'

import { defineRecipe } from '@nex-ui/system'
import { useSlot } from '../utils'
import type { ElementType } from 'react'
import type { PopperContentProps } from './types'

const recipe = defineRecipe({
  base: {
    d: 'flex',
    flexDirection: 'column',
    outline: 'none',
    pos: 'relative',
    boxSizing: 'border-box',
    overflow: 'auto',
  },
})

const style = recipe()

export const PopperContent = <RootElement extends ElementType = 'div'>(
  props: PopperContentProps<RootElement>,
) => {
  const { children, maxWidth, maxHeight, ...remainingProps } = props

  const [PopperContentRoot, getPopperContentRootProps] = useSlot({
    style,
    elementType: 'div',
    externalForwardedProps: remainingProps,
    additionalProps: {
      sx: {
        maxWidth,
        maxHeight,
      },
    },
  })

  return (
    <PopperContentRoot {...getPopperContentRootProps()}>
      {children}
    </PopperContentRoot>
  )
}

PopperContent.displayName = 'PopperContent'
