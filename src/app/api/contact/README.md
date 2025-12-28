# Contact Form Email API

## Overview
The contact form API endpoint at `/api/contact` handles form submissions and prepares them for email delivery.

## Current Implementation
Currently, the API:
- Validates all form fields (name, email, subject, message)
- Logs the email content to the console
- Returns appropriate success/error responses

## Email Service Integration

To send actual emails, you can integrate one of the following services:

### Option 1: Resend (Recommended)
```bash
npm install resend
```

Add to `.env.local`:
```
RESEND_API_KEY=your_api_key_here
CONTACT_EMAIL=your-email@example.com
```

Update `/src/app/api/contact/route.ts`:
```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// In the POST handler, replace the console.log with:
await resend.emails.send({
  from: 'Portfolio Contact <onboarding@resend.dev>',
  to: process.env.CONTACT_EMAIL || 'your-email@example.com',
  subject: `Contact Form: ${subject}`,
  text: emailContent,
});
```

### Option 2: SendGrid
```bash
npm install @sendgrid/mail
```

Add to `.env.local`:
```
SENDGRID_API_KEY=your_api_key_here
```

### Option 3: Nodemailer with SMTP
```bash
npm install nodemailer
```

Add to `.env.local`:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

## Validation Rules
- **Name**: Minimum 2 characters, required
- **Email**: Valid email format, required
- **Subject**: Minimum 3 characters, required
- **Message**: Minimum 10 characters, required

## API Response Format

### Success (200)
```json
{
  "success": true,
  "message": "Your message has been sent successfully! I'll get back to you soon."
}
```

### Validation Error (400)
```json
{
  "error": "Invalid email format"
}
```

### Server Error (500)
```json
{
  "error": "An error occurred while sending your message. Please try again later."
}
```

## Security Considerations
- All fields are validated on both client and server side
- Email format is validated using regex
- No sensitive data is exposed in error messages
- CORS is handled by Next.js API routes

## Testing
The current implementation logs email content to the console. You can test by:
1. Filling out the contact form
2. Submitting the form
3. Checking the server console for the logged email content
