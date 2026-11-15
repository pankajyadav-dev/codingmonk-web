import { readFileSync } from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import {
  aiApproachContent,
  collegeChallengesContent,
  collegesContent,
  engagementModelsContent,
  foundersContent,
  getPlacementsByPackage,
  processStepsContent,
  programsContent,
  recruitersContent,
  sampleReportContent,
  servicesContent,
  siteContent,
  statsContent,
  studentBenefitsContent,
  testimonialsContent,
  tracksContent,
} from "@/content";
import {
  brandMarkViewBox,
  leftBracketPath,
  monkArmsPath,
  monkArmsStrokeWidth,
  monkCrossedLegsPath,
  monkHead,
  monkTorsoPath,
  rightBracketPath,
} from "@/lib/brand-geometry";
import { formatIndianNumber, formatPackageLpa } from "@/lib/format";

const outputPath = process.argv[2] ?? "CodingMonk-Brochure.pdf";
const websiteUrl = process.env.SITE_URL;
const linkedinUrl = siteContent.socialLinks.find((socialLink) => socialLink.label === "LinkedIn")?.url;

const escapeHtml = (text: string) =>
  text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const withAccents = (text: string) => escapeHtml(text).replace(/\*(.+?)\*/g, "<em>$1</em>");
const displayUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
const link = (url: string, label: string) => `<a href="${escapeHtml(url)}">${escapeHtml(label)}</a>`;
const whatsappUrl = `https://wa.me/${siteContent.contact.whatsappNumber}`;
const imageAsDataUri = (publicPath: string) =>
  `data:image/jpeg;base64,${readFileSync(path.join("public", publicPath)).toString("base64")}`;

const brandMark = (size: number, bracketColor: string) => `
<svg width="${size}" height="${size}" viewBox="${brandMarkViewBox}" aria-hidden="true">
  <path d="${leftBracketPath}" fill="none" stroke="${bracketColor}" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="${rightBracketPath}" fill="none" stroke="${bracketColor}" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="${monkArmsPath}" fill="none" stroke="var(--brand)" stroke-width="${monkArmsStrokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="${monkCrossedLegsPath}" fill="var(--brand)"/>
  <circle cx="${monkHead.cx}" cy="${monkHead.cy}" r="${monkHead.r}" fill="var(--brand)"/>
  <path d="${monkTorsoPath}" fill="var(--brand)"/>
</svg>`;

const wordmark = (isOnPanel: boolean) =>
  `<span class="wordmark ${isOnPanel ? "on-panel" : ""}">${escapeHtml(siteContent.wordmark.lead)}<b>${escapeHtml(siteContent.wordmark.accent)}</b></span>`;

const pageFooter = (pageNumber: number) => `
<footer class="page-footer">
  <span>${brandMark(16, "var(--ink)")} ${escapeHtml(siteContent.name)} · Placement training for engineering colleges</span>
  <span>${websiteUrl ? `${link(websiteUrl, displayUrl(websiteUrl))} · ` : ""}${pageNumber}</span>
</footer>`;

const sectionHeading = (eyebrow: string, heading: string, description?: string) => `
<header class="section-heading">
  <p class="eyebrow">${escapeHtml(eyebrow)}</p>
  <h2>${withAccents(heading)}</h2>
  ${description ? `<p class="intro">${escapeHtml(description)}</p>` : ""}
</header>`;

const statTiles = statsContent
  .map(
    (stat) => `
<div class="stat">
  <p class="stat-value">${formatIndianNumber(stat.value)}<span>${escapeHtml(stat.suffix)}</span></p>
  <p class="stat-label">${escapeHtml(stat.label)}</p>
</div>`,
  )
  .join("");

