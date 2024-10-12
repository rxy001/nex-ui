export const selectors = {
  hover: '&:not(:disabled):not([data-disabled=true]):hover',
  active: '&:not(:disabled):not([data-disabled=true]):active',
  disabled: ':disabled, &[data-disabled=true]',
  dark: '.dark &, html[color-scheme="dark"] &',
  light: '.light &, html[color-scheme="light"] &',
}
