import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const { payload } = await import("@/lib/payload");
        const pages = await payload.find({
            collection: "pages",
            limit: 1000,
        });

        let updatedCount = 0;

        for (const page of pages.docs) {
            if (!page.content) continue;

            let changed = false;
            const newContent = page.content.map((block: any) => {
                // Handle Section Block
                if (block.blockType === "section" && block.children && Array.isArray(block.children)) {
                    const newChildren = block.children.map((child: any) => {
                        // Fix Text Block
                        if (child.blockType === "text" && typeof child.text === "string" && child.text.startsWith("{")) {
                            try {
                                const parsed = JSON.parse(child.text);
                                changed = true;
                                return { ...child, text: parsed };
                            } catch (e) {
                                // Not JSON or already broken
                                return child;
                            }
                        }

                        // Fix Gallery Block
                        if (child.blockType === "gallery" && typeof child.description === "string" && child.description.startsWith("{")) {
                            try {
                                const parsed = JSON.parse(child.description);
                                changed = true;
                                return { ...child, description: parsed };
                            } catch (e) {
                                return child;
                            }
                        }

                        return child;
                    });

                    if (changed) { // Only if children changed
                        return {
                            ...block,
                            children: newChildren
                        };
                    }
                }
                return block;
            });

            if (changed) {
                await payload.update({
                    collection: "pages",
                    id: page.id,
                    data: {
                        content: newContent,
                    },
                });
                updatedCount++;
            }
        }

        return NextResponse.json({ success: true, fixed: updatedCount });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}
