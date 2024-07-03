import { isNumber, isString } from '@nex-ui/utils'

export function pathToName(path: string[]) {
  return path.join('.')
}

export function camelToKebab(str: string) {
  return str.replace(/([A-Z])/g, (match) => {
    return `-${match.toLowerCase()}`
  })
}

function isPositiveFloatNumber(str: string) {
  return /^\d+\.\d+$/.test(str)
}

export function createCssVarName(prefix: string, path: string[]) {
  return `--${prefix}-${path
    .map((k) => {
      if (isPositiveFloatNumber(k)) {
        return k.split('.').join('-')
      }
      return camelToKebab(k)
    })
    .join('-')}`
}

export function checkTokenValue(value: any, path: string[]) {
  if (!isString(value) && !isNumber(value)) {
    console.error(
      `system: The token value must be either a string or a number. ${path}: ${value}`,
    )
    return false
  }
  return true
}
