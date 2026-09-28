"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/new/theme-toggle";
import Image from "next/image";
import logo from "@/assets/images/praksh.png";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/project" },
  { name: "Writing", href: "/blog" },
  { name: "About", href: "/about" },
];

function pageLabel(pathname: string) {
  if (pathname.startsWith("/project")) return "work";
  if (pathname.startsWith("/blog")) return "writing";
  if (pathname.startsWith("/about")) return "about";
  return "home";
}

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative mx-auto w-full max-w-5xl px-6 pt-4">
      <nav
        className={`relative flex max-w-xl items-center justify-between ${
          pathname === "/" || pathname.startsWith("/blog/") ? "mx-auto" : ""
        }`}
      >
        <p className="flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400">
          <Link href="/" className="flex items-center gap-1 hover:text-neutral-900 dark:hover:text-white">
            <Image
              src={logo.src}
              alt="Prakash Raz Shrestha"
              width={100}
              height={100}
              className="h-[16px] w-[16px] rounded-xl object-cover object-top"
            />
            Prakash
          </Link>
          <span>/ {pageLabel(pathname)}</span>
        </p>
        <div className="flex items-center">
          <ThemeToggle />
          
        </div>

        {isOpen && (
          <div className="absolute right-0 top-11 z-50 w-44 rounded-xl border border-black/5 bg-white p-1.5 shadow-sm dark:border-white/10 dark:bg-[#1c1c1c]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-lg px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-white/10"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
