'use client'

import { CopyIcon } from 'nextra/icons'
import { CheckOutlined } from '@nex-ui/icons'
import { useClipboard, useEvent } from '@nex-ui/hooks'

export const CopyButton = ({ value }: { value: string }) => {
  const { copy, copied } = useClipboard()

  const handleClick = useEvent(() => copy(value))

  return (
    <button
      className='x:group x:relative x:w-8 x:h-8 x:flex x:justify-center x:items-center x:cursor-pointer'
      onClick={handleClick}
      data-copied={copied}
    >
      <CheckOutlined
        width={18}
        height={18}
        className='x:absolute x:opacity-0 x:scale-50 x:group-data-[copied=true]:opacity-100 x:group-data-[copied=true]:scale-100 x:transition-[opacity,scale] x:duration-250 x:ease-[ease]'
      />
      <CopyIcon
        className='x:absolute x:opacity-100 x:scale-100 x:group-data-[copied=true]:opacity-0 x:group-data-[copied=true]:scale-50 x:transition-[opacity,scale] x:duration-250 x:ease-[ease]'
        width={16}
        height={16}
      />
    </button>
  )
}
