import Link from "next/link";
import Image from "next/image";
import { payload } from "@/lib/payload";
import { NavBar } from "../_components/nav-bar";

export const dynamic = "force-dynamic";

const MONTHS_PL = [
    "stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca",
    "lipca", "sierpnia", "września", "października", "listopada", "grudnia"
];

function formatDate(dateString: string) {
    if (!dateString) return "";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "";
    const day = d.getDate();
    const month = MONTHS_PL[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
}

export default async function NewsIndex() {
    let newsDocs = [];
    try {
        const news = await payload.find({
            collection: "news",
            sort: "-date",
            where: {
                isPublished: { equals: true },
            },
            depth: 1,
        });
        newsDocs = news.docs;
    } catch (e) {
        console.error("Failed to fetch news:", e);
    }

    return (
        <>
            <NavBar />
            <main className="container mx-auto px-5 py-20 md:py-32 min-h-screen">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold font-secondary text-accent mb-4">
                        Baza wiedzy
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Najnowsze informacje, wydarzenia i poradniki z naszego świata.
                    </p>
                </div>

                {newsDocs.length === 0 ? (
                    <div className="text-center p-10 border border-dashed border-gray-700 rounded-xl bg-card/50">
                        <p className="text-lg text-muted-foreground">Brak aktualnie opublikowanych artykułów.</p>
                        <p className="text-sm mt-2 text-gray-500">Zajrzyj do nas wkrótce!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {newsDocs.map((item: any) => (
                            <Link
                                href={`/nowosci/${item.slug}`}
                                key={item.id}
                                className="group flex flex-col h-full bg-card border border-border rounded-xl overflow-hidden hover:shadow-2xl hover:border-accent/50 transition-all duration-300"
                            >
                                <div className="aspect-[16/9] relative overflow-hidden bg-muted">
                                    {item.cardImage && (typeof item.cardImage !== 'string' ? item.cardImage.url : null) ? (
                                        <Image
                                            src={typeof item.cardImage !== 'string' ? item.cardImage.url : ''}
                                            alt={item.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted">
                                            <span>Brak zdjęcia</span>
                                        </div>
                                    )}
                                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                                </div>

                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 px-2 py-1 rounded">
                                            Baza wiedzy
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {formatDate(item.date)}
                                        </span>
                                    </div>

                                    <h2 className="text-xl font-bold mb-3 font-secondary group-hover:text-accent transition-colors line-clamp-2">
                                        {item.title}
                                    </h2>

                                    <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
                                        {item.excerpt}
                                    </p>

                                    <div className="flex items-center text-accent font-medium text-sm group-hover:translate-x-1 transition-transform">
                                        Czytaj więcej <span className="ml-1">→</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </>
    );
}
