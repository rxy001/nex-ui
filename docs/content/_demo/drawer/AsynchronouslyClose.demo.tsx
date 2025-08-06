'use client'

import {
  Drawer,
  DrawerTrigger,
  Button,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from '@nex-ui/react'
import { useState } from 'react'

export default function App() {
  const [loading, setLoading] = useState(false)

  return (
    <Drawer>
      <DrawerTrigger>
        <Button>Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>Drawer Header</DrawerHeader>
        <DrawerBody>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
            hendrerit risus, sed porttitor quam.
          </p>
          <p>
            Magna exercitation reprehenderit magna aute tempor cupidatat
            consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
            incididunt cillum quis. Velit duis sit officia eiusmod Lorem aliqua
            enim laboris do dolor eiusmod. Et mollit incididunt nisi consectetur
            esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
            deserunt nostrud ad veniam.
          </p>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose>
            <Button color='red' variant='text'>
              Cancel
            </Button>
          </DrawerClose>
          <DrawerClose>
            <Button
              loading={loading}
              onClick={() => {
                setLoading(true)
                return new Promise((res) => {
                  setTimeout(() => {
                    res(true)
                    setLoading(false)
                  }, 2000)
                })
              }}
            >
              Action
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
