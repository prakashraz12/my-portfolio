"use client";
import React, { useEffect, useState } from "react";
import { BackgroundBeams } from "../ui/background-beams";
import Image from "next/image";
import {
  GITHUB_ACCOUNT,
  HERO_IMg,
  INSTAGRAM,
  LINKED_IN,
} from "../../../constant";
import Link from "next/link";
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import { NewBadge } from "../ui/new-badge";
import { motion } from "framer-motion";

export function BackgroundBeamsDemo() {
  const [typedText, setTypedText] = useState("");
  const fullText = "Coming soon...";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 150);

    return () => clearInterval(timer);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };
  return (
    <div className="h-[35rem] md:h-[30rem] w-full mb-12  bg-white relative flex flex-col items-center justify-end antialiased">
      <div className="max-w-2xl  p-4">
        <div className="flex  gap-10 relative z-10">
          <div className="flex flex-col gap-2">
            <h1 className=" text-lg md:text-4xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-500 to-neutral-600  font-sans font-bold">
              Prakash Raz Shrestha
            </h1>
            <p className="text-neutral-500 max-w-lg  my-2 text-md relative z-10">
              Buiding own SAAS app{" "}
              <span className="bg-slate-50 font-semibold text-slate-900 px-2 py-1">
                <Link href={"https://byaparsathi.com/"}>Byapar Sathi</Link>
              </span>{" "}
              and many more.
            </p>
            <div className="flex flex-col mt-4">
              <motion.p
                className="text-md leading-relaxed  text-foreground/80 max-w-2xl"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
              >
                I'm a developer from a business background, working at{" "}
                <motion.span className="inline-block bg-slate-100 dark:bg-slate-800 px-2 py-1  text-foreground font-medium">
                  <Link
                    href={"https://www.blacktech.com.np/"}
                    target="_blank"
                    className="text-semibold"
                  >
                    Black Tech
                  </Link>
                </motion.span>{" "}
                focused on frontend development. Continuously learning DevOps,
                scalable applications, and business skills,{" "}
                <span className="text-muted-foreground  ">{typedText}</span>
              </motion.p>
            </div>
            <div className="flex gap-4 mt-4">
              <ul className="flex gap-3">
                <li className="cursor-pointer">
                  <Link href={LINKED_IN}>
                    <LinkedInLogoIcon width="30" height="30" />
                  </Link>
                </li>
                <li className="cursor-pointer">
                  <Link href={INSTAGRAM}>
                    <InstagramLogoIcon width="30" height="30" />
                  </Link>
                </li>
                <li className="cursor-pointer">
                  <Link href={GITHUB_ACCOUNT}>
                    <GitHubLogoIcon width="30" height="30" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="relative aspect-square">
            <Image
              src={HERO_IMg}
              alt="prkashraz's profie photo"
              width={400}
              height={400}
              className="object-contain rounded-md border"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
