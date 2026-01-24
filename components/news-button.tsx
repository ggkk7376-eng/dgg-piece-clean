"use client";

import { Newspaper } from "lucide-react";
import { useRouter } from "next/navigation";
import { NavBarAction } from "@/components/nav-bar";
import { Flipper, FlipperContent } from "@/components/animation/flipper";
import { useNavBar } from "@/components/nav-bar";

export function NewsButton() {
    const router = useRouter();
    // We need to close the navbar if it's open (mobile)
    const { toggle } = useNavBar();

    const handleClick = () => {
        toggle(); // Close menu
        router.push("/nowosci");
    };

    return (
        <Flipper>
            <NavBarAction onClick={handleClick}>
                <span>Baza wiedzy</span>
                <FlipperContent className="h-6 w-6" itemClassName="h-5 w-5">
                    <Newspaper />
                </FlipperContent>
            </NavBarAction>
        </Flipper>
    );
}
