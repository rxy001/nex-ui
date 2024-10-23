import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Snippets from '../../svg/outlined/snippets.svg'
import type { IconProps } from '../../types'

export const SnippetsOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Snippets, { className: 'snippets-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
