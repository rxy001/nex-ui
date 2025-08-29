'use client'

import { createIcon } from '../utils'

export const ExclamationCircleOutlined = createIcon(
  <g fill='none'>
    <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='1.5' />
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeWidth='1.5'
      d='M12 7v6'
    />
    <circle cx='12' cy='16' r='1' fill='currentColor' />
  </g>,
  'ExclamationCircleOutlined',
)
