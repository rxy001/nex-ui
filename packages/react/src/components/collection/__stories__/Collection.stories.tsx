import { useEffect, useState } from 'react'
import { Collection, CollectionItem, useCollection } from '../index'
import type { Meta } from '@storybook/react-vite'
import type { ReactNode } from 'react'

const meta: Meta = {
  title: 'Utilities/Collection',
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export default meta

function CollectionWrapper({
  children,
  title,
}: {
  children?: ReactNode
  title: string
}) {
  const collection = useCollection<{ item: string }>()

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(title, collection.getItems())
  })

  return (
    <Collection context={collection.context}>
      <ul>{children}</ul>
    </Collection>
  )
}

export const Default = () => (
  <CollectionWrapper title='Default'>
    <CollectionItem item='1'>
      <li>Item 1</li>
    </CollectionItem>
    <CollectionItem item='2'>
      <li>Item 2</li>
    </CollectionItem>
    <CollectionItem item='3'>
      <li>Item 3</li>
    </CollectionItem>
  </CollectionWrapper>
)

export const WithElementInBetween = () => (
  <CollectionWrapper title='WithElementInBetween'>
    <CollectionItem item='1'>
      <li>Item 1</li>
    </CollectionItem>
    <li>Some element in between</li>
    <CollectionItem item='2'>
      <li>Item 2</li>
    </CollectionItem>
    <li>Another element in between</li>
    <CollectionItem item='3'>
      <li>Item 3</li>
    </CollectionItem>
  </CollectionWrapper>
)

function Item2() {
  return (
    <CollectionItem item='2'>
      <li>Item 2</li>
    </CollectionItem>
  )
}

export const WithWrappedItem = () => (
  <CollectionWrapper title='WithWrappedItem'>
    <CollectionItem item='1'>
      <li>Item 1</li>
    </CollectionItem>
    <Item2 />
    <CollectionItem item='3'>
      <li>Item 3</li>
    </CollectionItem>
  </CollectionWrapper>
)

export const WithFragment = () => (
  <CollectionWrapper title='WithFragment'>
    <>
      <CollectionItem item='1'>
        <li>Item 1</li>
      </CollectionItem>
      <CollectionItem item='2'>
        <li>Item 2</li>
      </CollectionItem>
    </>
    <CollectionItem item='3'>
      <li>Item 3</li>
    </CollectionItem>
  </CollectionWrapper>
)

export const Nested = () => (
  <CollectionWrapper title='Nested outer'>
    <CollectionItem item='1'>
      <li>Item 1</li>
    </CollectionItem>
    <CollectionItem item='2'>
      <li>
        Item 2
        <CollectionWrapper title='Nested inside'>
          <CollectionItem item='2-1'>
            <li>Item 2-1</li>
          </CollectionItem>
          <CollectionItem item='2-2'>
            <li>Item 2-2</li>
          </CollectionItem>
        </CollectionWrapper>
      </li>
    </CollectionItem>
    <CollectionItem item='3'>
      <li>Item 3</li>
    </CollectionItem>
  </CollectionWrapper>
)

export const WithChangingItem = () => {
  const [count, setCount] = useState(3)

  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>
        Change item prop of last CollectionItem (current: {count})
      </button>
      <CollectionWrapper title='WithChangingItem'>
        <CollectionItem item='1'>
          <li>Item 1</li>
        </CollectionItem>
        <CollectionItem item='2'>
          <li>Item 2</li>
        </CollectionItem>
        <CollectionItem item={`${count}`}>
          <li>Item {count}</li>
        </CollectionItem>
      </CollectionWrapper>
    </>
  )
}
