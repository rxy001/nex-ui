import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import JavaScript from '../../svg/outlined/java-script.svg'
import type { IconProps } from '../../types'

export const JavaScriptOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(JavaScript, { className: 'java-script-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
