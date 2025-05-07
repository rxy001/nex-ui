'use client'

import { createIcon } from '../utils'

export const LoadingOutlined = createIcon(
  <g stroke='currentColor' strokeWidth='1'>
    <circle
      cx='12'
      cy='12'
      r='9.5'
      fill='none'
      strokeLinecap='round'
      strokeWidth='2'
    >
      <animate
        attributeName='stroke-dasharray'
        calcMode='spline'
        dur='1.65s'
        keySplines='0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1'
        keyTimes='0;0.475;0.95;1'
        repeatCount='indefinite'
        values='0 150;42 150;42 150;42 150'
      />
      <animate
        attributeName='stroke-dashoffset'
        calcMode='spline'
        dur='1.65s'
        keySplines='0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1'
        keyTimes='0;0.475;0.95;1'
        repeatCount='indefinite'
        values='0;-16;-59;-59'
      />
    </circle>
    <animateTransform
      attributeName='transform'
      dur='2.2s'
      repeatCount='indefinite'
      type='rotate'
      values='0 12 12;360 12 12'
    />
  </g>,
  'LoadingOutlined',
)
