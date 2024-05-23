import { createThemeContract } from '@vanilla-extract/css'

type ThemeContract<T extends readonly string[]> = {
  [P in T[number]]: null
}

export const ctc = <T extends readonly string[]>(properties: T) =>
  createThemeContract(
    properties.reduce(
      (vars, property) => ({
        ...vars,
        [property]: null,
      }),
      {},
    ) as ThemeContract<T>,
  )
