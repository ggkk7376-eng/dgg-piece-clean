import { NextResponse } from "next/server";
import { payload } from "@/lib/payload";

export async function GET() {
    try {
        const pages = await payload.find({
            collection: "pages",
            limit: 1,
            where: { slug: { equals: "home" } } // Inspect home page
        });

        if (!pages.docs.length) return NextResponse.json({ error: "No home page found" });

        const page = pages.docs[0];

        // Log structure of content blocks
        const structure = page.content?.map((block: any) => {
            if (block.blockType === "section") {
                return {
                    type: "section",
                    children: block.children?.map((child: any) => {
                        if (child.blockType === "text") {
                            return { type: "text", textType: typeof child.text, textPreview: typeof child.text === 'string' ? child.text.substring(0, 20) : "OBJECT" };
                        }
                        if (child.blockType === "gallery") {
                            return { type: "gallery", descType: typeof child.description, descPreview: typeof child.description === 'string' ? child.description.substring(0, 20) : "OBJECT" };
                        }
                        return { type: child.blockType };
                    })
                };
            }
            return { type: block.blockType };
        });

        return NextResponse.json({ success: true, structure });
    } catch (error) {
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}
