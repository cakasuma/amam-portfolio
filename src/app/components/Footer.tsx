"use client";
import Link from "./MotionLink";
import { languages } from "../i18n/settings";
import { useTranslation } from "../i18n/client";
import { Trans } from "react-i18next";

export const Footer = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng, "footer");
  return (
    <footer style={{ marginTop: 50 }}>
      <Trans
        t={t}
        i18nKey="languageSwitcher"
        default="Switch from <strong>{{ lng }}</strong> to: "
        components={{ strong: <strong /> }}
        values={{ lng: lng.toUpperCase() }}
      />
      {languages
        .filter((l) => lng !== l)
        .map((l, index) => {
          return (
            <span key={l}>
              {index > 0 && " or "}
              <Link href={`/${l}`}>{l.toUpperCase()}</Link>
            </span>
          );
        })}
    </footer>
  );
};
