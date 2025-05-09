'use client'

import type { Data } from '@measured/puck'
import { Puck } from '@measured/puck'
import config from '../../../../puck.config'

export function Client({ id, path, data }: { id: string; path: string; data: Partial<Data> }) {
  return (
    <Puck
      config={config}
      data={data}
      onPublish={async (data) => {
        await fetch('api', {
          method: 'post',
          body: JSON.stringify({ id, path, data }),
        })
      }}
    />
  )
}
