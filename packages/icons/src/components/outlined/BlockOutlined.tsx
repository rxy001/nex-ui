import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Block from '../../svg/outlined/block.svg'
import type { IconProps } from '../../types'

export const BlockOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Block, { className: 'block-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
