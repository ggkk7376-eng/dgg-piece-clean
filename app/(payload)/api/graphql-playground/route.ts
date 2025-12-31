const dynamic = 'force-dynamic'

export const GET = async (request: any, context: any) => {
    try {
        const { GRAPHQL_PLAYGROUND_GET } = await import('@payloadcms/next/routes')
        const config = (await import('@payload-config')).default
        return await GRAPHQL_PLAYGROUND_GET(config)(request)
    } catch (e) {
        console.error("GraphQL Playground Error:", e)
        return new Response("GraphQL Playground Error", { status: 500 })
    }
}

export { dynamic }