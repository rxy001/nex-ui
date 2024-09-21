import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import JavaScript from '../../svg/outlined/java-script.svg'
import type { IconProps } from '../../types'

export const JavaScriptOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(JavaScript)
    return <Icon {...props} ref={ref} />
  },
)
