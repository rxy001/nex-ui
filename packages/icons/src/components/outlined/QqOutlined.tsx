import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Qq from '../../svg/outlined/qq.svg'
import type { IconProps } from '../../types'

export const QqOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Qq, { className: 'qq-outlined' })
  return <Icon {...props} ref={ref} />
})
