"use client";

import { useEffect, useState } from "react";
import { Search, Loader2, FileText } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function SearchModal() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    useEffect(() => {
        if (!query) {
            setResults([]);
            return;
        }

        const timer = setTimeout(async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
                const data = await res.json();
                setResults(data.docs || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }, 300); // 300ms debounce

        return () => clearTimeout(timer);
    }, [query]);

    const handleSelect = (slug: string) => {
        setOpen(false);
        // Handle home slug special case
        const href = slug === "home" ? "/" : `/${slug}`;
        router.push(href);
    };

    return (
        <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
            <DialogPrimitive.Trigger asChild>
                <button className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/20 transition-colors">
                    <Search className="h-4 w-4" />
                    <span className="hidden sm:inline-block">Szukaj...</span>
                </button>
            </DialogPrimitive.Trigger>
            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                <DialogPrimitive.Content className="fixed left-[50%] top-[20%] z-50 grid w-full max-w-lg translate-x-[-50%] gap-4 border border-border bg-background p-0 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">

                    <div className="flex items-center border-b border-border px-3" cmdk-input-wrapper="">
                        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                        <input
                            placeholder="Wpisz frazę..."
                            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 text-white"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            autoFocus
                        />
                    </div>

                    <div className="max-h-[300px] overflow-y-auto p-2">
                        {loading && (
                            <div className="py-6 text-center text-sm text-muted-foreground flex justify-center">
                                <Loader2 className="h-4 w-4 animate-spin" />
                            </div>
                        )}

                        {!loading && results.length === 0 && query && (
                            <p className="py-6 text-center text-sm text-muted-foreground">Brak wyników dla "{query}".</p>
                        )}

                        {!loading && results.length > 0 && (
                            <div className="flex flex-col gap-1">
                                {results.map((doc, i) => (
                                    <Link
                                        key={i}
                                        href={doc.slug === 'home' ? '/' : `/${doc.slug}`}
                                        onClick={() => setOpen(false)}
                                        className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-white hover:bg-white/10 transition-colors cursor-pointer"
                                    >
                                        <FileText className="h-4 w-4 text-muted-foreground" />
                                        <div className="flex flex-col">
                                            <span className="font-medium">{doc.title}</span>
                                            {doc.description && <span className="text-xs text-muted-foreground truncate max-w-[300px]">{doc.description}</span>}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {!query && !loading && (
                            <p className="py-6 text-center text-sm text-muted-foreground">Wpisz frazę aby wyszukać strony lub porady.</p>
                        )}
                    </div>

                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
}
