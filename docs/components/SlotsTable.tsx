import type { ReactNode } from 'react'
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  DefaultItem,
  HighlightItem,
} from './Table'

type SlotsTableProps = {
  dataSource: {
    slot: string
    class: string
    component: string
    description?: ReactNode
  }[]
}

export const SlotsTable = ({ dataSource = [] }: SlotsTableProps) => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Slot Name</Th>
          <Th>Class Name</Th>
          <Th>Default Component</Th>
          <Th>Description</Th>
        </Tr>
      </Thead>
      <Tbody>
        {dataSource.map((data) => (
          <Tr key={data.slot}>
            <Td className="x:text-blue-600 x:font-bold x:w-[15%] x:dark:text-blue-400">
              {data.slot}
            </Td>
            <Td>
              <HighlightItem>{data.class}</HighlightItem>
            </Td>
            <Td className="x:w-[25%]">
              <DefaultItem>{data.component}</DefaultItem>
            </Td>
            <Td className="x:min-w-2xs">{data.description ?? '-'}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
