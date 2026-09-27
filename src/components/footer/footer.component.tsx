"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown, Github, Instagram, Linkedin, Mail } from "lucide-react";
import { EMAIL, GITHUB_ACCOUNT, INSTAGRAM, LINKED_IN } from "../../../constant";

const rows = [
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, icon: Mail },
  { label: "GitHub", value: "prakashraz12", href: GITHUB_ACCOUNT, icon: Github },
  {
    label: "LinkedIn",
    value: "/in/prakash-raz-shrestha",
    href: LINKED_IN,
    icon: Linkedin,
  },
  {
    label: "Instagram",
    value: "@mr.prakashraz",
    href: INSTAGRAM,
    icon: Instagram,
  },
];

const linkClass =
  "underline decoration-neutral-400 underline-offset-4 dark:decoration-neutral-500";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer id="footer" className="mx-auto w-full max-w-5xl px-6 pb-16 ">
      <div className={`max-w-xl ${pathname === "/" ? "mx-auto" : ""}`}>
        <div>
          {rows.map((row) => (
            <a
              key={row.label}
              href={row.href}
              target={row.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={row.href.startsWith("mailto:") ? undefined : "noreferrer"}
              className="flex items-center justify-between gap-4  py-3.5 text-sm text-neutral-800 dark:border-white/10 dark:text-neutral-200"
            >
              <span className="flex items-center gap-3">
                <row.icon className="h-4 w-4 text-neutral-500" />
                {row.label}
              </span>
              <span className="flex min-w-0 items-center gap-1.5 text-neutral-500">
                <span className="truncate">{row.value}</span>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
              </span>
            </a>
          ))}
        </div>

        <p className="mt-8 text-[15px] leading-7 text-neutral-600 dark:text-neutral-400">
          Follow my work on{" "}
          <a href={GITHUB_ACCOUNT} target="_blank" rel="noreferrer" className={linkClass}>
            GitHub
          </a>
          , read what I write on{" "}
          <Link href="/blog" className={linkClass}>
            Writing
          </Link>
          , connect on{" "}
          <a href={LINKED_IN} target="_blank" rel="noreferrer" className={linkClass}>
            LinkedIn
          </a>
          , or email me at{" "}
          <a href={`mailto:${EMAIL}`} className={linkClass}>
            {EMAIL}
          </a>
          .
        </p>

        <details className="group mt-8 border-t border-neutral-200 dark:border-white/10">
          <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-sm font-medium text-neutral-800 marker:content-none dark:text-neutral-200 [&::-webkit-details-marker]:hidden">
            Tech stack
            <ChevronDown className="h-4 w-4 text-neutral-500 transition-transform group-open:rotate-180" />
          </summary>
          <p className="pb-2 text-[15px] leading-7 text-neutral-600 dark:text-neutral-400">
            Built with{" "}
            <a href="https://nextjs.org" target="_blank" rel="noreferrer" className={linkClass}>
              Next.js
            </a>
            ,{" "}
            <a href="https://react.dev" target="_blank" rel="noreferrer" className={linkClass}>
              React
            </a>,
            <a href="https://nodejs.org" target="_blank" rel="noreferrer" className={linkClass}>
              Node.js (Nest Js)
            </a>,
            <a href="https://nodejs.org" target="_blank" rel="noreferrer" className={linkClass}>
              Docker
            </a>
            , and{" "}
            <a href="https://tailwindcss.com" target="_blank" rel="noreferrer" className={linkClass}>
              Tailwind CSS
            </a>
            . Set in{" "}
            <a
              href="https://fonts.google.com/specimen/Space+Grotesk"
              target="_blank"
              rel="noreferrer"
              className={linkClass}
            >
              Space Grotesk
            </a>
            .
          </p>
        </details>

        <p className="mt-8 text-[15px] leading-7 text-neutral-600 dark:text-neutral-400">
          Made with ❤️ by Prakash Raz Shrestha
        </p>
      </div>
    </footer>
  );
}
