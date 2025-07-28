'use client'

import {
  Dialog,
  Button,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTrigger,
  DialogClose,
  Flex,
} from '@nex-ui/react'
import { useState } from 'react'

export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Flex gap='5' align='center'>
        <DialogTrigger>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <span>{open ? 'Dialog is opened' : 'Dialog is closed'}</span>
      </Flex>
      <DialogContent>
        <DialogHeader>Dialog Header</DialogHeader>
        <DialogBody>
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
        </DialogBody>
        <DialogFooter>
          <DialogClose>
            <Button color='red' variant='text'>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose>
            <Button>Action</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
