const config = {
  plugins: {
    "@tailwindcss/postcss": {
      theme: {
        extend: {
          colors: {
            background: "var(--background)",
            "background-secondary": "var(--background-secondary)",
            foreground: "var(--foreground)",
            muted: "var(--muted)",
            "muted-foreground": "var(--muted-foreground)",
            border: "var(--border)",
            input: "var(--input)",
            accent: "var(--accent)",
            "accent-foreground": "var(--accent-foreground)",
            primary: "var(--primary)",
            "primary-foreground": "var(--primary-foreground)",
            secondary: "var(--secondary)",
            "secondary-foreground": "var(--secondary-foreground)",
            success: "var(--success)",
            warning: "var(--warning)",
            danger: "var(--danger)",
            info: "var(--info)",
            card: "var(--card)",
            "card-foreground": "var(--card-foreground)",
            text: {
              primary: "var(--text-primary)",
              secondary: "var(--text-secondary)",
              muted: "var(--text-muted)",
            },
            button: {
              text: "var(--button-text)",
              bg: "var(--button-bg)",
              "bg-hover": "var(--button-bg-hover)",
              "cta-bg": "var(--button-cta-bg)",
              "cta-hover": "var(--button-cta-hover)",
            },
            glass: {
              bg: "var(--glass-bg)",
              border: "var(--glass-border)",
            },
          },
          fontFamily: {
            sans: ["var(--font-sans)"],
            mono: ["var(--font-mono)"],
          },
          animation: {
            "fade-in": "fadeIn 0.5s ease-in-out",
            float: "float 3s ease-in-out infinite",
            glow: "glow 2s ease-in-out infinite alternate",
          },
          keyframes: {
            fadeIn: {
              "0%": { opacity: "0", transform: "translateY(10px)" },
              "100%": { opacity: "1", transform: "translateY(0)" },
            },
            float: {
              "0%, 100%": { transform: "translateY(0px)" },
              "50%": { transform: "translateY(-10px)" },
            },
            glow: {
              "0%, 100%": { boxShadow: "0 0 5px rgba(139, 69, 19, 0.5)" },
              "50%": {
                boxShadow:
                  "0 0 20px rgba(139, 69, 19, 0.8), 0 0 30px rgba(139, 69, 19, 0.6)",
              },
            },
          },
        },
      },
      content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
      ],
      safelist: [
        // Color variants for dynamic classes
        "text-secondary",
        "text-warning",
        "text-info",
        "text-success",
        "text-primary",
        "bg-secondary/10",
        "bg-warning/10",
        "bg-info/10",
        "bg-success/10",
        "bg-primary/10",
        "border-secondary/20",
        "border-warning/20",
        "border-info/20",
        "border-success/20",
        "border-primary/20",
        "border-secondary/40",
        "border-warning/40",
        "border-info/40",
        "border-success/40",
        "border-primary/40",
        "hover:bg-secondary/20",
        "hover:bg-warning/20",
        "hover:bg-info/20",
        "hover:bg-success/20",
        "hover:bg-primary/20",
        "hover:border-secondary/40",
        "hover:border-warning/40",
        "hover:border-info/40",
        "hover:border-success/40",
        "hover:border-primary/40",
      ],
    },
  },
};

export default config;
