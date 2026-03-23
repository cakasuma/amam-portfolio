# Mustofa Amami - Portfolio

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- 🌐 **Internationalization (i18n)** - Support for English and Indonesian
- 🌗 **Dark/Light Theme** - Toggle between themes with system preference detection
- 📱 **Responsive Design** - Optimized for all device sizes
- ⚡ **Fast Performance** - Built with Next.js 15 and Turbopack
- 🎨 **Modern UI** - Glass morphism effects and smooth animations
- 📄 **Multiple Pages** - Home, Resume, Portfolio, Blog, and Contact

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Motion (Framer Motion)
- **Internationalization**: react-i18next
- **Theme Management**: next-themes
- **Icons**: React Icons

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/cakasuma/amam-portfolio.git
   cd amam-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```text
src/
├── app/
│   ├── [lng]/                 # Internationalized routes
│   │   ├── blog/             # Blog page
│   │   ├── contact/          # Contact page
│   │   ├── portfolio/        # Portfolio page
│   │   ├── resume/           # Resume page
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/           # Reusable components
│   │   ├── Footer.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   ├── MotionLink.tsx
│   │   ├── Navigation.tsx
│   │   └── ThemeSwitcher.tsx
│   ├── i18n/                 # Internationalization setup
│   │   ├── locales/          # Translation files
│   │   │   ├── en/          # English translations
│   │   │   └── id/          # Indonesian translations
│   │   ├── client.ts
│   │   ├── index.ts
│   │   └── settings.ts
│   └── theme/
│       └── Providers.tsx     # Theme provider setup
```

## Customization

### Updating Personal Information

1. **Profile Image**: Replace `/public/profile-placeholder.svg` with your actual photo
2. **Contact Information**: Update the contact details in the translation files (`src/app/i18n/locales/*/translation.json`)
3. **Social Links**: Update social media links in the navigation and footer components
4. **Resume Content**: Modify the resume data in `src/app/i18n/locales/*/resume.json`

### Adding New Projects

Edit the `projects` array in `src/app/[lng]/portfolio/page.tsx` to add your projects:

```typescript
const projects = [
  {
    id: 1,
    title: "Your Project Title",
    description: "Project description",
    image: "/path-to-image",
    technologies: ["React", "Next.js", "TypeScript"],
    demoUrl: "https://your-demo-url.com",
    githubUrl: "https://github.com/your-username/project"
  },
  // Add more projects...
];
```

### Styling

The project uses CSS custom properties for theming. You can customize colors in `src/app/[lng]/globals.css`:

```css
html.light {
  --primary: #2563eb;
  --secondary: #4f46e5;
  --accent: #18181b;
  /* ... other colors */
}

html.dark {
  --primary: #3b82f6;
  --secondary: #6366f1;
  --accent: #d4d4d4;
  /* ... other colors */
}
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

This project can be deployed to any platform that supports Next.js:

- **Vercel** (Recommended)
- **Netlify**
- **AWS Amplify**
- **Railway**
- **Self-hosted**

For Vercel deployment:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

Feel free to reach out if you have any questions or suggestions!

- Email: [amammustofa@gmail.com](mailto:amammustofa@gmail.com)
- LinkedIn: [Mustofa Ghaleb Amami](https://www.linkedin.com/in/mustofa-ghaleb-amami)
- GitHub: [cakasuma](https://github.com/cakasuma)
- Twitter/X: [@cakasuma](https://x.com/cakasuma)
