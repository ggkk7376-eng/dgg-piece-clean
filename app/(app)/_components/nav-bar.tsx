import Link from "next/link";
import { payload } from "@/lib/payload";
import { SearchModal } from "@/components/search-modal";

import {
  NavBarContent,
  NavBarHeader,
  NavBarItem,
  NavBar as NavBarRoot,
  NavBarTrigger,
} from "@/components/nav-bar";

import { AppLogo } from "./logo";
import { DownloadsModal } from "@/components/downloads-modal";
import { ThemeToggle } from "@/components/theme-toggle";
import { NewsButton } from "@/components/news-button";

export async function NavBar() {
  let nav;
  let downloads;

  try {
    nav = await payload.findGlobal({
      slug: "navigation",
    });
    downloads = await payload.findGlobal({
      slug: "downloads",
      depth: 2,
    });
  } catch (e) {
    console.error("Failed to fetch navigation or downloads:", e);
  }

  const items = [
    { label: nav?.whyUsLabel || "Why Us", url: "/#why-us" },
    { label: nav?.missionLabel || "Mission", url: "/#mission" },
    { label: nav?.worksLabel || "Works", url: "/#works" },
    { label: nav?.servicesLabel || "Services", url: "/#services" },
    { label: nav?.contactLabel || "Contact", url: "/#contact" },
  ];

  return (
    <NavBarRoot>
      <NavBarHeader>
        <Link href="/" className="block h-[52px]" aria-label="Strona główna">
          <AppLogo className="h-full" />
        </Link>

        <div className="flex items-center gap-2">
          <SearchModal />
          <NavBarTrigger />
        </div>
      </NavBarHeader>

      <NavBarContent>
        {items.map((item, index) => (
          <NavBarItem key={index}>
            <Link href={item.url}>{item.label}</Link>
          </NavBarItem>
        ))}
      </NavBarContent>

      <ThemeToggle />
      <DownloadsModal data={downloads as any} />
      <NewsButton />
    </NavBarRoot>
  );
}
