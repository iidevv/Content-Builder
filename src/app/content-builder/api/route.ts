import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import config from '@payload-config'

export async function POST(request: Request) {
  const requestPayload = await request.json()

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const headers = await getHeaders()
  const { user } = await payload.auth({ headers })

  if (!user) {
    return NextResponse.json({}, { status: 401 })
  }

  const id = requestPayload.id

  try {
    await payload.update({
      collection: 'pages',
      id,
      data: {
        content: requestPayload.data,
      },
    })

    revalidatePath(requestPayload.path)
    return NextResponse.json({}, { status: 200 })
  } catch (error) {
    console.error('Error updating page:', error)

    return NextResponse.json({}, { status: 400 })
  }
}
