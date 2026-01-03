"use client";

import { Download } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { NavBarAction } from "@/components/nav-bar";
import { Flipper, FlipperContent } from "@/components/animation/flipper";

type FileItem = {
    name: string;
    file: {
        url: string;
        filename: string;
        filesize: number;
    };
    id?: string;
};

type Category = {
    title: string;
    files: FileItem[];
    id?: string;
};

type DownloadsData = {
    categories?: Category[];
};

export function DownloadsModal({ data }: { data: DownloadsData }) {
    const hasCategories = (data?.categories?.length ?? 0) > 0;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Flipper asChild>
                    <NavBarAction>
                        <span>Pliki do pobrania</span>
                        <FlipperContent className="h-6 w-6" itemClassName="h-5 w-5">
                            <Download />
                        </FlipperContent>
                    </NavBarAction>
                </Flipper>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-background border-border">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold mb-4">Materiały do pobrania</DialogTitle>
                    <DialogDescription>
                        Pobierz instrukcje, oprogramowanie i inne przydatne pliki.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
                    {hasCategories ? (
                        data.categories!.map((category, index) => (
                            <div key={category.id || index} className="flex flex-col gap-4">
                                <h3 className="font-semibold text-lg border-b pb-2">{category.title}</h3>
                                {category.files?.length ? (
                                    <ul className="flex flex-col gap-2">
                                        {category.files.map((item, i) => (
                                            <li key={item.id || i}>
                                                <FileLink item={item} />
                                            </li>
                                        ))}
                                    </ul>
                                ) : <p className="text-muted-foreground text-sm">Brak plików</p>}
                            </div>
                        ))
                    ) : (
                        <p className="col-span-3 text-muted-foreground text-center py-4">Brak dostępnych materiałów.</p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

function FileLink({ item }: { item: FileItem }) {
    if (!item.file || !item.file.url) return null;

    return (
        <a
            href={item.file.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors text-sm group"
        >
            <Download className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
            <span className="line-clamp-2">{item.name}</span>
        </a>
    )
}
