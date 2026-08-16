import { jsPDF } from "jspdf";

export interface ResumeExperienceEntry {
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface ResumeEducationEntry {
  degree: string;
  school: string;
  period: string;
}

export interface ResumeSkillGroup {
  label: string;
  items: string[];
}

export interface ResumeCertificationEntry {
  name: string;
  issuer: string;
  year: string;
}

export interface ResumePdfData {
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  labels: {
    experience: string;
    education: string;
    skills: string;
    certifications: string;
  };
  experience: ResumeExperienceEntry[];
  education: ResumeEducationEntry[];
  skills: ResumeSkillGroup[];
  certifications: ResumeCertificationEntry[];
}

const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN = 18;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

const INK = { primary: [26, 26, 26], secondary: [70, 70, 70], muted: [120, 120, 120] };

export function generateResumePdf(data: ResumePdfData): Buffer {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = MARGIN;

  const ensureSpace = (needed: number) => {
    if (y + needed > PAGE_HEIGHT - MARGIN) {
      doc.addPage();
      y = MARGIN;
    }
  };

  const addWrappedText = (
    text: string,
    fontSize: number,
    color: number[],
    lineHeight = 5
  ) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(fontSize);
    doc.setTextColor(color[0], color[1], color[2]);
    const lines = doc.splitTextToSize(text, CONTENT_WIDTH) as string[];
    for (const line of lines) {
      ensureSpace(lineHeight);
      doc.text(line, MARGIN, y);
      y += lineHeight;
    }
  };

  const addSectionTitle = (title: string) => {
    ensureSpace(14);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(INK.primary[0], INK.primary[1], INK.primary[2]);
    doc.text(title.toUpperCase(), MARGIN, y);
    y += 2;
    doc.setDrawColor(210, 210, 210);
    doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
    y += 7;
  };

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(INK.primary[0], INK.primary[1], INK.primary[2]);
  doc.text(data.name, MARGIN, y);
  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(INK.secondary[0], INK.secondary[1], INK.secondary[2]);
  doc.text(data.role, MARGIN, y);
  y += 7;

  doc.setFontSize(9.5);
  doc.setTextColor(INK.muted[0], INK.muted[1], INK.muted[2]);
  const contactLine = [data.email, data.phone, data.location]
    .filter(Boolean)
    .join("   |   ");
  doc.text(contactLine, MARGIN, y);
  y += 5;

  const linksLine = [data.linkedin, data.github].filter(Boolean).join("   |   ");
  if (linksLine) {
    doc.text(linksLine, MARGIN, y);
    y += 4;
  }

  y += 3;
  doc.setDrawColor(190, 190, 190);
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
  y += 9;

  // Experience
  if (data.experience.length) {
    addSectionTitle(data.labels.experience);
    data.experience.forEach((job, idx) => {
      ensureSpace(11);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11.5);
      doc.setTextColor(INK.primary[0], INK.primary[1], INK.primary[2]);
      doc.text(job.title, MARGIN, y);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(INK.muted[0], INK.muted[1], INK.muted[2]);
      doc.text(job.period, PAGE_WIDTH - MARGIN, y, { align: "right" });
      y += 5.5;

      doc.setFont("helvetica", "italic");
      doc.setFontSize(10.5);
      doc.setTextColor(INK.secondary[0], INK.secondary[1], INK.secondary[2]);
      doc.text(job.company, MARGIN, y);
      y += 5.5;

      addWrappedText(job.description, 10, INK.secondary);
      y += idx === data.experience.length - 1 ? 3 : 7;
    });
    y += 2;
  }

  // Education
  if (data.education.length) {
    addSectionTitle(data.labels.education);
    data.education.forEach((edu, idx) => {
      ensureSpace(11);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11.5);
      doc.setTextColor(INK.primary[0], INK.primary[1], INK.primary[2]);
      doc.text(edu.degree, MARGIN, y);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(INK.muted[0], INK.muted[1], INK.muted[2]);
      doc.text(edu.period, PAGE_WIDTH - MARGIN, y, { align: "right" });
      y += 5.5;

      doc.setFont("helvetica", "italic");
      doc.setFontSize(10.5);
      doc.setTextColor(INK.secondary[0], INK.secondary[1], INK.secondary[2]);
      doc.text(edu.school, MARGIN, y);
      y += idx === data.education.length - 1 ? 9 : 8;
    });
  }

  // Skills
  if (data.skills.length) {
    addSectionTitle(data.labels.skills);
    data.skills.forEach((group, idx) => {
      ensureSpace(10);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.5);
      doc.setTextColor(INK.primary[0], INK.primary[1], INK.primary[2]);
      doc.text(group.label, MARGIN, y);
      y += 5.5;

      addWrappedText(group.items.join("  •  "), 10, INK.secondary);
      y += idx === data.skills.length - 1 ? 5 : 4;
    });
  }

  // Certifications
  if (data.certifications.length) {
    addSectionTitle(data.labels.certifications);
    data.certifications.forEach((cert) => {
      ensureSpace(9);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.5);
      doc.setTextColor(INK.primary[0], INK.primary[1], INK.primary[2]);
      doc.text(cert.name, MARGIN, y);
      y += 5;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(INK.muted[0], INK.muted[1], INK.muted[2]);
      doc.text(`${cert.issuer} • ${cert.year}`, MARGIN, y);
      y += 6.5;
    });
  }

  return Buffer.from(doc.output("arraybuffer"));
}
