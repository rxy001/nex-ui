import { defineConfig } from '@nex-ui/system'

export const selectors = defineConfig.selectors({
  hover: '&:not(:disabled):not([data-disabled=true]):hover',
  active: '&:not(:disabled):not([data-disabled=true]):active',
  focus: '&:not(:disabled):not([data-disabled=true]):focus',
  focusWithin: '&:not(:disabled):not([data-disabled=true]):focus-within',
  disabled: ':disabled, &[data-disabled=true]',
})
