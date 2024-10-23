import { generateUtilityClasses } from '../utils'

// 用于单元测试
export const flexClasses = generateUtilityClasses('nui-flex', [
  // ---------root---------
  'root',
  'justify-center',
  'justify-start',
  'justify-end',
  'justify-flex-start',
  'justify-flex-end',
  'justify-left',
  'justify-right',
  'justify-space-between',
  'justify-space-around',
  'justify-space-evenly',

  'align-flex-start',
  'align-flex-end',
  'align-start',
  'align-end',
  'align-center',
  'align-self-start',
  'align-self-end',

  'direction-column',
  'direction-column-reverse',
  'direction-row',
  'direction-row-reverse',

  'wrap-nowrap',
  'wrap-wrap',
  'wrap-wrap-reverse',

  'gap-10px',
  'gap-20px',

  'inline',

  // ---------root---------
])
