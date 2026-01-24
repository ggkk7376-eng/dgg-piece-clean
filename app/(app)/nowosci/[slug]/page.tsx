import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { payload } from "@/lib/payload";
import { NavBar } from "../../_components/nav-bar";
import { Block } from "@/components/block";
import { TextProvider } from "@/payload/blocks/text/component";

export const dynamic = "force-dynamic";

interface PageProps {
    params: Promise<{ slug: string }>;
}

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

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    try {
        const result = await payload.find({
            collection: "news",
            where: { slug: { equals: slug } },
            depth: 1,
        });
        if (result.docs.length > 0) {
            return {
                title: `${result.docs[0].title} | DGG Piece`,
                description: result.docs[0].excerpt,
            }
        }
    } catch (e) { }
    return { title: 'DGG Piece - Aktualności' };
}

export default async function NewsPost({ params }: PageProps) {
    const { slug } = await params;

    let post: any = null;

    try {
        const result = await payload.find({
            collection: "news",
            where: { slug: { equals: slug } },
            depth: 2,
        });
        if (result.docs.length > 0) {
            post = result.docs[0];
        }
    } catch (e) {
        console.error(e);
    }

    if (!post) {
        notFound();
    }

    return (
        <>
            <NavBar />
            <article className="min-h-screen pb-20 bg-white">
                {/* Hero Header */}
                <header className="relative w-full h-[50vh] min-h-[400px] flex items-end justify-center pb-20 bg-gray-900 overflow-hidden">
                    {post.cardImage && typeof post.cardImage !== 'string' && post.cardImage.url ? (
                        <>
                            <Image
                                src={post.cardImage.url}
                                alt={post.cardImage.alt || post.title}
                                fill
                                className="object-cover opacity-60"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                        </>
                    ) : (
                        <div className="absolute inset-0 bg-gray-900"></div>
                    )}

                    <div className="container relative z-10 px-5 text-center max-w-4xl">
                        <Link href="/nowosci" className="inline-block mb-8 text-xl md:text-2xl font-bold text-gray-200 hover:text-white hover:underline transition-all">
                            ← Wróć do bazy wiedzy
                        </Link>
                        <div className="flex items-center justify-center gap-3 mb-4 text-sm font-medium tracking-wider text-accent uppercase">
                            <span>Baza wiedzy</span>
                            <span>•</span>
                            <span>{formatDate(post.date)}</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-secondary text-white leading-tight">
                            {post.title}
                        </h1>
                    </div>
                </header>

                {/* Content */}
                <div className="container mx-auto px-5 py-12 max-w-4xl pt-20">
                    <div className="prose prose-lg prose-headings:font-secondary prose-headings:text-black prose-a:text-accent prose-img:rounded-xl">
                        {/* Injecting context to override text-center which is default in reused blocks */}
                        <TextProvider className="!text-justify !mx-0 [&>div]:text-justify [&>div]:mx-0 [&_p]:text-justify [&_p]:text-justify-inter-word text-justify !text-zinc-900 [&_p]:!text-zinc-900 [&_li]:!text-zinc-900 [&_strong]:!text-zinc-900">
                            {post.content?.map((block: any, i: number) => (
                                <Block {...block} key={i} />
                            ))}
                        </TextProvider>
                    </div>

                    <div className="mt-20 pt-10 border-t border-gray-200 flex justify-between items-center">
                        <Link href="/nowosci" className="text-gray-600 hover:text-black transition-colors font-medium">
                            ← Zobacz wszystkie wpisy
                        </Link>
                    </div>
                </div>
            </article>
        </>
    );
}
