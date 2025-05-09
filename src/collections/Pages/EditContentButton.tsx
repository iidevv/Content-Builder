'use client'

import { useDocumentInfo, Button } from '@payloadcms/ui'
import { UIFieldClientComponent, UIFieldClientProps } from 'payload'
import { useRouter } from 'next/navigation'

const EditContentButtonField: UIFieldClientComponent = (props: UIFieldClientProps) => {
  const router = useRouter()

  const { id } = useDocumentInfo()

  if (!id)
    return (
      <div>
        <p>Save to edit content</p>
      </div>
    )

  return (
    <div>
      <Button
        onClick={() => {
          router.push(`/content-builder/${id}`)
        }}
      >
        EDIT CONTENT
      </Button>
    </div>
  )
}

export default EditContentButtonField
