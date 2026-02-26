import { render } from '@testing-library/react'
import { CollectionItem, Collection } from '../index'
import { useCollection } from '../useCollection'

function TestCollection() {
  const collection = useCollection()

  return (
    <Collection collection={collection}>
      <CollectionItem>
        <button>Item 1</button>
      </CollectionItem>
      <CollectionItem>
        <button>Item 2</button>
      </CollectionItem>
      <CollectionItem>
        <button>Item 3</button>
      </CollectionItem>
    </Collection>
  )
}

describe('Collection', () => {
  it('should render collection items correctly', () => {
    const { getByText } = render(<TestCollection />)

    expect(getByText('Item 1')).toBeInTheDocument()
    expect(getByText('Item 2')).toBeInTheDocument()
    expect(getByText('Item 3')).toBeInTheDocument()
  })
})
