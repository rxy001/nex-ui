'use client'

import { forwardRef } from 'react'
import { nex } from '@nex-ui/styled'
import type { Ref } from 'react'
import { WaterWave } from '../utils'
import { useButton } from './useButton'
import type { ButtonProps } from './types'

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>((props, ref) => {
  const { loading, disabled } = props
  const { rootProps, startIcon, endIcon, children } = useButton(props)

  const childNode = (
    <nex.button ref={ref as Ref<HTMLButtonElement>} {...rootProps}>
      {startIcon}
      {children}
      {endIcon}
    </nex.button>
  )

  return <WaterWave disabled={loading || disabled}>{childNode}</WaterWave>
})

Button.displayName = 'Button'
