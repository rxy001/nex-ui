import type { HTMLElementTagName } from '@nex-ui/styled'
import type { StyleObject } from '@nex-ui/system'
import type { HTMLAttributes } from 'react'

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  sx?: StyleObject
  as?: HTMLElementTagName
}
