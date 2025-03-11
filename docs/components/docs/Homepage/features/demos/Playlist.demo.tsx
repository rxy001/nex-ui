'use client'

import { Box } from '@nex-ui/react'
import Image from 'next/image'
import { playlist } from './playlist.data'

export default function Playlist() {
  return (
    <Box
      sx={{
        width: {
          _lg: '50%',
          _DEFAULT: '100%',
        },
      }}
    >
      <Box>
        <Box
          as='h2'
          sx={{
            fs: 24,
            fontWeight: 'semibold',
            m: 0,
          }}
        >
          Listen Now
        </Box>
        <Box
          as='p'
          sx={{
            fs: 'md',
            color: 'gray.400',
            m: 0,
            mt: 4,
          }}
        >
          Top picks for you. Updated daily.
        </Box>
      </Box>
      <Box
        sx={{
          h: 'px',
          bg: 'gray.200',
          my: '5',
        }}
      />
      <Box
        sx={{
          display: 'flex',
          overflow: 'auto',
          justifyContent: 'space-between',
          gap: '5',
          pb: 15,
        }}
      >
        {playlist.map((music) => {
          return (
            <Box
              key={music.name}
              sx={{
                flexShrink: '0',
              }}
            >
              <Box
                sx={{
                  w: '140px',
                  h: '210px',
                  borderRadius: 'sm',
                  overflow: 'hidden',
                }}
              >
                <Box
                  as={Image}
                  src={music.cover}
                  alt={music.name}
                  width={140}
                  height={210}
                  loading='lazy'
                  sx={{
                    height: '100%',
                    transition: 'transform 0.2s',
                    _hover: {
                      transform: 'scale(1.1)',
                    },
                  }}
                />
              </Box>
              <Box
                as='h3'
                sx={{
                  fontWeight: 'medium',
                  m: 0,
                  fs: 'md',
                  mt: '3',
                }}
              >
                {music.name}
              </Box>
              <Box
                as='p'
                sx={{
                  m: 0,
                  fs: 'sm',
                  color: 'gray.400',
                }}
              >
                {music.author}
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}
