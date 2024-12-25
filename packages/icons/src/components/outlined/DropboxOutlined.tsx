import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Dropbox from '../../svg/outlined/dropbox.svg'
import type { IconProps } from '../../types'

export const DropboxOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Dropbox, { className: 'dropbox-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
