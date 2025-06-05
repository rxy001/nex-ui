import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  DefaultItem,
  HighlightItem,
} from './table'
import type { ReactNode } from 'react'

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
          <Th className='x:w-[15%]'>Slot Name</Th>
          <Th>Class Name</Th>
          <Th className='x:w-[25%]'>Default Component</Th>
          <Th className='x:min-w-2xs'>Description</Th>
        </Tr>
      </Thead>
      <Tbody>
        {dataSource.map((data) => (
          <Tr key={data.slot}>
            <Td className='x:text-blue-600 x:font-bold x:dark:text-blue-400'>
              {data.slot}
            </Td>
            <Td>
              <HighlightItem>{data.class}</HighlightItem>
            </Td>
            <Td>
              <DefaultItem>{data.component}</DefaultItem>
            </Td>
            <Td>{data.description ?? '-'}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
