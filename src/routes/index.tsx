import { createFileRoute } from "@tanstack/react-router";
import { NavbarActionTopBar } from "@/components/variable/navbar/NavbarActionTopBar";
import { HeroSplitAction } from "@/components/variable/hero/HeroSplitAction";
import { LegalFooter } from "@/components/fixed/LegalFooter";
import { HomeOverviewSections } from "@/components/variable/home/HomeOverviewSections";
import { orgContent } from "@/data/orgContent";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: orgContent.seo.defaultTitle },
      { name: "description", content: orgContent.seo.defaultDescription },
      { property: "og:title", content: orgContent.seo.defaultTitle },
      { property: "og:description", content: orgContent.seo.defaultDescription },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <NavbarActionTopBar data={orgContent.navbar} />
      <main id="home">
        <HeroSplitAction data={orgContent.hero} />
        <HomeOverviewSections />
      </main>
      <LegalFooter data={orgContent.footer} />
    </div>
  );
}
