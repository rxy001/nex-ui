import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Exception from '../../svg/outlined/exception.svg'
import type { IconProps } from '../../types'

export const ExceptionOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Exception, { className: 'exception-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