const coverPage = `
<section class="page cover">
  <div class="cover-glow"></div>
  <div class="cover-brand">${brandMark(52, "var(--panel-ink)")}${wordmark(true)}</div>
  <div class="cover-body">
    <p class="eyebrow">Placement training partner for engineering colleges</p>
    <h1>Train your batch with <em>focus.</em><br/>Get them <em>placed.</em></h1>
    <p class="cover-intro">Campus recruitment training for final and pre-final year engineering students, delivered on your campus as a 2-month sprint or a 6-month program that ends in offer letters.</p>
  </div>
  <div class="cover-stats">${statTiles}</div>
  <div class="cover-colleges">
    <p class="eyebrow">Partner colleges</p>
    <p>${collegesContent.map((college) => escapeHtml(college.name)).join("<i>·</i>")}</p>
  </div>
  <div class="cover-offers">
    <p class="eyebrow">Top offers</p>
    <div>
      ${getPlacementsByPackage()
        .slice(0, 3)
        .map(
          (placement) => `
      <p><strong>${formatPackageLpa(placement.packageLpa)}</strong><span>${escapeHtml(placement.studentName)} · ${escapeHtml(placement.companyName)}</span></p>`,
        )
        .join("")}
    </div>
  </div>
  <div class="cover-contact">
    <div><p class="eyebrow">Call or WhatsApp</p><p class="contact-value">${link(whatsappUrl, siteContent.contact.phoneDisplay)}</p></div>
    <div><p class="eyebrow">Email</p><p class="contact-value">${link(`mailto:${siteContent.contact.email}`, siteContent.contact.email)}</p></div>
    ${websiteUrl ? `<div><p class="eyebrow">Website</p><p class="contact-value">${link(websiteUrl, displayUrl(websiteUrl))}</p></div>` : ""}
    ${linkedinUrl ? `<div><p class="eyebrow">LinkedIn</p><p class="contact-value">${link(linkedinUrl, displayUrl(linkedinUrl))}</p></div>` : ""}
  </div>
</section>`;

const challengesAndServicesPage = `
<section class="page">
  ${sectionHeading("Why colleges struggle", "What gets in the way of *placements*")}
  <div class="grid two">
    ${collegeChallengesContent
      .map(
        (challenge, challengeIndex) => `
    <article class="card">
      <p class="card-number">0${challengeIndex + 1}</p>
      <h3>${escapeHtml(challenge.title)}</h3>
      <p>${escapeHtml(challenge.description)}</p>
    </article>`,
      )
      .join("")}
  </div>
  ${sectionHeading("What we deliver", "Everything a placement cell needs, from *one partner*")}
  <div class="grid three">
    ${servicesContent
      .map(
        (service) => `
    <article class="card ${service.variant === "highlight" ? "card-brand" : ""}">
      <p class="card-label">${escapeHtml(service.label)}</p>
      <h3>${escapeHtml(service.title)}</h3>
      <p>${escapeHtml(service.description)}</p>
    </article>`,
      )
      .join("")}
  </div>
  ${sectionHeading("How it works", "From first call to *first report*")}
  <ol class="steps">
    ${processStepsContent
      .map(
        (step, stepIndex) => `
    <li>
      <p class="step-timing">Step ${stepIndex + 1} · ${escapeHtml(step.timingLabel)}</p>
      <h3>${escapeHtml(step.title)}</h3>
      <p>${escapeHtml(step.description)}</p>
    </li>`,
      )
      .join("")}
  </ol>
  ${pageFooter(2)}
</section>`;

const corePrograms = programsContent.filter((program) => program.kind === "core");
const addOnPrograms = programsContent.filter((program) => program.kind === "add-on");

const programCard = (program: (typeof programsContent)[number]) => `
<article class="program">
  <div class="program-head">
    <span class="badge">${escapeHtml(program.durationLabel)}</span>
    <h3>${escapeHtml(program.title)}</h3>
    <p>${escapeHtml(program.summary)}</p>
  </div>
  <dl class="facts">
    <div><dt>For</dt><dd>${escapeHtml(program.audienceLabel)} · ${escapeHtml(program.semesterLabel)}</dd></div>
    <div><dt>Hours</dt><dd>${program.totalHours} hours</dd></div>
    <div><dt>Delivery</dt><dd>${escapeHtml(program.deliveryMode)}</dd></div>
  </dl>
  <ol class="curriculum">
    ${program.curriculum
      .map(
        (curriculumItem) => `
    <li><span>${escapeHtml(curriculumItem.periodLabel)}</span><div><b>${escapeHtml(curriculumItem.title)}</b> ${escapeHtml(curriculumItem.description)}</div></li>`,
      )
      .join("")}
  </ol>
  <p class="program-foot"><b>Assessments:</b> ${escapeHtml(program.assessments)}</p>
  <p class="program-foot"><b>Outcome:</b> ${escapeHtml(program.outcome)}</p>
</article>`;

