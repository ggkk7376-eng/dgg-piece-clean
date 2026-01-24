import Link from "next/link";
import { payload } from "@/lib/payload";

import {
  NavBarContent,
  NavBarHeader,
  NavBarItem,
  NavBar as NavBarRoot,
  NavBarTrigger,
} from "@/components/nav-bar";

import { AppLogo } from "./logo";
import { DownloadsModal } from "@/components/downloads-modal";
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

        <NavBarTrigger />
      </NavBarHeader>

      <NavBarContent>
        {items.map((item, index) => (
          <NavBarItem key={index}>
            <Link href={item.url}>{item.label}</Link>
          </NavBarItem>
        ))}
        {/* Centered actions container */}
        <li className="w-full list-none">
          <div className="flex flex-col items-center gap-6 w-full mt-2">
            <NewsButton />
            <DownloadsModal data={downloads as any} />
          </div>
        </li>
      </NavBarContent>
    </NavBarRoot>
  );
}
