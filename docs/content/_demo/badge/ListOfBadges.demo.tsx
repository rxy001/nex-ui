'use client'

import { useState } from 'react'
import { Badge, Flex } from '@nex-ui/react'

const initialFruits = ['Apple', 'Banana', 'Cherry', 'Watermelon', 'Orange']

export default function App() {
  const [fruits, setFruits] = useState(initialFruits)

  const handleClose = (fruitToRemove: string) => {
    setFruits(fruits.filter((fruit) => fruit !== fruitToRemove))
    if (fruits.length === 1) {
      setFruits(initialFruits)
    }
  }

  return (
    <Flex gap='4'>
      {fruits.map((fruit) => (
        <Badge key={fruit} closable onClose={() => handleClose(fruit)}>
          {fruit}
        </Badge>
      ))}
    </Flex>
  )
}
