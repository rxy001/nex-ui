import Script from 'next/script'

interface StructuredDataProps {
  type?: 'website' | 'software' | 'organization'
  data?: Record<string, any>
}

export function StructuredData({
  type = 'website',
  data = {},
}: StructuredDataProps) {
  const getStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
    }

    switch (type) {
      case 'website':
        return {
          ...baseData,
          '@type': 'WebSite',
          name: 'Nex UI',
          description:
            'Beautiful, modern, and reliable React component library with theme customization and dark mode support.',
          url: 'https://nex-ui-docs.vercel.app',
          author: {
            '@type': 'Person',
            name: 'X1ng Yu',
            url: 'https://github.com/rxy001',
          },
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate:
                'https://nex-ui-docs.vercel.app/search?q={search_term_string}',
            },
            'query-input': 'required name=search_term_string',
          },
          ...data,
        }

      case 'software':
        return {
          ...baseData,
          '@type': 'SoftwareApplication',
          name: 'Nex UI',
          applicationCategory: 'DeveloperApplication',
          operatingSystem: 'Any',
          description:
            'A beautiful, modern, and reliable React component library for building user interfaces.',
          url: 'https://nex-ui-docs.vercel.app',
          downloadUrl: 'https://www.npmjs.com/package/@nex-ui/react',
          version: '0.0.0',
          author: {
            '@type': 'Person',
            name: 'X1ng Yu',
          },
          programmingLanguage: ['TypeScript', 'JavaScript'],
          runtimePlatform: ['React', 'Next.js'],
          license: 'https://opensource.org/licenses/MIT',
          codeRepository: 'https://github.com/rxy001/nex-ui',
          ...data,
        }

      default:
        return { ...baseData, ...data }
    }
  }

  return (
    <Script
      id={`structured-data-${type}`}
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData()),
      }}
    />
  )
}
