import { generateSlotClasses } from '../../utils'

export const breadcrumbSlotClasses = generateSlotClasses('nui-breadcrumb', [
  'root',
  'list',
  'separator',
  'collapse',
  'expand-button',
])

export const breadcrumbItemSlotClasses = generateSlotClasses(
  'nui-breadcrumb-item',
  ['root', 'link'],
)
