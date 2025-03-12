/* eslint-disable react-hooks/rules-of-hooks -- false positive, useMDXComponents isn't react hooks */

import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents } from '@/mdx-components'

export const generateStaticParams = generateStaticParamsFor('mdxPath')

const title = 'Nex UI - Beautiful, modern and high-quality React UI library'

type PageProps = Readonly<{
  params: Promise<{
    mdxPath: string[]
    lang: string
  }>
}>

export async function generateMetadata(props: PageProps) {
  const params = await props.params

  const { metadata } = await importPage(params.mdxPath, params.lang)

  return {
    ...metadata,
    title:
      metadata.title === 'Homepage' ? title : `${metadata.title} - ${title}.`,
  }
}

const Wrapper = useMDXComponents().wrapper

export default async function Page(props: PageProps) {
  // eslint-disable-next-line react/destructuring-assignment
  const params = await props.params
  const result = await importPage(params.mdxPath, params.lang)
  const { default: MDXContent, toc, metadata } = result
  return (
    <Wrapper toc={toc} metadata={metadata}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  )
}
