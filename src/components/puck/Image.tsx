import { ComponentConfig } from '@measured/puck'
import { Image as ImageIcon } from 'lucide-react'

type Props = {
  image: {
    id: number
    alt: string
    url: string
    filename: string
    mimeType: string
    filesize: number
    sizes: {
      mobile: string | null
      tablet: string | null
      desktop: string | null
    }
    width: number
    height: number
  } | null
}

const Image: ComponentConfig<Props> = {
  fields: {
    image: {
      type: 'external',
      placeholder: 'Select image',
      fetchList: async () => {
        try {
          const response = await fetch('/api/media', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })

          if (!response.ok) {
            throw new Error('Failed to fetch media')
          }

          const data = await response.json()

          console.log('data', data)

          return data.docs.map((item: any) => ({
            title: item.alt || item.filename || 'Unnamed image',
            filesize: item.filesize,
            mimeType: item.mimeType,
            width: item.width,
            height: item.height,
            url: item.url,
            sizes: {
              mobile: item?.mobileImage?.sizes?.mobile.url || item?.sizes?.mobile.url || item.url,
              tablet: item?.sizes?.tablet.url || item.url,
              desktop: item?.sizes?.desktop.url || item.url,
            },
          }))
        } catch (error) {
          console.error('Error fetching media:', error)
          return []
        }
      },
      getItemSummary: (item) => {
        return item.title || 'Image'
      },
    },
  },
  render: ({ image }) => {
    if (!image) {
      return (
        <ImageIcon className="w-full h-auto max-h-60 p-2 bg-white text-blue-700 border-4 border-blue-700" />
      )
    }

    return (
      <picture>
        {image.sizes.mobile && <source srcSet={image.sizes.mobile} media="(max-width: 640px)" />}
        {image.sizes.tablet && <source srcSet={image.sizes.tablet} media="(max-width: 1200px)" />}
        {image.sizes.desktop && <source srcSet={image.sizes.desktop} media="(min-width: 1201px)" />}
        <img
          src={image.url}
          alt={image.alt || 'Image'}
          width={image.width}
          height={image.height}
          className="w-full h-auto"
          loading="lazy"
        />
      </picture>
    )
  },
}

export default Image
