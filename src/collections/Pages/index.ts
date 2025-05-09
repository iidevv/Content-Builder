import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'content',
      type: 'json',
      admin: {
        hidden: true,
        disableListColumn: true,
      },
    },
    {
      name: 'contentPreview',
      type: 'ui',
      admin: {
        components: {
          Field: 'src/collections/Pages/ContentPreview.tsx',
        },
        disableListColumn: true,
      },
    },
    {
      name: 'editContent',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: 'src/collections/Pages/EditContentButton.tsx',
        },
        disableListColumn: true,
      },
    },
  ],
}
