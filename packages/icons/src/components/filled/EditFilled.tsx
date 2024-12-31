import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Edit from '../../svg/filled/edit.svg'
import type { IconProps } from '../../types'

export const EditFilled = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(Edit, { className: 'edit-filled' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})

EditFilled.displayName = 'EditFilled'
