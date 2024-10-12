import type { ExtraComponentProps } from '@nex-ui/styled'
import type { HTMLAttributes } from 'react'
import type { ColorPalette } from '../../theme'

export interface BoxProps
  extends HTMLAttributes<HTMLDivElement>,
    ExtraComponentProps {
  colorPalette?: ColorPalette
}
