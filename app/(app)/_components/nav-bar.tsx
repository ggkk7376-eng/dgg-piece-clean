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

export async function NavBar() {
  let nav;
  let downloads;

  try {
    nav = await payload.findGlobal({
      slug: "navigation",
    });
    downloads = await payload.findGlobal({
      slug: "downloads",
    });
  } catch (e) {
    console.error("Failed to fetch navigation or downloads:", e);
  }

  const items = [
    { label: nav?.whyUsLabel || "Dlaczego my?", url: "/#why-us" },
    { label: nav?.missionLabel || "Nasza misja", url: "/#mission" },
    { label: nav?.worksLabel || "Realizacje", url: "/#works" },
    { label: "Produkty", url: "/#products" }, // Hardcoded per screenshot request
    { label: nav?.contactLabel || "Kontakt", url: "/#contact" },
  ];

  return (
    <NavBarRoot>
      <NavBarHeader>
        <Link href="/" className="block h-[52px]">
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
      </NavBarContent>

      <DownloadsModal data={downloads as any} />
    </NavBarRoot>
  );
}