const programsPage = `
<section class="page">
  ${sectionHeading("Programs", "Two programs, one *goal:* placement", "Pre-final year students take the 6-month program. Final-year students join the 2-month sprint. Both end as the placement season opens.")}
  <div class="grid two programs">${corePrograms.map(programCard).join("")}</div>
  ${pageFooter(3)}
</section>`;

const reportStatusLabels = sampleReportContent.statusLabels;
const approachPage = `
<section class="page">
  ${sectionHeading("AI-first, fundamentals always", "Trained for how companies *hire now*", "Students use AI tools the way development teams do today, and prove they can still code without them.")}
  <div class="grid two">
    ${aiApproachContent.principles
      .map(
        (principle, principleIndex) => `
    <article class="card">
      <p class="card-number">0${principleIndex + 1}</p>
      <h3>${escapeHtml(principle.title)}</h3>
      <p>${escapeHtml(principle.description)}</p>
    </article>`,
      )
      .join("")}
  </div>
  ${sectionHeading("Company test patterns", "Prepared for both *company types*")}
  <div class="grid two">
    ${tracksContent
      .map(
        (track) => `
    <article class="card">
      <h3>${escapeHtml(track.title)}</h3>
      <p>${escapeHtml(track.description)}</p>
      <p class="tags">${track.companyTests.map((companyTest) => `<span>${escapeHtml(companyTest)}</span>`).join("")}</p>
    </article>`,
      )
      .join("")}
  </div>
  ${sectionHeading("Add-ons", "Short programs when you *need them*")}
  <div class="grid two">
    ${addOnPrograms
      .map(
        (program) => `
    <article class="card">
      <p class="card-label">${escapeHtml(program.durationLabel)} · ${program.totalHours} hours</p>
      <h3>${escapeHtml(program.title)}</h3>
      <p>${escapeHtml(program.summary)}</p>
    </article>`,
      )
      .join("")}
  </div>
  ${pageFooter(4)}
</section>`;

const resultsPage = `
<section class="page">
  ${sectionHeading("For the placement cell", "A weekly report for your *TPO*", "Attendance, contest scores and mock interviews for every student, shared every week. This is what one looks like.")}
  <div class="report">
    <p class="report-caption">${escapeHtml(sampleReportContent.caption)}</p>
    <table>
      <thead><tr>${sampleReportContent.columns.map((column) => `<th>${escapeHtml(column)}</th>`).join("")}</tr></thead>
      <tbody>
        ${sampleReportContent.rows
          .map(
            (row) => `
        <tr>
          <td>${escapeHtml(row.studentName)}</td><td>${row.attendancePercent}%</td><td>${row.contestScore}</td><td>${escapeHtml(row.mocksCompleted)}</td>
          <td class="${row.status === "ready" ? "status-ready" : "status-work"}">${escapeHtml(reportStatusLabels[row.status])}</td>
        </tr>`,
          )
          .join("")}
      </tbody>
    </table>
  </div>
  ${sectionHeading("Placements", "Real offers, *named*", "Recent offers from CodingMonk students, highest package first.")}
  <div class="placements">
    <div class="placements-head"><span>Placement record</span><span>Package (CTC)</span></div>
    <ul>
      ${getPlacementsByPackage()
        .map(
          (placement) => `
      <li><span><b>${escapeHtml(placement.studentName)}</b><i>Placed at ${escapeHtml(placement.companyName)}</i></span><strong>${formatPackageLpa(placement.packageLpa)}</strong></li>`,
        )
        .join("")}
    </ul>
  </div>
  <div class="recruiters">
    <p class="eyebrow">Companies hiring our students</p>
    <p class="tags">${recruitersContent.map((recruiter) => `<span>${escapeHtml(recruiter.name)}</span>`).join("")}</p>
  </div>
  ${pageFooter(5)}
</section>`;

