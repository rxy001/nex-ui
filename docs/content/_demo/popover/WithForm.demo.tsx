import {
  Box,
  Flex,
  Input,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from '@nex-ui/react'
import { CloseOutlined } from '@nex-ui/icons'

export default function App() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button>Click me</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Box as='form'>
          <Flex
            direction='column'
            gap='2'
            sx={{
              py: '2',
            }}
          >
            <Box
              sx={{
                fs: 'md',
                fontWeight: 'bold',
              }}
            >
              Dimensions
            </Box>
            <Input
              label='Width'
              labelPlacement='float-inside'
              defaultValue='100%'
              size='sm'
            />
            <Input
              label='Max. width'
              labelPlacement='float-inside'
              defaultValue='300px'
              size='sm'
            />
            <Input
              label='Height'
              labelPlacement='float-inside'
              defaultValue='25px'
              size='sm'
            />
            <Input
              label='Max. height'
              labelPlacement='float-inside'
              defaultValue='none'
              size='sm'
            />
            <PopoverClose>
              <Button
                iconOnly
                radius='full'
                variant='ghost'
                color='gray'
                size='sm'
                sx={{
                  position: 'absolute',
                  right: '1.5',
                  top: '1.5',
                }}
              >
                <CloseOutlined />
              </Button>
            </PopoverClose>
          </Flex>
        </Box>
      </PopoverContent>
    </Popover>
  )
}
