import { TwoColumnTable } from './TwoColumnTable'

const columns = [
  {
    title: 'Key',
    dataIndex: 'key',
  },
  { title: 'Value', dataIndex: 'value' },
] as const

type TokenTableProps = {
  dataSource: { key: string; value: string }[]
}

export function TokenTable({ dataSource }: TokenTableProps) {
  return <TwoColumnTable columns={columns} dataSource={dataSource} />
}
