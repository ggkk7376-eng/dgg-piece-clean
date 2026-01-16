"use client";

import { BookOpen } from "lucide-react";
import Link from "next/link";
import { NavBarAction } from "@/components/nav-bar";
import { Flipper, FlipperContent } from "@/components/animation/flipper";

export function NewsButton() {
    return (
        <Link href="/baza-wiedzy" passHref legacyBehavior>
            <NavBarAction asChild>
                <a className="flex items-center gap-2">
                    <Flipper asChild>
                        <span className="flex items-center gap-2">
                            <span>Baza wiedzy</span>
                            <FlipperContent className="h-6 w-6" itemClassName="h-5 w-5">
                                <BookOpen />
                            </FlipperContent>
                        </span>
                    </Flipper>
                </a>
            </NavBarAction>
        </Link>
    );
}
