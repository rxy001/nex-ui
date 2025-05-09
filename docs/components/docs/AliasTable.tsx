import { isArray, map } from '@nex-ui/utils'
import { defaultConfig } from '@nex-ui/react'
import { TwoColumnTable } from './TwoColumnTable'

const dataSource = map(
  defaultConfig.aliases,
  (prop: string | string[], alias: string) => ({
    prop: isArray(prop) ? prop.join('、') : prop,
    alias,
  }),
)

const columns = [
  {
    title: 'Alias',
    dataIndex: 'alias',
  },
  {
    title: 'CSS Property',
    dataIndex: 'prop',
  },
] as const

export function AliasTable() {
  return <TwoColumnTable dataSource={dataSource} columns={columns} />
}
