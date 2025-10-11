"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, SquareArrowUpRightIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "Projects", href: "/project" },
  { name: "About", href: "/about" },
];

import { CV_LINK, DARK_LOGO } from "../../../constant";
import Image from "next/image";

export default function Navbar() {
  const pathName = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/60 backdrop-blur-lg shadow-md" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <div
              className="w-[80px] h-[80px] relative"
              onClick={() => router.push("/")}
            >
              <Image
                src={DARK_LOGO}
                alt="dark_logo"
                className="object-contain"
                fill
              />
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    pathName === item.href
                      ? "font-bold"
                      : "text-muted-foreground"
                  } hover:text-primary px-3 py-2 rounded-md  font-medium transition-colors duration-300 hover:bg-primary/10`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:flex  gap-3">
            <Button asChild className="rounded-none">
              <Link href={CV_LINK}>Download CV</Link>
            </Button>
            <Button
              asChild
              className="rounded-none flex items-center"
              variant={"outline"}
            >
              <Link href="/download-cv">
                Checkout Art Website <SquareArrowUpRightIcon />
              </Link>
            </Button>
          </div>
          <div className="md:hidden ">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu size={"2rem"} />
              <span className="sr-only">Open main menu</span>
            </Button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  pathName === item.href ? "font-bold" : "text-muted-foreground"
                } hover:text-primary px-3 py-2 flex flex-col rounded-md text-sm font-medium transition-colors duration-300 hover:bg-primary/10`}
              >
                {item.name}
              </Link>
            ))}
            <Button asChild className="w-full mt-4">
              <Link href="/download-cv">Download CV</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
