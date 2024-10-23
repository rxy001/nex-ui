import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import UnorderedList from '../../svg/outlined/unordered-list.svg'
import type { IconProps } from '../../types'

export const UnorderedListOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(UnorderedList, {
      className: 'unordered-list-outlined',
    })
    return <Icon {...props} ref={ref} />
  },
)
