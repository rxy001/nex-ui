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
  },
})

const style = recipe()

export const PopperContent = <RootElement extends ElementType = 'div'>(
  inProps: PopperContentProps<RootElement>,
) => {
  const { children, ...props } = inProps as PopperContentProps
  const [PopperContentRoot, getPopperContentRootProps] = useSlot({
    style,
    elementType: 'div',
    externalForwardedProps: props,
  })

  return (
    <PopperContentRoot {...getPopperContentRootProps()}>
      {children}
    </PopperContentRoot>
  )
}

PopperContent.displayName = 'PopperContent'
