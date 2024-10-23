import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Java from '../../svg/outlined/java.svg'
import type { IconProps } from '../../types'

export const JavaOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Java, { className: 'java-outlined' })
  return <Icon {...props} ref={ref} />
})
