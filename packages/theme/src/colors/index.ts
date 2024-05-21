import { daybreakBlue } from './daybreak-blue'
import { dustRed } from './dust-red'
import { volcano } from './volcano'

function toColorObject(key: string, colors: string[]) {
  return colors.reduce<Record<string, string>>(
    (obj, color, index) => ({
      ...obj,
      [`${key}-${index}`]: color,
    }),
    {},
  )
}

const object = {
  volcano,
  'daybreak-blue': daybreakBlue,
  'dust-red': dustRed,
}

type ColorTypes = keyof typeof object

type BuiltInColors = {
  [P in ColorTypes]: string
}

export const builtInColors = (Object.keys(object) as ColorTypes[]).reduce(
  (obj, key) => ({
    ...obj,
    ...toColorObject(key, object[key]),
  }),
  {} as BuiltInColors,
)
