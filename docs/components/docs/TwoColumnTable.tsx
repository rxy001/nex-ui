import { Table, Tbody, Td, Th, Thead, Tr } from '../table'
import clsx from 'clsx'

type Column = { title: string; dataIndex: string; className?: string }

type TwoColumnTableProps = {
  columns: readonly [Column, Column]
  dataSource: any[]
}

export function TwoColumnTable({ columns, dataSource }: TwoColumnTableProps) {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th className={clsx('x:w-[50%]', columns[0].className)}>
            {columns[0].title}
          </Th>
          <Th className={columns[1].className}>{columns[1].title}</Th>
        </Tr>
      </Thead>
      <Tbody>
        {dataSource.map((data, index) => (
          <Tr key={index}>
            {columns.map((column, i) => {
              return (
                <Td
                  key={column.dataIndex}
                  className={
                    i === 0
                      ? 'x:text-blue-600 x:font-bold x:dark:text-blue-400'
                      : ''
                  }
                >
                  {data[column.dataIndex]}
                </Td>
              )
            })}
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
