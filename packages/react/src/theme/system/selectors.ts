import { defineConfig } from '@nex-ui/system'

export const selectors = defineConfig.selectors({
  hover: '&:is(:hover, [data-hover=true]):not(:disabled, [data-disabled=true])',
  active:
    '&:is(:active, [data-active=true]):not(:disabled, [data-disabled=true])',
  focus: '&:is(:focus, [data-focus=true]):not(:disabled, [data-disabled=true])',
  focusWithin:
    '&:is(:focus-within, [data-focus-within=true]):not(:disabled, [data-disabled=true])',
  disabled: '&:is(:disabled, [data-disabled=true])',
  focusVisible:
    '&[data-focus-visible=true]:not(:disabled, [data-disabled=true])',
})
