import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import BorderVerticle from '../../svg/outlined/border-verticle.svg'
import type { IconProps } from '../../types'

export const BorderVerticleOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(BorderVerticle, {
      className: 'border-verticle-outlined',
    })
    return <Icon {...props} ref={ref} />
  },
)
