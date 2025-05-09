import config from '@payload-config'
import { getPayload } from 'payload'
import { Page } from '@/payload-types'
import { notFound } from 'next/navigation'

export const getPage = async (id: string) => {
  const payload = await getPayload({ config })

  if (!id) {
    notFound()
  }

  try {
    const page: Page = await payload.findByID({
      collection: 'pages',
      id: id,
    })
    return page.content
  } catch (error) {
    console.error('Error fetching page:', error)
    notFound()
  }
}
