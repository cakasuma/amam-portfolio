# Contact Form Email API

## Overview
The contact form API endpoint at `/api/contact` handles form submissions and sends emails using Resend.

## Security Features

### Rate Limiting (DDoS Protection)
The API includes built-in rate limiting to prevent abuse and DDoS attacks:
- **Limit**: 5 requests per 15 minutes per IP address
- **Response**: HTTP 429 (Too Many Requests) when limit exceeded
- **Headers**: 
  - `X-RateLimit-Limit`: Maximum requests allowed
  - `X-RateLimit-Remaining`: Remaining requests in current window
  - `X-RateLimit-Reset`: Timestamp when limit resets
  - `Retry-After`: Seconds until retry is allowed

### Input Validation & Sanitization
- All fields validated on both client and server side
- Email format validation using regex
- Minimum length requirements for all fields
- Input sanitization to prevent injection attacks

## Current Implementation
The API now includes:
- Full server-side validation for all form fields
- Input sanitization to prevent injection attacks
- **Rate limiting** to prevent DDoS and spam attacks
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

### Rate Limit Exceeded (429)
```json
{
  "error": "Too many requests. Please try again later.",
  "resetTime": "2024-12-28T10:30:00.000Z"
}
```
Headers:
- `Retry-After`: Seconds to wait before retry
- `X-RateLimit-Limit`: 5
- `X-RateLimit-Remaining`: 0
- `X-RateLimit-Reset`: Unix timestamp

### Success (200)
```json
{
  "success": true,
  "message": "Your message has been sent successfully! I'll get back to you soon."
}
```
Headers:
- `X-RateLimit-Limit`: 5
- `X-RateLimit-Remaining`: Number of requests remaining

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
- **Rate Limiting**: 5 requests per 15 minutes per IP prevents DDoS and spam
- **Input Validation**: All fields validated on both client and server side
- **Email Validation**: Format validated using regex
- **Input Sanitization**: Special characters escaped to prevent injection
- **No Sensitive Data**: Error messages don't expose system internals
- **CORS**: Handled automatically by Next.js API routes

## Production Deployment Notes

### For Enhanced Protection
For production environments with high traffic, consider:
1. **External Rate Limiting**: Use Cloudflare, AWS WAF, or similar services
2. **Redis-based Rate Limiting**: For distributed systems with multiple instances
3. **Bot Protection**: Implement CAPTCHA (hCaptcha, reCAPTCHA) for additional security
4. **IP Reputation Services**: Block known malicious IPs
5. **Monitoring**: Set up alerts for unusual request patterns

### Current In-Memory Limitations
The current rate limiter uses in-memory storage:
- ✅ Works perfectly for single-instance deployments
- ✅ Zero external dependencies
- ✅ Fast and efficient
- ⚠️ Resets on server restart
- ⚠️ Not shared across multiple server instances

For serverless environments (Vercel, AWS Lambda), this provides per-instance protection, which is sufficient for most use cases.

## Testing
The current implementation logs email content to the console. You can test by:
1. Filling out the contact form
2. Submitting the form
3. Checking the server console for the logged email content
