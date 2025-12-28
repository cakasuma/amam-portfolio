# Contact Form Email API

## Overview
The contact form API endpoint at `/api/contact` handles form submissions and sends emails using Resend.

## Current Implementation
The API now includes:
- Full server-side validation for all form fields
- Input sanitization to prevent injection attacks
- **Integrated Resend email service** for sending actual emails
- Fallback to console logging if Resend is not configured
- Proper error handling for email delivery failures

## Email Service Setup

### Resend (Integrated)
Resend is already integrated and ready to use. Just configure your environment variables:

1. Sign up for a free account at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. Add environment variables to `.env.local`:

```env
RESEND_API_KEY=re_your_api_key_here
CONTACT_EMAIL=amammustofa@gmail.com
RESEND_FROM_EMAIL=Portfolio Contact <onboarding@resend.dev>
```

**Note:** 
- `RESEND_FROM_EMAIL` defaults to `Portfolio Contact <onboarding@resend.dev>` if not specified
- `CONTACT_EMAIL` defaults to `amammustofa@gmail.com` if not specified
- Without `RESEND_API_KEY`, form submissions will only be logged to console

### Alternative Services (Optional)

If you prefer a different email service, you can replace Resend with:

#### Option 1: SendGrid
```bash
npm install @sendgrid/mail
```

#### Option 2: Nodemailer with SMTP
```bash
npm install nodemailer
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
