export type AliasDefinition = {
  [alias: string]: string | string[]
}

export type CreateAliasesConfig = {
  aliases?: AliasDefinition
}
