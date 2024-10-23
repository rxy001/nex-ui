import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileAdd from '../../svg/filled/file-add.svg'
import type { IconProps } from '../../types'

export const FileAddFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FileAdd, { className: 'file-add-filled' })
    return <Icon {...props} ref={ref} />
  },
)
