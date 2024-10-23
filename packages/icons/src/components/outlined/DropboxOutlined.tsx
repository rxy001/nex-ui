import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Dropbox from '../../svg/outlined/dropbox.svg'
import type { IconProps } from '../../types'

export const DropboxOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Dropbox, { className: 'dropbox-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
