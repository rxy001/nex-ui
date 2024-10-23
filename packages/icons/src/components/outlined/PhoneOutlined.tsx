import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Phone from '../../svg/outlined/phone.svg'
import type { IconProps } from '../../types'

export const PhoneOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Phone, { className: 'phone-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
