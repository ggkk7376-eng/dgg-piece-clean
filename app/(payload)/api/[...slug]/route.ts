export const dynamic = 'force-dynamic'

export const GET = async (req: any, ctx: any) => {
  const { REST_GET } = await import('@payloadcms/next/routes')
  const config = (await import('@payload-config')).default
  return await REST_GET(config)(req, ctx)
}

export const POST = async (req: any, ctx: any) => {
  const { REST_POST } = await import('@payloadcms/next/routes')
  const config = (await import('@payload-config')).default
  return await REST_POST(config)(req, ctx)
}

export const DELETE = async (req: any, ctx: any) => {
  const { REST_DELETE } = await import('@payloadcms/next/routes')
  const config = (await import('@payload-config')).default
  return await REST_DELETE(config)(req, ctx)
}

export const PATCH = async (req: any, ctx: any) => {
  const { REST_PATCH } = await import('@payloadcms/next/routes')
  const config = (await import('@payload-config')).default
  return await REST_PATCH(config)(req, ctx)
}

export const PUT = async (req: any, ctx: any) => {
  const { REST_PUT } = await import('@payloadcms/next/routes')
  const config = (await import('@payload-config')).default
  return await REST_PUT(config)(req, ctx)
}

export const OPTIONS = async (req: any, ctx: any) => {
  const { REST_OPTIONS } = await import('@payloadcms/next/routes')
  const config = (await import('@payload-config')).default
  return await REST_OPTIONS(config)(req, ctx)
}