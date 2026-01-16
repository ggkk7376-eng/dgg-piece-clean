"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Flipper, FlipperContent } from "@/components/animation/flipper"
import { NavBarAction } from "@/components/nav-bar";

export function ThemeToggle() {
    const { setTheme, theme } = useTheme()

    return (
        <Flipper asChild>
            <NavBarAction onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                <span className="hidden md:inline">Tryb</span>
                <FlipperContent className="h-6 w-6" itemClassName="h-5 w-5">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </FlipperContent>
            </NavBarAction>
        </Flipper>
    )
}
