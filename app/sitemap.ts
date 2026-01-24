import { payload } from "@/lib/payload";
import type { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://www.dggpiece.pl";

    // 1. Static/Base routes
    const routes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${baseUrl}/nowosci`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
    ];

    // 2. Fetch Dynamic Pages (if any, typically 'Home' is handled above or via slug)
    // We'll check for other pages just in case
    try {
        const pages = await payload.find({
            collection: "pages",
            limit: 100,
            depth: 0,
        });

        pages.docs.forEach((page: any) => {
            if (page.slug === 'home') return; // Handled by baseUrl

            routes.push({
                url: `${baseUrl}/${page.slug}`,
                lastModified: new Date(page.updatedAt),
                changeFrequency: "monthly",
                priority: 0.8,
            });
        });
    } catch (e) {
        console.error("Failed to generate sitemap for pages:", e);
    }

    // 3. Fetch News Articles
    try {
        const news = await payload.find({
            collection: "news",
            limit: 1000,
            depth: 0,
        });

        news.docs.forEach((item: any) => {
            routes.push({
                url: `${baseUrl}/nowosci/${item.slug}`,
                lastModified: new Date(item.updatedAt),
                changeFrequency: "weekly",
                priority: 0.7,
            });
        });
    } catch (e) {
        console.error("Failed to generate sitemap for news:", e);
    }

    return routes;
}
