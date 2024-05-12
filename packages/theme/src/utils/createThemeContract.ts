import { createThemeContract as ctc } from '@vanilla-extract/css'

type ThemeContract<T extends readonly string[]> = {
  [P in T[number]]: null
}

export const createThemeContract = <T extends readonly string[]>(
  properties: T,
) =>
  ctc(
    properties.reduce(
      (vars, property) => ({
        ...vars,
        [property]: null,
      }),
      {},
    ) as ThemeContract<T>,
  )
