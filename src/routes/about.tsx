import { createFileRoute } from "@tanstack/react-router";
import { NavbarActionTopBar } from "@/components/variable/navbar/NavbarActionTopBar";
import { AboutSection } from "@/components/fixed/AboutSection";
import { MissionSection } from "@/components/fixed/MissionSection";
import { LegalFooter } from "@/components/fixed/LegalFooter";
import { orgContent } from "@/data/orgContent";

const aboutData = orgContent.about;
const missionData = orgContent.mission;

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About Us — ${orgContent.navbar.orgName}` },
      {
        name: "description",
        content: `${orgContent.navbar.orgName} is a community-driven charity providing shelter, education and healthcare.`,
      },
      { property: "og:title", content: `About ${orgContent.navbar.orgName}` },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-background">
      <NavbarActionTopBar data={orgContent.navbar} />
      <main className="pb-10 pt-6">
        <AboutSection data={aboutData} />
        <MissionSection data={missionData} />
      </main>
      <LegalFooter data={orgContent.footer} />
    </div>
  );
}
