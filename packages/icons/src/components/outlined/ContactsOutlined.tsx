import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Contacts from '../../svg/outlined/contacts.svg'
import type { IconProps } from '../../types'

export const ContactsOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Contacts, { className: 'contacts-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
