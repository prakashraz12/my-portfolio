"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { EMAIL, HERO_IMg } from "../../../constant";
import { BadgeCheck } from "lucide-react";
import { LinkPreview } from "@/components/ui/link-preview";
import { SquigglyText } from "@/components/ui/squiggly-text";
import { ChromaticImage } from "@/components/ui/chromatic-image";
import blacktechLogo from "@/assets/logo/blacktech.png";
import cueposLogo from "@/assets/logo/cuepos.svg";
import viewLogo from "@/assets/logo/view.svg";
import BG from "@/assets/images/bg.webp";

export function BackgroundBeamsDemo() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      return;
    } catch {
      const input = document.createElement("textarea");
      input.value = EMAIL;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.left = "-9999px";
      document.body.appendChild(input);
      input.select();
      const ok = document.execCommand("copy");
      input.remove();
      setCopied(ok);
    }
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "c" || event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) {
        return;
      }

      event.preventDefault();
      copyEmail();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timer);
  }, [copied]);

  return (
    <section className="mx-auto w-full max-w-5xl px-6 pb-4 pt-6">
      <div className="mx-auto max-w-xl">
        <div className="w-full">
          <ChromaticImage
            src={BG.src}
            alt="Prakash Raz Shrestha"
            className="h-[200px] w-full rounded-xl"
          />
        </div>
        <div className="relative h-16 w-16 -mt-10 ml-5">
          <Image
            src={HERO_IMg}
            alt="Prakash Raz Shrestha"
            fill
            priority
            className="rounded-xl object-cover object-top"
            sizes="64px"
          />
          
        </div>

        <h1 className="mt-4 flex items-center gap-1 text-xl font-semibold tracking-tight">
          Prakash Raz Shrestha
          <BadgeCheck
            size={16}
            aria-label="Verified"
            strokeWidth={3}
            className="shrink-0 fill-blue-600 stroke-white"
          />
        </h1>

        <div className="mt-2 space-y-4 text-[16px] leading-7 text-neutral-900 dark:text-neutral-100">
          <p>
            I&apos;m a <SquigglyText>Frontend developer</SquigglyText> at <span className="animate-pulse">❤️</span> heart, tinkering with interfaces
            and product code most of the time. I work at{" "}
            <LinkPreview
              url="https://www.blacktech.com.np/"
              className="inline-flex items-center gap-1 font-semibold"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={blacktechLogo.src}
                alt=""
                className="h-3.5 w-3.5 rounded-[3px] object-cover dark:invert"
              />
              <span className="underline decoration-dotted underline-offset-4">
                Black Tech
              </span>
            </LinkPreview>
            , based in Nepal, and you can find me on{" "}
            <a
              href="https://viewb.io/prakashraz"
              target="_blank"
              rel="noreferrer"
              className="font-semibold underline decoration-dotted underline-offset-4"
            >
              viewb.io/prakashraz
            </a>
            .
          </p>
          <p>
            When I&apos;m not coding, I sketch, listen to music, and read.
          </p>
          <p>
            I&apos;ve been building{" "}
            <LinkPreview
              url="https://cuepos.app/"
              className="inline-flex items-center gap-1 font-semibold"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cueposLogo}
                alt=""
                className="h-3.5 w-3.5 rounded-[3px] object-contain"
              />
              <span className="underline decoration-dotted underline-offset-4">
                Cuepos.app
              </span>
            </LinkPreview>{" "}
            and{" "}
            <LinkPreview
              url="https://viewb.io/"
              className="inline-flex items-center gap-1 font-semibold"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={viewLogo}
                alt=""
                className="h-3.5 w-3.5 rounded-[3px] object-contain"
              />
              <span className="underline decoration-dotted underline-offset-4">
                Viewb.io
              </span>
            </LinkPreview>{" "}
            alongside that. Cuepos runs snooker and pool clubs. Viewb is
            link-in-bio pages. My favourite thing is shipping the next small
            piece of them.
          </p>
        </div>

        <button
          type="button"
          onClick={copyEmail}
          className="mt-6 inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          {copied ? (
            "Copied"
          ) : (
            <>
              Press
              <kbd className="rounded-md border border-neutral-200 bg-white px-1.5 py-0.5 text-xs font-medium text-neutral-700 shadow-[0_1px_0_rgba(0,0,0,0.04)] dark:border-white/15 dark:bg-[#1c1c1c] dark:text-neutral-200">
                C
              </kbd>
              to copy my email
            </>
          )}
        </button>
      </div>
    </section>
  );
}
