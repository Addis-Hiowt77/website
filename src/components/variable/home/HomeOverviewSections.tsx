import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePublicGalleryItems } from "@/hooks/usePublicGalleryItems";
import { orgContent } from "@/data/orgContent";
import { FeaturedEventsSection } from "@/components/variable/home/FeaturedEventsSection";
import type { GalleryItem } from "@/types/schema";

const sectionShell =
  "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

function getImpactStatTitle(metricLabel?: string) {
  const label = String(metricLabel ?? "");

  if (label.toLowerCase().includes("children")) return "Children supported";
  if (label.toLowerCase().includes("meals")) return "Meals served";
  if (label.toLowerCase().includes("scholarships")) return "Active scholarships";
  return "Program efficiency";
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="mx-auto max-w-2xl text-center">
      <span className="inline-flex rounded-badge bg-trust-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-trust-600">
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">{description}</p>
    </header>
  );
}

function AboutOverviewVariantOne() {
  const aboutData = orgContent.about;
  const highlights = [
    "Community-based care and long-term family support",
    "Education, shelter and health services under one roof",
  ];

  return (
    <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
      <div className="overflow-hidden rounded-card border border-border bg-card shadow-elevation">
        <img
          src={aboutData.imageUri}
          alt={`${orgContent.navbar.orgName} community support`}
          className="h-72 w-full object-cover md:h-80"
        />
      </div>

      <div className="rounded-card border border-border bg-secondary/30 p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Who we are
        </p>
        <p className="mt-4 text-lg leading-relaxed text-foreground">
          {aboutData.foundingNarrative.slice(0, 230)}...
        </p>

        <ul className="mt-6 space-y-3">
          {highlights.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-foreground/80">
              <span className="mt-0.5 flex size-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                <BadgeCheck className="size-3.5" aria-hidden />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to="/about">
              Learn more about us
              <ArrowRight className="ml-2 size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function AboutOverviewSection() {
  return (
    <section id="about-overview" className="bg-background py-16 sm:py-24">
      <div className={sectionShell}>
        <SectionHeader
          eyebrow="About"
          title="A local organization rooted in dignity and care"
          description="We meet immediate needs while building stable futures for children, families and elders across Ethiopia."
        />
        <AboutOverviewVariantOne />
      </div>
    </section>
  );
}

function ProgramsOverviewVariantOne() {
  const previews = orgContent.programs.programs.slice(0, 4);

  return (
    <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {previews.map((program) => (
        <article key={program.id} className="overflow-hidden rounded-card border border-border bg-card shadow-card transition-transform hover:-translate-y-1">
          <img src={program.imageUri} alt={program.title} className="h-48 w-full object-cover" />
          <div className="p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex rounded-badge bg-trust-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-trust-600">
                {program.categoryTag}
              </span>
              <MapPin className="size-4 text-muted-foreground" aria-hidden />
            </div>
            <h3 className="mt-4 text-xl font-bold text-foreground">{program.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{program.shortDescription}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function ProgramsOverviewSection() {
  return (
    <section id="programs-overview" className="bg-secondary/30 py-16 sm:py-24">
      <div className={sectionShell}>
        <SectionHeader
          eyebrow="Programs"
          title="Four pillars, one promise"
          description="Our work is designed to address urgent needs while creating steadier futures for children, elders and families."
        />
        <ProgramsOverviewVariantOne />
      </div>
    </section>
  );
}

function ImpactOverviewVariantOne() {
  const stats = orgContent.impact.stats.slice(0, 4);

  return (
    <div className="mt-12">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const safeValue = Number(stat?.metricValue ?? 0);

          return (
            <div key={stat.id} className="rounded-card border border-border bg-card p-5 shadow-card">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {getImpactStatTitle(stat?.label)}
              </div>
              <div className="mt-3 text-3xl font-black tracking-tight text-foreground">{stat.metricNumber}</div>
              <div className="mt-2 text-sm font-medium text-muted-foreground">{stat.description}</div>
              <div className="mt-4 h-2.5 rounded-full bg-secondary">
                <div
                  className="h-2.5 rounded-full bg-primary"
                  style={{ width: `${Math.min(100, 65 + safeValue / 200)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-card border border-border bg-gradient-to-r from-primary/10 via-secondary/40 to-background p-6 sm:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Why it matters
            </p>
            <p className="mt-2 max-w-xl text-base leading-relaxed text-foreground">
              Every program is designed around measurable outcomes, transparent reporting and long-term community resilience.
            </p>
          </div>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to="/impact">
              See our impact
              <ArrowRight className="ml-2 size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function ImpactOverviewSection() {
  return (
    <section id="impact-overview" className="bg-background py-16 sm:py-24">
      <div className={sectionShell}>
        <SectionHeader
          eyebrow="Impact"
          title="Visible change, measured with care"
          description="The numbers behind our work reflect the real-world support our teams and community partners provide every month."
        />
        <ImpactOverviewVariantOne />
      </div>
    </section>
  );
}

function GalleryOverviewVariantOne({ items }: { items: GalleryItem[] }) {
  const feature = items[0];
  const small = items.slice(1, 4);
  if (!feature) return null;

  return (
    <div className="mt-12 grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
      <div className="overflow-hidden rounded-card border border-border bg-card shadow-elevation">
        <img src={feature.mediaUri} alt={feature.title} className="h-full min-h-[300px] w-full object-cover" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
        {small.map((item) => (
          <div key={item.id} className="overflow-hidden rounded-card border border-border bg-card">
            <img src={item.mediaUri} alt={item.title} className="h-32 w-full object-cover" />
            <div className="p-3">
              <p className="text-sm font-semibold text-foreground">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GalleryOverviewSection() {
  const { items, isLoading } = usePublicGalleryItems(4);

  return (
    <section id="gallery-overview" className="bg-secondary/30 py-16 sm:py-24">
      <div className={sectionShell}>
        <SectionHeader
          eyebrow="Gallery"
          title="Moments from the field"
          description="A quick glimpse into the people, places and projects that shape our work every day."
        />
        {isLoading ? (
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-52 animate-pulse rounded-card bg-muted" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <p className="mt-12 text-center text-sm text-muted-foreground">
            No photos have been published yet — check back soon.
          </p>
        ) : (
          <GalleryOverviewVariantOne items={items} />
        )}
        <div className="mt-8 flex justify-center">
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to="/gallery">
              View gallery
              <ArrowRight className="ml-2 size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function DonationOverviewVariantOne() {
  return (
    <div className="mt-12 rounded-card border border-primary/20 bg-gradient-to-r from-primary/15 via-brand/10 to-background p-6 sm:p-8 lg:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Support this work</p>
          <h3 className="mt-3 text-3xl font-bold tracking-tight text-foreground">
            A single contribution can fund a safe night, a meal, a scholarship or a clinic visit.
          </h3>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Your support helps us protect children, feed families and keep essential care services active in the communities that need them most.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to="/donate">
              Donate now
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/volunteer">Become a volunteer</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function DonationOverviewSection() {
  return (
    <section id="donation-overview" className="bg-background py-16 sm:py-24">
      <div className={sectionShell}>
        <SectionHeader
          eyebrow="Get involved"
          title="Support the next round of care"
          description="Your involvement helps us sustain shelter, food, education and healthcare services in the communities we serve."
        />
        <DonationOverviewVariantOne />
      </div>
    </section>
  );
}

export function HomeOverviewSections() {
  return (
    <>
      <AboutOverviewSection />
      <ProgramsOverviewSection />
      <ImpactOverviewSection />
      <GalleryOverviewSection />
      <FeaturedEventsSection />
      <DonationOverviewSection />
    </>
  );
}

export default HomeOverviewSections;
