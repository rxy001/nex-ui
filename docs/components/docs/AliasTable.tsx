import { defaultConfig } from '@nex-ui/react'
import { TwoColumnTable } from './TwoColumnTable'

const dataSource = Object.entries(defaultConfig.aliases ?? {}).map(
  ([alias, prop]) => ({
    alias,
    prop: Array.isArray(prop) ? prop.join('、') : prop,
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
