import { NextRequest, NextResponse } from "next/server";
import { usingTranslation } from "@/app/i18n";
import { languages, fallbackLng } from "@/app/i18n/settings";
import { generateResumePdf, type ResumePdfData } from "@/lib/resume-pdf";

const CONTACT = {
  linkedin: "linkedin.com/in/mustofa-ghaleb-amami",
  github: "github.com/cakasuma",
};

const SKILL_ITEMS = {
  frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3"],
  backend: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs", "GraphQL"],
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
      experience: tResume("experience.title") || "Work Experience",
      education: tResume("education.title") || "Education",
      skills: tResume("skills.title") || "Skills",
      certifications: tResume("certifications.title") || "Certifications & Achievements",
    },
    experience: ["job1", "job2", "job3", "job4", "job5", "job6"].map((key) => ({
      title: tResume(`experience.${key}.title`),
      company: tResume(`experience.${key}.company`),
      period: tResume(`experience.${key}.period`),
      description: tResume(`experience.${key}.description`),
    })),
    education: [
      {
        degree: tResume("education.degree"),
        school: tResume("education.school"),
        period: tResume("education.period"),
      },
    ],
    skills: [
      {
        label: tResume("skills.frontend") || "Frontend Development",
        items: SKILL_ITEMS.frontend,
      },
      {
        label: tResume("skills.backend") || "Backend Development",
        items: SKILL_ITEMS.backend,
      },
    ],
    certifications: ["cert1", "cert2", "cert3"].map((key) => ({
      name: tResume(`certifications.${key}.name`),
      issuer: tResume(`certifications.${key}.issuer`),
      year: tResume(`certifications.${key}.year`),
    })),
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
