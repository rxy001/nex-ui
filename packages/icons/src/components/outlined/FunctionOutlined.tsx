import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Function from '../../svg/outlined/function.svg'
import type { IconProps } from '../../types'

export const FunctionOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Function, { className: 'function-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
