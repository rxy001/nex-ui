import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Python from '../../svg/outlined/python.svg'
import type { IconProps } from '../../types'

export const PythonOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Python, { className: 'python-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
