'use client'

import type { Data } from '@measured/puck'
import { Puck, usePuck } from '@measured/puck'
import config from '@/puck.config'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Smartphone, Tablet, TvMinimal } from 'lucide-react'

export function Client({ id, path, data }: { id: string; path: string; data: Partial<Data> }) {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)

  const close = () => {
    router.push(`/admin/collections/pages/${id}`)
  }

  const saveAndClose = async (data: Data) => {
    await save(data)
    close()
  }

  const save = async (data: Data) => {
    setIsSaving(true)

    await fetch('api', {
      method: 'post',
      body: JSON.stringify({ id, path, data }),
    })

    setIsSaving(false)
  }

  return (
    <Puck
      config={config}
      data={data}
      viewports={[
        {
          width: 375,
          height: 'auto',
          label: 'Mobile',
          icon: <Smartphone />,
        },
        {
          width: 768,
          height: 'auto',
          label: 'Tablet',
          icon: <Tablet />,
        },
        {
          width: 1440,
          height: 'auto',
          label: 'Desktop',
          icon: <TvMinimal />,
        },
      ]}
      overrides={{
        iframe: ({ children, document }) => {
          useEffect(() => {
            if (document) {
              document.body.setAttribute('style', 'padding: 10px;')
            }
          }, [document])

          return <>{children}</>
        },
        headerActions: () => {
          const { appState } = usePuck()
          return (
            <>
              <button
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 disabled:opacity-70 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer"
                disabled={isSaving}
                onClick={close}
              >
                CLOSE
              </button>
              <button
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 disabled:opacity-70 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer"
                disabled={isSaving}
                onClick={() => {
                  saveAndClose(appState.data)
                }}
              >
                SAVE & CLOSE
              </button>
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 disabled:opacity-70 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none cursor-pointer"
                disabled={isSaving}
                onClick={() => {
                  save(appState.data)
                }}
              >
                {isSaving ? 'SAVING...' : 'SAVE'}
              </button>
            </>
          )
        },
      }}
    />
  )
}
