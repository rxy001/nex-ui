import { render } from '@testing-library/react'
import { useEffect } from 'react'
import { createCollection } from '../index'

type ItemData = { id: string; disabled: boolean }

const [Collection, CollectionItem, useCollection] =
  createCollection<ItemData>('Test')

type TestCollectionProps = {
  getItems?: (items: Array<{ element: HTMLElement } & ItemData>) => void
}

function TestCollection({ getItems }: TestCollectionProps) {
  const collection = useCollection()

  useEffect(() => {
    getItems?.(collection.getItems())
  }, [collection, getItems])

  return (
    <Collection collection={collection}>
      <CollectionItem id='item1' disabled={false}>
        <button>Item 1</button>
      </CollectionItem>
      <CollectionItem id='item2' disabled>
        <button>Item 2</button>
      </CollectionItem>
      <CollectionItem id='item3' disabled={false}>
        <button>Item 3</button>
      </CollectionItem>
    </Collection>
  )
}

describe('Collection', () => {
  it('should render collection items correctly', () => {
    const mockGetItems = jest.fn()

    const { getByText } = render(<TestCollection getItems={mockGetItems} />)
    expect(mockGetItems).toHaveBeenCalledWith([
      {
        element: expect.any(HTMLButtonElement),
        id: 'item1',
        disabled: false,
      },
      {
        element: expect.any(HTMLButtonElement),
        id: 'item2',
        disabled: true,
      },
      {
        element: expect.any(HTMLButtonElement),
        id: 'item3',
        disabled: false,
      },
    ])

    expect(getByText('Item 1')).toBeInTheDocument()
    expect(getByText('Item 2')).toBeInTheDocument()
    expect(getByText('Item 3')).toBeInTheDocument()
  })
})
