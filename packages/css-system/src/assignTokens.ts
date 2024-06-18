import { assignInlineVars } from '@vanilla-extract/dynamic'
import { forEach } from '@nex-ui/utils'

type Obj = Record<string, string>

type TokenValues<T extends Obj> = {
  [key in keyof T]?: string
}

export const assignTokens =
  <G extends Obj, C extends Obj>(globalTokens: G, componentTokens: C) =>
  (tokenValues: TokenValues<G & C>) => {
    if (!tokenValues) {
      return undefined
    }

    const vars: Obj = {}

    forEach(tokenValues, (value: string | undefined, token: any) => {
      const realVar = componentTokens[token] ?? globalTokens[token]

      if (realVar) {
        vars[realVar] = value!
      }
    })

    return assignInlineVars(vars)
  }
