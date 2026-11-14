import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProgramDetailSections } from "@/components/sections/program-detail-sections";
import { getProgramBySlug, programDetailCopy, programsContent } from "@/content";
import { buildPageMetadata } from "@/lib/page-metadata";

export function generateStaticParams() {
  return programsContent.map((program) => ({ programSlug: program.slug }));
}

export async function generateMetadata({ params }: PageProps<"/programs/[programSlug]">): Promise<Metadata> {
  const program = getProgramBySlug((await params).programSlug);
  if (!program) return {};
  return buildPageMetadata({
    title: `${program.title} ${programDetailCopy.seoTitleSuffix}`,
    description: program.summary,
    path: `/programs/${program.slug}`,
  });
}

export default async function ProgramDetailPage({ params }: PageProps<"/programs/[programSlug]">) {
  const program = getProgramBySlug((await params).programSlug);
  if (!program) notFound();
  return <ProgramDetailSections program={program} />;
}
