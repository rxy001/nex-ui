import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileAdd from '../../svg/filled/file-add.svg'
import type { IconProps } from '../../types'

export const FileAddFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FileAdd, { className: 'file-add-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FileAddFilled.displayName = 'FileAddFilled'
