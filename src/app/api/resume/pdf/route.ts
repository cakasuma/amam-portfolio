import { NextRequest, NextResponse } from "next/server";
import { usingTranslation } from "@/app/i18n";
import { languages, fallbackLng } from "@/app/i18n/settings";
import { generateResumePdf, type ResumePdfData } from "@/lib/resume-pdf";
import {
  EXPERIENCE_ENTRIES,
  HIGHLIGHT_KEYS,
  CERTIFICATION_KEYS,
  SKILL_GROUPS,
} from "@/lib/resume-data";

const CONTACT = {
  linkedin: "linkedin.com/in/mustofa-ghaleb-amami",
  github: "github.com/cakasuma",
};

export async function GET(request: NextRequest) {
  const requestedLng = request.nextUrl.searchParams.get("lng") ?? fallbackLng;
  const lng = languages.includes(requestedLng) ? requestedLng : fallbackLng;

  const [{ t: tResume }, { t: tCommon }] = await Promise.all([
    usingTranslation(lng, "resume"),
    usingTranslation(lng, "translation"),
  ]);

  const data: ResumePdfData = {
    name: tCommon("name") || "Mustofa Ghaleb Amami",
    role: tCommon("role") || "Tech Lead Fullstack & Software Engineering Instructor",
    email: tCommon("email") || "amammustofa@gmail.com",
    phone: tCommon("phone") || "+60 10-844 4970",
    location: tCommon("location") || "Kuala Lumpur, Malaysia",
    linkedin: CONTACT.linkedin,
    github: CONTACT.github,
    labels: {
      summary: tResume("summary.title") || "Profile",
      experience: tResume("experience.title") || "Work Experience",
      education: tResume("education.title") || "Education",
      skills: tResume("skills.title") || "Technical Skills",
      certifications: tResume("certifications.title") || "Certifications & Achievements",
      writing: tResume("writing.title") || "Writing & Community",
    },
    summary: tResume("summary.content"),
    highlights: HIGHLIGHT_KEYS.map((key) => ({
      value: tResume(`highlights.${key}.value`),
      label: tResume(`highlights.${key}.label`),
    })),
    experience: EXPERIENCE_ENTRIES.map(({ key }) => ({
      title: tResume(`experience.${key}.title`),
      company: tResume(`experience.${key}.company`),
      period: tResume(`experience.${key}.period`),
      bullets: tResume(`experience.${key}.bullets`, {
        returnObjects: true,
      }) as unknown as string[],
    })),
    education: [
      {
        degree: tResume("education.degree"),
        school: tResume("education.school"),
        period: tResume("education.period"),
        detail: tResume("education.detail"),
      },
    ],
    skills: SKILL_GROUPS.map((group) => ({
      label: tResume(group.labelKey),
      items: group.items,
    })),
    certifications: CERTIFICATION_KEYS.map((key) => ({
      name: tResume(`certifications.${key}.name`),
      issuer: tResume(`certifications.${key}.issuer`),
      year: tResume(`certifications.${key}.year`),
    })),
    writing: tResume("writing.content"),
  };

  const pdfBuffer = generateResumePdf(data);
  const fileName = `${data.name.replace(/\s+/g, "-")}-Resume-${lng}.pdf`;

  return new NextResponse(new Uint8Array(pdfBuffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
