export type AliasesDefinition = {
  [alias: string]: string | string[]
}

export type CreateAliasesConfig = {
  aliases?: AliasesDefinition
}
