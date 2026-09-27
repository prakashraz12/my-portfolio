"use client";

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import s1 from "@/assets/images/s1.png";
import s2 from "@/assets/images/s2.webp";
import s3 from "@/assets/images/s3.webp";
import setoBagh from "@/assets/images/setobaag.jpg";
import karnaliBlues from "@/assets/images/karnaliblues.jpg";
import setoDharti from "@/assets/images/setodarati.jpg";
import summerLove from "@/assets/images/summer-love.jpg";
import saya from "@/assets/images/saya.jpg";
import mansoon from "@/assets/images/moonsun.jpg";
import ekSarkoMaya from "@/assets/images/eksarkomaya.jpg";
import momTest from "@/assets/images/books/mom-test.jpg";
import parasite from "@/assets/images/movie/parasite.jpeg";
import palPal from "@/assets/images/songs/palpaldilkepass.jpg";
import tuPyar from "@/assets/images/songs/Tu-Pyar-Hai-Kisi-Aur-Ka-Instrumental-Hindi-2017-20231130005420-500x500.jpg";

const favorites: {
  type: string;
  title: string;
  note: string;
  meta: string;
  cover: string;
  href?: string;
}[] = [
  {
    type: "Book",
    title: "Seto Bagh",
    note: "How the Rana rule took hold",
    meta: "Diamond Shumsher Rana",
    cover: setoBagh.src,
  },
  {
    type: "Book",
    title: "Karnali Blues",
    note: "A boyhood on the Karnali",
    meta: "Buddhisagar",
    cover: karnaliBlues.src,
  },
  {
    type: "Book",
    title: "Seto Dharti",
    note: "Tara's life, from child bride to old age",
    meta: "Amar Neupane",
    cover: setoDharti.src,
  },
  {
    type: "Book",
    title: "Summer Love",
    note: "A college romance that stays",
    meta: "Subin Bhattarai",
    cover: summerLove.src,
  },
  {
    type: "Book",
    title: "Saya",
    note: "The same love after she leaves",
    meta: "Subin Bhattarai",
    cover: saya.src,
  },
  {
    type: "Book",
    title: "Mansoon",
    note: "A love story in the monsoon",
    meta: "Subin Bhattarai",
    cover: mansoon.src,
  },
  {
    type: "Book",
    title: "Ek Sarko Maya",
    note: "A love story that doesn't stay simple",
    meta: "J.S. Paudel",
    cover: ekSarkoMaya.src,
  },
  {
    type: "Book",
    title: "The Mom Test",
    note: "Talk to customers without the polite lies",
    meta: "Rob Fitzpatrick",
    cover: momTest.src,
  },
  {
    type: "Movie",
    title: "Parasite",
    note: "A family scheme that turns",
    meta: "Bong Joon-ho",
    cover: parasite.src,
  },
  {
    type: "Song",
    title: "Pal Pal Dil Ke Paas",
    note: "Kishore Kumar",
    meta: "Spotify.com",
    cover: palPal.src,
    href: "https://open.spotify.com/search/Pal%20Pal%20Dil%20Ke%20Paas%20Kishore%20Kumar",
  },
  {
    type: "Song",
    title: "Tu Pyar Hai Kisi Aur Ka",
    note: "Instrumental",
    meta: "Spotify.com",
    cover: tuPyar.src,
    href: "https://open.spotify.com/search/Tu%20Pyar%20Hai%20Kisi%20Aur%20Ka%20Sampreet%20Dutta",
  },
];

const sketches = [
  { src: s1.src, rotate: "-rotate-[3deg]" },
  { src: s2.src, rotate: "rotate-[2deg]" },
  { src: s3.src, rotate: "-rotate-[1deg]" },
];

const Personal = () => {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("All");
  const kinds = ["All", ...Array.from(new Set(favorites.map((item) => item.type)))];
  const q = query.trim().toLowerCase();
  const shown = favorites.filter((item) => {
    const matchesKind = kind === "All" || item.type === kind;
    const hay = `${item.title} ${item.note} ${item.meta}`.toLowerCase();
    return matchesKind && (!q || hay.includes(q));
  });

  return (
    <section id="personal" className="mx-auto w-full max-w-5xl px-6 py-8">
      <div className="mx-auto max-w-xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-600 dark:text-neutral-400">
          Personal
        </p>
        <p className="mt-4 text-[15px] leading-7 mb-4 text-neutral-600 dark:text-neutral-400">
          In my spare time, I enjoy listening to music and sketching on
          my sketchbook.
        </p>

        <iframe data-testid="embed-iframe" style={{borderRadius: "12px", height: "152px"}} src="https://open.spotify.com/embed/track/5EuI6Zyz3kuFiv4JLhhbR1?utm_source=generator&si=3146d387edd54005" width="100%" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>

        <div className="mt-8 flex items-end justify-center gap-3">
          {sketches.map((sketch, index) => (
            <figure key={sketch.src} className={sketch.rotate}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sketch.src}
                alt={`Sketch ${index + 1}`}
                className="h-36 w-auto shadow-[0_12px_24px_rgba(0,0,0,0.14)] sm:h-52"
              />
            </figure>
          ))}
        </div>

        <p className="mt-6 text-center text-[15px] leading-7 text-neutral-500 dark:text-neutral-400">
          Made by me using markers, water color, and drawing.
        </p>

        <p className="mt-12 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-600 dark:text-neutral-400">
          My favorites
        </p>
        <div className="mt-4 flex items-center justify-between gap-4">
          <label className="flex min-w-0 flex-1 items-center gap-2 text-neutral-400">
            <Search className="h-4 w-4 shrink-0" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search"
              aria-label="Search favorites"
              className="min-w-0 flex-1 bg-transparent text-sm text-neutral-800 outline-none placeholder:text-neutral-400 dark:text-neutral-100"
            />
          </label>
          <label className="relative shrink-0">
            <select
              value={kind}
              onChange={(event) => setKind(event.target.value)}
              aria-label="Filter favorites"
              className="appearance-none bg-transparent py-1 pl-1 pr-5 text-sm text-neutral-800 outline-none dark:text-neutral-100"
            >
              {kinds.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-500" />
          </label>
        </div>

        <div className="mt-4">
          {shown.map((item) => {
            const row = (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.cover}
                  alt=""
                  className="h-5 w-5 shrink-0 rounded-sm object-cover"
                />
                <p className="min-w-0 flex-1 truncate text-[15px]">
                  <span className="font-medium text-neutral-900 dark:text-neutral-100">
                    {item.title}
                  </span>
                  <span className="text-neutral-400"> / {item.note}</span>
                </p>
                <span className="hidden shrink-0 text-sm text-neutral-400 sm:block">
                  {item.meta}
                </span>
              </>
            );
            const className = "flex items-center gap-3 py-2";
            return item.href ? (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className={className}
              >
                {row}
              </a>
            ) : (
              <div key={item.title} className={className}>
                {row}
              </div>
            );
          })}
          {shown.length === 0 && (
            <p className="py-2 text-sm text-neutral-400">Nothing matches.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Personal;
