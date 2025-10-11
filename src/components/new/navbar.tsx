"use client";

import { useState, useEffect } from "react";
import { Menu, Sparkle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Beam from "../ui/leaner-grident";
import Link from "next/link";
import { LINKED_IN } from "../../../constant";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ["home", "projects", "blogs", "about"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/project" },
    { name: "Blogs", href: "/blog" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <nav
        className={cn(
          "mx-auto relative max-w-3xl rounded-full border transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)]",
          isScrolled
            ? "bg-background/80 backdrop-blur-lg shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            : "bg-background/60 backdrop-blur-sm"
        )}
      >
        <Beam className="top-0" />
        <Beam className="top-0" />
        <div className="z-0 ">
          <div className="absolute bottom-0 right-4 mt-[2px] flex h-8 items-end overflow-hidden">
            <div className="flex -mb-px h-[2px] w-80 -scale-x-100">
              <div className="w-full flex-none blur-sm [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
              <div className="-ml-[100%] w-full flex-none blur-[1px] [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-2 py-2">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-opacity"
          >
            <p className="text-sm">PR</p>
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={cn(
                    "relative text-sm font-medium transition-all duration-300",
                    activeSection === link.name.toLowerCase()
                      ? "text-foreground [text-shadow:0_0_10px_rgba(255,255,255,0.5),0_0_20px_rgba(255,255,255,0.3)]"
                      : "text-foreground/70 hover:text-foreground"
                  )}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA Button */}
          <div className="hidden md:block z-50">
            <Link href={LINKED_IN}>
              <div className="rounded-full flex items-center bg-black text-white px-4 h-8 text-sm cursor-pointer">
                Hire Me <Sparkle className="h-4 w-4 ml-1" />
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className=" md:hidden p-2 text-foreground hover:bg-accent rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 bg-background  h-[calc(100vh-4rem)] w-full border-t border-border  ">
            <ul className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="block px-4 py-3 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <Link href={LINKED_IN}>
                  <div
                    className="w-full rounded-full flex items-center bg-black text-white px-4 h-8 text-sm cursor-pointer"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Hire Me <Sparkle className="h-4 w-4 ml-1" />
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
