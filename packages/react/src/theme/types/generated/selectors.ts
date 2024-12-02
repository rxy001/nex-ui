export interface Selectors {
  hover?: '&:not(:disabled):not([data-disabled=true]):hover'
  active?: '&:not(:disabled):not([data-disabled=true]):active'
  disabled?: ':disabled, &[data-disabled=true]'
}
