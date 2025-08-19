'use client'

import {
  Dialog,
  DialogTrigger,
  Button,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  Flex,
} from '@nex-ui/react'
import { useState } from 'react'

export default function App() {
  const [loading, setLoading] = useState(false)

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Dialog Header</DialogHeader>
        <DialogBody>
          <Flex direction='column' gap='5'>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              pulvinar risus non risus hendrerit venenatis. Pellentesque sit
              amet hendrerit risus, sed porttitor quam.
            </p>
            <p>
              Magna exercitation reprehenderit magna aute tempor cupidatat
              consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
              incididunt cillum quis. Velit duis sit officia eiusmod Lorem
              aliqua enim laboris do dolor eiusmod. Et mollit incididunt nisi
              consectetur esse laborum eiusmod pariatur proident Lorem eiusmod
              et. Culpa deserunt nostrud ad veniam.
            </p>
          </Flex>
        </DialogBody>
        <DialogFooter>
          <DialogClose>
            <Button color='red' variant='text'>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose>
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
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
