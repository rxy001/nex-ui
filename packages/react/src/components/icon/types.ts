import type { IconProps as NexIconsProps } from '@nex-ui/icons'
import type { ComponentType } from 'react'

export type IconProps = NexIconsProps & {
  component: ComponentType<any>
}
