import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FileExclamation from '../../svg/outlined/file-exclamation.svg'
import type { IconProps } from '../../types'

export const FileExclamationOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () =>
        createIcon(FileExclamation, { className: 'file-exclamation-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FileExclamationOutlined.displayName = 'FileExclamationOutlined'
