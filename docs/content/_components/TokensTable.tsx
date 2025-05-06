import { TwoColumnTable } from './TwoColumnTable'

const columns = [
  {
    title: 'Token',
    dataIndex: 'token',
  },
  { title: 'Value', dataIndex: 'value' },
] as const

type TokensTableProps = {
  dataSource: { token: string; value: string }[]
}

export function TokensTable({ dataSource }: TokensTableProps) {
  return <TwoColumnTable columns={columns} dataSource={dataSource} />
}
