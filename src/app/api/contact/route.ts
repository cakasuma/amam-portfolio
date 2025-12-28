import { NextRequest, NextResponse } from "next/server";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate name length (at least 2 characters)
    if (name.trim().length < 2) {
      return NextResponse.json(
        { error: "Name must be at least 2 characters long" },
        { status: 400 }
      );
    }

    // Validate subject length (at least 3 characters)
    if (subject.trim().length < 3) {
      return NextResponse.json(
        { error: "Subject must be at least 3 characters long" },
        { status: 400 }
      );
    }

    // Validate message length (at least 10 characters)
    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters long" },
        { status: 400 }
      );
    }

    // Here you would normally send the email using a service like:
    // - Resend
    // - SendGrid
    // - Nodemailer with SMTP
    // - AWS SES
    // For now, we'll log it and simulate success
    
    // Format email content
    const emailContent = `
New Contact Form Submission

From: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Sent from Portfolio Contact Form
    `.trim();

    // In production, you would send an actual email here
    // Example with Resend (requires: npm install resend):
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'Portfolio Contact <onboarding@resend.dev>',
    //   to: 'amammustofa@gmail.com',
    //   subject: `Contact Form: ${subject}`,
    //   text: emailContent,
    // });

    console.log("Contact form submission received:");
    console.log(emailContent);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully! I'll get back to you soon.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      {
        error: "An error occurred while sending your message. Please try again later.",
      },
      { status: 500 }
    );
  }
}
