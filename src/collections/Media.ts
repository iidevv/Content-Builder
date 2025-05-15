import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'mobile',
        width: 640,
        height: undefined,
        position: 'centre',
        formatOptions: { format: 'webp', options: { quality: 90 } },
      },
      {
        name: 'tablet',
        width: 1200,
        height: undefined,
        position: 'centre',
        formatOptions: { format: 'webp', options: { quality: 90 } },
      },
      {
        name: 'desktop',
        width: 1920,
        height: undefined,
        position: 'centre',
        formatOptions: { format: 'webp', options: { quality: 90 } },
      },
    ],
    adminThumbnail: 'mobile',
    mimeTypes: ['image/*'],
    formatOptions: { format: 'webp', options: { quality: 95 } },
  },
  fields: [
    {
      name: 'mobileImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Mobile-Specific Image (Optional)',
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
