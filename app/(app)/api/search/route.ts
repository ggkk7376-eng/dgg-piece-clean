
import { payload } from "@/lib/payload";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query) {
        return NextResponse.json({ docs: [] });
    }

    try {
        const pages = await payload.find({
            collection: "pages",
            where: {
                or: [
                    {
                        title: {
                            like: query,
                        },
                    },
                    {
                        "content.richText": {
                            like: query, // This is a bit optimistic for Block content, usually requires deep search or text index.
                            // Payload's 'like' operator works on text fields. For blocks, it's harder.
                            // I will prioritize TITLE search and simple content fields for now.
                            // Actually, looking at `payload/collections/pages` -> fields -> content (blocks).
                            // Searching inside blocks JSON with `like` is tricky in standard SQL/Mongo without specific setup.
                            // I will stick to referencing 'title' and 'description' (if exists) which IS a text field.
                        },
                    },
                    {
                        description: {
                            like: query
                        }
                    }
                ],
            },
            limit: 5,
            depth: 1,
        });

        // Formatting results for frontend
        const results = pages.docs.map((doc: any) => ({
            title: doc.title,
            slug: doc.slug,
            type: "Strona", // "Page" in Polish
            description: doc.description,
        }));

        return NextResponse.json({ docs: results });
    } catch (error) {
        console.error("Search error:", error);
        return NextResponse.json({ docs: [] }, { status: 500 });
    }
}
