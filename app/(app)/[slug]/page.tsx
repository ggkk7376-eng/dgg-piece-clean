import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

import { Block } from "@/components/block";
import { payload } from "@/lib/payload";

import { NavBar } from "../_components/nav-bar";
import { LivePreview } from "./_components/live-preview";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const getPage = cache(async (slug: string) => {
  const result = await payload.find({
    collection: "pages",
    where: { slug: { equals: slug } },
  });

  if (result.docs.length === 0) {
    throw notFound();
  }

  return result.docs[0];
});

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page = await getPage((await params).slug);

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
  };
}

export default async function Page({ params }: PageProps) {
  const page = await getPage((await params).slug);

  return (
    <>
      <LivePreview />

      <NavBar />

      {page.content?.map((block) => (
        <Block {...block} key={block.id} />
      ))}
    </>
  );
}
