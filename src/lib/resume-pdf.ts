import { jsPDF } from "jspdf";

export interface ResumeExperienceEntry {
  title: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface ResumeEducationEntry {
  degree: string;
  school: string;
  period: string;
  detail?: string;
}

export interface ResumeHighlight {
  value: string;
  label: string;
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
    summary: string;
    experience: string;
    education: string;
    skills: string;
    certifications: string;
    writing: string;
  };
  summary: string;
  highlights: ResumeHighlight[];
  experience: ResumeExperienceEntry[];
  education: ResumeEducationEntry[];
  skills: ResumeSkillGroup[];
  certifications: ResumeCertificationEntry[];
  writing: string;
}

const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN = 16;
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
    lineHeight = 4.8
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

  // Bullets hang: the marker sits in the margin gutter and wrapped lines align
  // to the text column rather than back under the dot.
  const addBullet = (text: string, fontSize = 10, lineHeight = 4.6) => {
    const indent = 4;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(fontSize);
    doc.setTextColor(INK.secondary[0], INK.secondary[1], INK.secondary[2]);
    const lines = doc.splitTextToSize(text, CONTENT_WIDTH - indent) as string[];
    lines.forEach((line, index) => {
      ensureSpace(lineHeight);
      if (index === 0) {
        doc.text("•", MARGIN, y);
      }
      doc.text(line, MARGIN + indent, y);
      y += lineHeight;
    });
  };

  // Sections own the space above their own heading, so the rhythm stays even no
  // matter what the preceding block left behind. `followingBlock` keeps the rule
  // from being stranded at the foot of a page: the title only lands here if its
  // first chunk of content fits beneath it.
  const addSectionTitle = (title: string, followingBlock = 12) => {
    if (y > MARGIN) {
      y += 5;
    }
    ensureSpace(12 + followingBlock);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(INK.primary[0], INK.primary[1], INK.primary[2]);
    doc.text(title.toUpperCase(), MARGIN, y);
    y += 2;
    doc.setDrawColor(210, 210, 210);
    doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
    y += 6.5;
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
  y += 6.5;

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

  y += 2.5;
  doc.setDrawColor(190, 190, 190);
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
  // The first section heading adds its own lead-in, so only a hairline is needed
  // here or the rule ends up floating in the middle of a large gap.
  y += 2;

  // Profile summary
  if (data.summary) {
    addSectionTitle(data.labels.summary);
    addWrappedText(data.summary, 10, INK.secondary);
    y += 5;
  }

  // Highlights, laid out as an evenly divided single row of figures.
  if (data.highlights.length) {
    const columnWidth = CONTENT_WIDTH / data.highlights.length;
    // Reserve the tallest label so a wrapped label never collides with the
    // section that follows.
    const labelLineCount = Math.max(
      ...data.highlights.map(
        (h) => (doc.splitTextToSize(h.label, columnWidth - 4) as string[]).length
      )
    );
    ensureSpace(9 + labelLineCount * 3.6 + 4);

    const rowTop = y;
    data.highlights.forEach((highlight, idx) => {
      const centre = MARGIN + columnWidth * idx + columnWidth / 2;
      y = rowTop;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(15);
      doc.setTextColor(INK.primary[0], INK.primary[1], INK.primary[2]);
      doc.text(highlight.value, centre, y, { align: "center" });
      y += 5.5;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(INK.muted[0], INK.muted[1], INK.muted[2]);
      const labelLines = doc.splitTextToSize(
        highlight.label,
        columnWidth - 4
      ) as string[];
      for (const line of labelLines) {
        doc.text(line, centre, y, { align: "center" });
        y += 3.6;
      }
    });
    y = rowTop + 5.5 + labelLineCount * 3.6;
  }

  // Experience
  if (data.experience.length) {
    addSectionTitle(data.labels.experience);
    data.experience.forEach((job, idx) => {
      // Keep the heading block with at least its first bullet.
      ensureSpace(16);
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

      job.bullets.forEach((bullet) => addBullet(bullet));
      y += idx === data.experience.length - 1 ? 0 : 5;
    });
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
      y += 5.5;

      if (edu.detail) {
        addWrappedText(edu.detail, 10, INK.secondary);
      }
      y += idx === data.education.length - 1 ? 0 : 2.5;
    });
  }

  // Skills. The label sits inline and the items hang off it in their own column,
  // which packs far tighter than giving every group a full heading line.
  if (data.skills.length) {
    addSectionTitle(data.labels.skills);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    const labelColumn =
      Math.max(...data.skills.map((g) => doc.getTextWidth(`${g.label}  `))) + 1;

    data.skills.forEach((group, idx) => {
      const lines = doc.splitTextToSize(
        group.items.join("  •  "),
        CONTENT_WIDTH - labelColumn
      ) as string[];
      ensureSpace(lines.length * 4.5);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(INK.primary[0], INK.primary[1], INK.primary[2]);
      doc.text(group.label, MARGIN, y);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(INK.secondary[0], INK.secondary[1], INK.secondary[2]);
      lines.forEach((line, lineIndex) => {
        doc.text(line, MARGIN + labelColumn, y + lineIndex * 4.5);
      });

      y += lines.length * 4.5 + (idx === data.skills.length - 1 ? 0 : 2);
    });
  }

  // Certifications, in two columns so short entries don't burn a full page width.
  if (data.certifications.length) {
    addSectionTitle(data.labels.certifications);
    // Prefer three across when it divides evenly, so a trailing entry is never
    // left stranded on a near-empty row of its own.
    const columns = data.certifications.length % 3 === 0 ? 3 : 2;
    const columnWidth = CONTENT_WIDTH / columns;
    const rowCount = Math.ceil(data.certifications.length / columns);

    for (let row = 0; row < rowCount; row++) {
      const rowEntries = data.certifications.slice(
        row * columns,
        row * columns + columns
      );
      // Height is driven by whichever entry in the row wraps to more lines.
      const rowLineCount = Math.max(
        ...rowEntries.map(
          (cert) =>
            (doc.splitTextToSize(cert.name, columnWidth - 4) as string[]).length
        )
      );
      const rowHeight = rowLineCount * 4.6 + 5;
      ensureSpace(rowHeight);
      const rowTop = y;

      // Issuers share one baseline across the row, set by the tallest name, so a
      // wrapped title doesn't drag its own issuer out of line with its neighbours.
      const issuerBaseline = rowTop + rowLineCount * 4.6;

      rowEntries.forEach((cert, column) => {
        const x = MARGIN + columnWidth * column;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(INK.primary[0], INK.primary[1], INK.primary[2]);
        const nameLines = doc.splitTextToSize(
          cert.name,
          columnWidth - 4
        ) as string[];
        nameLines.forEach((line, lineIndex) => {
          doc.text(line, x, rowTop + lineIndex * 4.6);
        });

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(INK.muted[0], INK.muted[1], INK.muted[2]);
        doc.text(`${cert.issuer} • ${cert.year}`, x, issuerBaseline);
      });

      y = rowTop + rowHeight;
    }
  }

  // Writing & community
  if (data.writing) {
    addSectionTitle(data.labels.writing, 16);
    addWrappedText(data.writing, 10, INK.secondary);
  }

  return Buffer.from(doc.output("arraybuffer"));
}
