import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Contacts from '../../svg/filled/contacts.svg'
import type { IconProps } from '../../types'

export const ContactsFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Contacts, { className: 'contacts-filled' })
    return <Icon {...props} ref={ref} />
  },
)
