import { Box } from '@nex-ui/react'
import beautiful640 from '../../public/images/beautiful-640.jpg'
import beautiful1280 from '../../public/images/beautiful-1280.jpg'
import asxophone640 from '../../public/images/saxophone-640.jpg'
import asxophone1280 from '../../public/images/saxophone-1280.jpg'
import dj640 from '../../public/images/dj-640.jpg'
import dj1280 from '../../public/images/dj-1280.jpg'
import woman640 from '../../public/images/woman-640.jpg'
import woman1280 from '../../public/images/woman-1280.jpg'
import music640 from '../../public/images/music-640.jpg'
import music1280 from '../../public/images/music-1280.jpg'
import man640 from '../../public/images/man-640.jpg'
import man1280 from '../../public/images/man-1280.jpg'
import accordion640 from '../../public/images/accordion-640.jpg'
import accordion1280 from '../../public/images/accordion-1280.jpg'
import marianoRoger640 from '../../public/images/mariano-roger-640.jpg'
import marianoRoger1280 from '../../public/images/mariano-roger-1280.jpg'

export const Playlist = () => {
  const playlist = [
    {
      cover: `${beautiful640.src} 1x, ${beautiful1280.src} 2x`,
      name: 'Trip Hop',
      author: 'Ava',
    },
    {
      cover: `${asxophone640.src} 1x, ${asxophone1280.src} 2x`,
      name: 'Classical Music',
      author: 'Nina',
    },
    {
      cover: `${dj640.src} 1x, ${dj1280.src} 2x`,
      name: 'Disc Jockey',
      author: 'David',
    },
    {
      cover: `${music640.src} 1x, ${music1280.src} 2x`,
      name: 'Hop Hip',
      author: 'Ethan',
    },
    {
      cover: `${woman640.src} 1x, ${woman1280.src} 2x`,
      name: 'Folk Music',
      author: 'Olivia',
    },
    {
      cover: `${man640.src} 1x, ${man1280.src} 2x`,
      name: 'Light Music',
      author: 'Ryan',
    },
    {
      cover: `${accordion640.src} 1x, ${accordion1280.src} 2x`,
      name: 'Country Music',
      author: 'Gabriel',
    },
    {
      cover: `${marianoRoger640.src} 1x, ${marianoRoger1280.src} 2x`,
      name: 'Pop Music',
      author: 'Benjamin',
    },
  ]

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
          as="h2"
          sx={{
            fs: 24,
            fontWeight: 'semibold',
            m: 0,
          }}
        >
          Listen Now
        </Box>
        <Box
          as="p"
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
                  as="img"
                  srcSet={music.cover}
                  width="100%"
                  height="50%"
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
                as="h3"
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
                as="p"
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

export const playlistCodeSnippet = `import { Box } from '@nex-ui/react'
import { playlist } from './playlist.ts'

export const Playlist = () => {
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
          as="h2"
          sx={{
            fs: 24,
            fontWeight: 'semibold',
            m: 0,
          }}
        >
          Listen Now
        </Box>
        <Box
          as="p"
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
                  as="img"
                  srcSet={music.cover}
                  width="100%"
                  height="50%"
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
                as="h3"
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
                as="p"
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
}`
