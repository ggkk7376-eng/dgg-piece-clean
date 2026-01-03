import Page from "./[slug]/page";

export const dynamic = "force-dynamic";

export default function Home() {
  return <Page params={Promise.resolve({ slug: "home" })} />;
}
