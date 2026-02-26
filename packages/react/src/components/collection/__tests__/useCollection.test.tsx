import { render } from '@testing-library/react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Collection, CollectionItem, useCollection } from '../index'
import type { ReactNode } from 'react'

type ItemData = { value: string; disabled: boolean }

type TestCollectionProps = {
  getItems: (items: Array<{ element: HTMLElement } & ItemData>) => void
  children: ReactNode
}

function TestCollection({ getItems, children }: TestCollectionProps) {
  const collection = useCollection<ItemData>()

  useEffect(() => {
    getItems(collection.getItems())
  }, [collection, getItems])

  return <Collection collection={collection}>{children}</Collection>
}

describe('useCollection', () => {
  it('should return the value correctly', () => {
    const mockGetItems = jest.fn()
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

    render(
      <TestCollection getItems={mockGetItems}>
        {createPortal(
          <CollectionItem value='portal-item' disabled={false}>
            <button>portal-item</button>
          </CollectionItem>,
          document.body,
        )}
        <div>
          <button>button</button>
        </div>
        <CollectionItem value='item1' disabled={false}>
          <button>item1</button>
        </CollectionItem>
        <div>
          <CollectionItem value='item2' disabled={true}>
            <button>item2</button>
          </CollectionItem>
        </div>
        <CollectionItem value='item3' disabled={false}>
          <button>item3</button>
        </CollectionItem>
        {
          // @ts-expect-error
          <CollectionItem value='item4' disabled={false}>
            item4
          </CollectionItem>
        }
      </TestCollection>,
    )

    expect(mockGetItems).toHaveBeenCalledWith([
      {
        element: expect.any(HTMLButtonElement),
        value: 'item1',
        disabled: false,
      },
      {
        element: expect.any(HTMLButtonElement),
        value: 'item2',
        disabled: true,
      },
      {
        element: expect.any(HTMLButtonElement),
        value: 'item3',
        disabled: false,
      },
      {
        element: expect.any(HTMLButtonElement),
        value: 'portal-item',
        disabled: false,
      },
    ])

    expect(consoleSpy).toHaveBeenCalled()
    consoleSpy.mockRestore()
  })
})
