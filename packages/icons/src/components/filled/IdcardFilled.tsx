import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Idcard from '../../svg/filled/idcard.svg'
import type { IconProps } from '../../types'

export const IdcardFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Idcard, { className: 'idcard-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

IdcardFilled.displayName = 'IdcardFilled'
