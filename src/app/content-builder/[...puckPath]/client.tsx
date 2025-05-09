'use client'

import type { Data } from '@measured/puck'
import { Puck, usePuck } from '@measured/puck'
import config from '../../../../puck.config'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

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
      overrides={{
        headerActions: () => {
          const { appState } = usePuck()
          return (
            <>
              <button className="button button--secondary" disabled={isSaving} onClick={close}>
                CLOSE
              </button>
              <button
                className="button button--secondary"
                disabled={isSaving}
                onClick={() => {
                  saveAndClose(appState.data)
                }}
              >
                SAVE & CLOSE
              </button>
              <button
                className="button"
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
