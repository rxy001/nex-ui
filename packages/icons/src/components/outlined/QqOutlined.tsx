import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Qq from '../../svg/outlined/qq.svg'
import type { IconProps } from '../../types'

export const QqOutlined = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(Qq, { className: 'qq-outlined' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})
