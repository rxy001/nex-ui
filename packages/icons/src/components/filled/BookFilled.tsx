import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Book from '../../svg/filled/book.svg'
import type { IconProps } from '../../types'

export const BookFilled = forwardRef<SVGAElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = createIcon(Book, { className: 'book-filled' })
  return <Icon {...props} ref={ref} />
})
