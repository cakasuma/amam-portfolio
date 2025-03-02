const config = {
  plugins: {
    "@tailwindcss/postcss": {
      theme: {
        extend: {
          colors: {
            background: "var(--background)",
            foreground: "var(--foreground)",
            muted: "var(--muted)",
            border: "var(--border)",
            accent: "var(--accent)",
            primary: "var(--primary)",
            secondary: "var(--secondary)",
            success: "var(--success)",
            warning: "var(--warning)",
            danger: "var(--danger)",
            text: {
              primary: "var(--text-primary)",
              secondary: "var(--text-secondary)",
            },
            button: {
              text: "var(--button-text)",
              bg: "var(--button-bg)",
            },
          },
          fontFamily: {
            sans: ["var(--font-sans)"],
            mono: ["var(--font-mono)"],
          },
        },
      },
    },
  },
};

export default config;