const storiesPage = `
<section class="page">
  ${sectionHeading("Success stories", "Hear it from our *students*")}
  <div class="grid two quotes">
    ${testimonialsContent
      .map(
        (testimonial) => `
    <figure class="quote">
      <blockquote>“${escapeHtml(testimonial.quote)}”</blockquote>
      <figcaption><b>${escapeHtml(testimonial.studentName)}</b><span>Placed at ${escapeHtml(testimonial.companyName)} · ${formatPackageLpa(testimonial.packageLpa)}</span></figcaption>
    </figure>`,
      )
      .join("")}
  </div>
  ${sectionHeading("For students and parents", "What students *get*")}
  <div class="grid four">
    ${studentBenefitsContent
      .map(
        (benefit) => `
    <article class="card">
      <h3>${escapeHtml(benefit.title)}</h3>
      <p>${escapeHtml(benefit.description)}</p>
    </article>`,
      )
      .join("")}
  </div>
  ${pageFooter(6)}
</section>`;

const startPage = `
<section class="page">
  ${sectionHeading("Founders", "Meet the *founders*", "Every college demo is led by a founder. You talk directly to the people who run the training.")}
  <div class="grid two">
    ${foundersContent
      .map(
        (founder) => `
    <article class="founder">
      <img src="${imageAsDataUri(founder.photo.src)}" alt="${escapeHtml(founder.photo.alt)}"/>
      <div>
        <p class="card-label">${escapeHtml(founder.role)} · ${escapeHtml(founder.badgeLabel)}</p>
        <h3>${escapeHtml(founder.name)}</h3>
        <p>${escapeHtml(founder.shortBio)}</p>
      </div>
    </article>`,
      )
      .join("")}
  </div>
  ${sectionHeading("Getting started", "How colleges *start* with us", "No fixed price list. Every plan is built around your batch sizes and placement calendar.")}
  <div class="grid three">
    ${engagementModelsContent
      .map(
        (engagementModel) => `
    <article class="card ${engagementModel.isHighlighted ? "card-brand" : ""}">
      <p class="card-label">${escapeHtml(engagementModel.badgeLabel)}</p>
      <h3>${escapeHtml(engagementModel.title)}</h3>
      <p>${escapeHtml(engagementModel.description)}</p>
      <ul class="checks">${engagementModel.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
    </article>`,
      )
      .join("")}
  </div>
  <div class="cta">
    <div>
      <p class="eyebrow">Get started</p>
      <h2>Start with one <em>pilot batch.</em></h2>
      <p>A 30-minute call with a founder, then a free skill check and trainer demo on your campus.</p>
    </div>
    <dl>
      <div><dt>Call or WhatsApp</dt><dd>${link(whatsappUrl, siteContent.contact.phoneDisplay)}</dd></div>
      <div><dt>Email</dt><dd>${link(`mailto:${siteContent.contact.email}`, siteContent.contact.email)}</dd></div>
      ${websiteUrl ? `<div><dt>Book a campus demo</dt><dd>${link(`${websiteUrl}/book-demo`, `${displayUrl(websiteUrl)}/book-demo`)}</dd></div>` : ""}
      ${linkedinUrl ? `<div><dt>LinkedIn</dt><dd>${link(linkedinUrl, displayUrl(linkedinUrl))}</dd></div>` : ""}
      <div><dt>Free courses on YouTube</dt><dd>${link(siteContent.youtubeChannel.url, displayUrl(siteContent.youtubeChannel.url))}</dd></div>
    </dl>
  </div>
  ${pageFooter(7)}
</section>`;

const styles = `
:root {
  --background: #ffffff; --surface: #fff7ee; --surface-raised: #fbeedd; --ink: #1f1b16; --muted: #655d54;
  --line: #efe0cc; --brand: #e8780c; --brand-strong: #a34e00; --accent-text: #c55f00; --on-brand: #1a0e00;
  --panel: #1b1712; --panel-ink: #f3e9dc; --panel-muted: #a89a88; --panel-line: #2e2821; --panel-success: #9cd67e;
  --panel-warning: #ffb45e; --success: #276b43;
}
@page { size: A4; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: "Noto Sans", sans-serif; color: var(--ink); font-size: 9.6pt; line-height: 1.5; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
h1, h2, h3, .wordmark, .stat-value, .badge, .placements strong { font-family: "Sora", sans-serif; }
em { font-family: "Instrument Serif", serif; font-style: italic; font-weight: 400; color: var(--accent-text); letter-spacing: -0.01em; }
.page { position: relative; width: 210mm; height: 297mm; padding: 14mm 16mm 22mm; overflow: hidden; page-break-after: always; background: var(--background); }
.page:last-child { page-break-after: auto; }
.eyebrow { font-size: 7.6pt; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--brand-strong); }
.section-heading { margin: 6mm 0 3.5mm; }
.section-heading:first-child { margin-top: 0; }
.section-heading h2 { font-size: 18.5pt; line-height: 1.12; letter-spacing: -0.02em; margin-top: 1.5mm; }
.section-heading em { font-size: 1.12em; }
.intro { color: var(--muted); font-size: 10pt; margin-top: 2mm; max-width: 150mm; }
.grid { display: grid; gap: 3.5mm; }
.grid.two { grid-template-columns: 1fr 1fr; }
.grid.three { grid-template-columns: 1fr 1fr 1fr; }
.grid.four { grid-template-columns: repeat(4, 1fr); }
.card { border: 1px solid var(--line); border-radius: 3mm; padding: 4mm; background: var(--background); break-inside: avoid; }
.card h3 { font-size: 11pt; line-height: 1.25; margin-bottom: 1mm; }
.card p { color: var(--muted); }
.card-brand { background: var(--surface); border-color: var(--brand); }
.card-number { font-family: "Sora", sans-serif; font-weight: 800; color: var(--brand); font-size: 9pt; margin-bottom: 1mm; }
.card-label { font-size: 7.6pt; font-weight: 700; color: var(--brand-strong); margin-bottom: 1mm; text-transform: uppercase; letter-spacing: 0.06em; }
.steps { list-style: none; display: grid; grid-template-columns: repeat(4, 1fr); gap: 3mm; }
.steps li { border-top: 2.5px solid var(--brand); padding-top: 3mm; }
.steps h3 { font-size: 10.5pt; margin: 1mm 0; }
.steps p { color: var(--muted); font-size: 8.8pt; }
.steps .step-timing { color: var(--brand-strong); font-weight: 700; font-size: 7.6pt; text-transform: uppercase; letter-spacing: 0.06em; }
.tags { display: flex; flex-wrap: wrap; gap: 1.5mm; margin-top: 2.5mm; }
.tags span { border: 1px solid var(--line); background: var(--surface); border-radius: 1.5mm; padding: 0.8mm 2.2mm; font-size: 8pt; font-weight: 600; color: var(--ink); }
.page-footer { position: absolute; left: 16mm; right: 16mm; bottom: 9mm; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--line); padding-top: 3mm; font-size: 7.6pt; color: var(--muted); }
.page-footer span { display: inline-flex; align-items: center; gap: 1.5mm; }
.wordmark { font-weight: 800; font-size: 22pt; letter-spacing: -0.02em; color: var(--ink); }
.wordmark b { color: var(--brand); font-weight: 800; }
.wordmark.on-panel { color: var(--panel-ink); }

.cover { background: var(--panel); color: var(--panel-ink); padding: 18mm 18mm; display: flex; flex-direction: column; }
.cover-glow { position: absolute; top: -60mm; right: -60mm; width: 200mm; height: 200mm; border-radius: 50%; background: radial-gradient(closest-side, rgb(232 120 12 / 0.28), transparent); }
.cover-brand { position: relative; display: flex; align-items: center; gap: 3mm; }
.cover-body { position: relative; margin-top: 30mm; }
.cover .eyebrow { color: var(--panel-muted); }
.cover h1 { font-size: 35pt; line-height: 1.05; letter-spacing: -0.03em; margin-top: 4mm; color: var(--panel-ink); }
.cover h1 em { color: var(--brand); font-size: 1.12em; }
.cover-intro { font-size: 12pt; color: var(--panel-muted); margin-top: 6mm; max-width: 140mm; }
.cover-stats { position: relative; display: grid; grid-template-columns: repeat(4, 1fr); gap: 3mm; margin-top: 16mm; }
.stat { border: 1px solid var(--panel-line); border-radius: 3mm; padding: 4mm; background: rgb(255 255 255 / 0.03); }
.stat-value { font-size: 24pt; font-weight: 800; letter-spacing: -0.03em; line-height: 1; color: var(--panel-ink); }
.stat-value span { font-size: 0.5em; color: var(--brand); margin-left: 0.5mm; }
.stat-label { color: var(--panel-muted); margin-top: 2mm; font-size: 8.6pt; }
.cover-colleges { position: relative; margin-top: 10mm; }
.cover-colleges p:last-child { font-size: 10.5pt; margin-top: 2mm; color: var(--panel-ink); font-weight: 600; }
.cover-colleges i { color: var(--brand); margin: 0 2.5mm; font-style: normal; }
.cover-offers { position: relative; margin-top: 10mm; }
.cover-offers div { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3mm; margin-top: 2.5mm; }
.cover-offers p:not(.eyebrow) { border-left: 2.5px solid var(--brand); padding: 1mm 0 1mm 3.5mm; }
.cover-offers strong { display: block; font-family: "Sora", sans-serif; font-size: 17pt; font-weight: 800; color: var(--brand); letter-spacing: -0.02em; }
.cover-offers span { color: var(--panel-muted); font-size: 8.8pt; }
.cover-contact { position: relative; margin-top: auto; display: flex; justify-content: space-between; gap: 6mm; border-top: 1px solid var(--panel-line); padding-top: 6mm; }
.contact-value { font-family: "Sora", sans-serif; font-weight: 700; font-size: 11.5pt; white-space: nowrap; margin-top: 1mm; color: var(--panel-ink); }

.programs { align-items: stretch; }
.program { border: 1px solid var(--line); border-radius: 3mm; overflow: hidden; display: flex; flex-direction: column; }
.program-head { background: var(--panel); color: var(--panel-ink); padding: 5mm; }
.program-head h3 { font-size: 13pt; margin: 2mm 0 1.5mm; }
.program-head p { color: var(--panel-muted); font-size: 8.8pt; }
.badge { display: inline-block; background: var(--brand); color: var(--on-brand); font-weight: 700; font-size: 7.6pt; border-radius: 1.5mm; padding: 0.6mm 2.2mm; }
.facts { padding: 3.5mm 5mm; border-bottom: 1px solid var(--line); display: grid; gap: 1.2mm; background: var(--surface); }
.facts div { display: grid; grid-template-columns: 17mm 1fr; }
.facts dt { font-weight: 700; color: var(--brand-strong); font-size: 8pt; }
.facts dd { font-size: 8.6pt; }
.curriculum { list-style: none; padding: 3mm 5mm; display: grid; gap: 2mm; }
.curriculum li { display: grid; grid-template-columns: 17mm 1fr; font-size: 8.5pt; color: var(--muted); line-height: 1.4; }
.curriculum li span { font-weight: 700; color: var(--brand-strong); font-size: 8pt; }
.curriculum b { color: var(--ink); display: block; }
.program-foot { padding: 0 5mm 2.5mm; font-size: 8.4pt; color: var(--muted); }
.program-foot:last-child { margin-top: auto; padding-bottom: 4.5mm; }
.program-foot b { color: var(--ink); }

.report { background: var(--panel); color: var(--panel-ink); border-radius: 3mm; padding: 4mm 5mm; }
.report-caption { font-size: 8pt; color: var(--panel-muted); margin-bottom: 2mm; font-weight: 600; }
.report table { width: 100%; border-collapse: collapse; font-size: 8.8pt; }
.report th { text-align: left; font-size: 7.4pt; letter-spacing: 0.06em; text-transform: uppercase; color: var(--panel-muted); padding: 1.6mm 0; font-weight: 600; }
.report td { border-top: 1px solid var(--panel-line); padding: 2mm 0; }
.status-ready { color: var(--panel-success); font-weight: 700; }
.status-work { color: var(--panel-warning); font-weight: 700; }

.placements { background: var(--panel); color: var(--panel-ink); border-radius: 3mm; overflow: hidden; }
.placements-head { display: flex; justify-content: space-between; padding: 3.5mm 5mm; border-bottom: 1px solid var(--panel-line); font-weight: 700; font-family: "Sora", sans-serif; font-size: 9.5pt; }
.placements-head span:last-child { color: var(--panel-success); font-family: "Noto Sans", sans-serif; font-size: 8pt; }
.placements ul { list-style: none; display: grid; grid-template-columns: 1fr 1fr; }
.placements li { display: flex; justify-content: space-between; align-items: center; padding: 3.2mm 5mm; border-bottom: 1px dashed var(--panel-line); }
.placements li:nth-child(odd) { border-right: 1px dashed var(--panel-line); }
.placements li b { display: block; font-size: 10pt; }
.placements li i { font-style: normal; color: var(--panel-muted); font-size: 8.6pt; }
.placements strong { color: var(--brand); font-size: 13pt; font-weight: 800; white-space: nowrap; }
.recruiters { margin-top: 7mm; }
.recruiters .tags span { font-size: 9pt; padding: 1.2mm 3mm; }

.quotes { gap: 4mm; }
.quotes .quote:last-child:nth-child(odd) { grid-column: 1 / -1; }
.quote { border: 1px solid var(--line); border-radius: 3mm; padding: 4.5mm; display: flex; flex-direction: column; justify-content: space-between; gap: 4mm; break-inside: avoid; }
.quote blockquote { font-family: "Instrument Serif", serif; font-style: italic; font-size: 12.5pt; line-height: 1.35; color: var(--ink); }
.quote figcaption b { display: block; font-size: 10pt; }
.quote figcaption span { color: var(--muted); font-size: 8.6pt; }

.founder { display: grid; grid-template-columns: 34mm 1fr; gap: 4mm; border: 1px solid var(--line); border-radius: 3mm; padding: 3.5mm; align-items: start; }
.founder img { width: 34mm; height: 42.5mm; object-fit: cover; border-radius: 2mm; }
.founder h3 { font-size: 13pt; margin-bottom: 1.5mm; }
.founder p { color: var(--muted); font-size: 8.8pt; }
.founder .card-label { margin-bottom: 1mm; }
.checks { list-style: none; margin-top: 2.5mm; display: grid; gap: 1mm; font-size: 8.6pt; }
.checks li::before { content: "✓"; color: var(--success); font-weight: 700; margin-right: 1.5mm; }
.cta { margin-top: 7mm; background: var(--panel); color: var(--panel-ink); border-radius: 4mm; padding: 7mm; display: grid; grid-template-columns: 1fr 1.05fr; gap: 6mm; align-items: center; }
.cta .eyebrow { color: var(--panel-muted); }
.cta h2 { font-size: 17pt; margin: 1.5mm 0 2mm; letter-spacing: -0.02em; }
.cta h2 em { color: var(--brand); white-space: nowrap; }
.cta p { color: var(--panel-muted); }
.cta dl { display: grid; gap: 2.5mm; }
.cta dt { font-size: 7.4pt; text-transform: uppercase; letter-spacing: 0.08em; color: var(--panel-muted); font-weight: 700; }
.cta dd { font-family: "Sora", sans-serif; font-weight: 700; font-size: 9.6pt; white-space: nowrap; }
a { color: inherit; text-decoration: none; }
`;

const html = `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8"/>
<title>${escapeHtml(siteContent.name)} · Placement training for engineering colleges</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&family=Noto+Sans:wght@400;600;700&family=Sora:wght@600;700;800&display=block" rel="stylesheet"/>
<style>${styles}</style>
</head>
<body>
${coverPage}
${challengesAndServicesPage}
${programsPage}
${approachPage}
${resultsPage}
${storiesPage}
${startPage}
</body>
</html>`;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(html, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: outputPath, format: "A4", printBackground: true, preferCSSPageSize: true });
if (process.env.BROCHURE_HTML) await Bun.write(process.env.BROCHURE_HTML, html);
await browser.close();
console.log(`Brochure written to ${outputPath}`);
