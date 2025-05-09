import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'
import { Client } from './client'
import { getPage } from '../../../lib/getPage'

import '@measured/puck/puck.css'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ puckPath: string[] }>
}): Promise<Metadata> {
  const { puckPath = [] } = await params

  return {
    title: `Edit Page ${puckPath}`,
  }
}

export default async function Page({ params }: { params: Promise<{ puckPath: string[] }> }) {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  if (!user) {
    redirect('/admin/login')
  }

  const { puckPath = [] } = await params
  const id = puckPath[0]
  const path = `/${puckPath.join('/')}`

  const data = await getPage(id)

  return <Client id={id} path={path} data={data || {}} />
}

export const dynamic = 'force-dynamic'
