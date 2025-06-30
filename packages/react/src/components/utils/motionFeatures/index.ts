export const motionFeatures = () =>
  import('./features').then((res) => res.default)
