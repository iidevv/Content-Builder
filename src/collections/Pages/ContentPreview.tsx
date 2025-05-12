'use client'

import { useDocumentInfo, Button } from '@payloadcms/ui'
import { UIFieldClientComponent, UIFieldClientProps } from 'payload'
import config from '../../../puck.config'
import type { Data } from '@measured/puck'
import { Render } from '@measured/puck'
import { useRef, useState } from 'react'

const ContentPreviewField: UIFieldClientComponent = (props: UIFieldClientProps) => {
  const { initialData } = useDocumentInfo()
  const data = initialData?.content as Data
  const previewRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  const copyHTML = () => {
    const html = previewRef.current?.innerHTML
    if (html) {
      navigator.clipboard.writeText(html)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!data) return null

  return (
    <>
      <p>Content</p>
      <Button buttonStyle="secondary" onClick={copyHTML}>
        {copied ? 'COPIED' : 'COPY HTML'}
      </Button>
      <div className="content-preview">
        <div ref={previewRef}>
          <div className="content-builder-content">
            <Render config={config} data={data} />
          </div>
          <script src="http://localhost:3000/js/content-builder.js" defer></script>
        </div>
      </div>
    </>
  )
}

export default ContentPreviewField
