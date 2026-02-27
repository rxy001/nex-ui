import { generateSlotClasses } from '../../utils'

export const radioClasses = generateSlotClasses('nui-radio', [
  'root',
  'input',
  'label',
  'indicator',
])

export const radioGroupClasses = generateSlotClasses('nui-radio-group', [
  'root',
  'label',
  'wrapper',
])
