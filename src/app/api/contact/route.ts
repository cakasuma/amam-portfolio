import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Initialize Resend only if API key is provided
const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

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
    
    // Sanitize user input by escaping special characters
    const sanitize = (str: string) => str.replace(/[<>&'"]/g, (char) => {
      const escapeChars: { [key: string]: string } = {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        "'": '&#39;',
        '"': '&quot;',
      };
      return escapeChars[char] || char;
    });

    // Format email content with sanitized input
    const emailContent = `
New Contact Form Submission

From: ${sanitize(name)}
Email: ${sanitize(email)}
Subject: ${sanitize(subject)}

Message:
${sanitize(message)}

---
Sent from Portfolio Contact Form
    `.trim();

    // Send email using Resend
    try {
      if (resend) {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>',
          to: process.env.CONTACT_EMAIL || 'amammustofa@gmail.com',
          subject: `Contact Form: ${sanitize(subject)}`,
          text: emailContent,
          replyTo: email,
        });
        
        console.log("Email sent successfully via Resend");
      } else {
        // Fallback to console logging if no API key is configured
        console.log("Contact form submission received (no email sent - RESEND_API_KEY not configured):");
        console.log(emailContent);
      }
    } catch (emailError) {
      // Log email error but don't fail the request
      console.error("Error sending email:", emailError);
      console.log("Contact form submission logged (email failed to send):");
      console.log(emailContent);
    }

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
