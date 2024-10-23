import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Ci from '../../svg/outlined/ci.svg'
import type { IconProps } from '../../types'

export const CiOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Ci, { className: 'ci-outlined' })
  return <Icon {...props} ref={ref} />
})
