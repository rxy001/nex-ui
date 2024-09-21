import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Book from '../../svg/outlined/book.svg'
import type { IconProps } from '../../types'

export const BookOutlined = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Book)
  return <Icon {...props} ref={ref} />
})
