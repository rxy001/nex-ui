import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Exception from '../../svg/outlined/exception.svg'
import type { IconProps } from '../../types'

export const ExceptionOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Exception, { className: 'exception-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
