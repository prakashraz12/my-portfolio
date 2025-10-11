"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  GITHUB_ACCOUNT,
  HERO_IMg,
  INSTAGRAM,
  LIGHT_LOGO,
  LINKED_IN,
} from "../../../constant";
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";

export default function Component() {
  return (
    <section className="container mx-auto mt-32">
      <div className="relative  bg-background overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute right-10 top-10"
        >
          <Star className="h-6 w-6 text-yellow-400" />
        </motion.div>
        <div className="absolute left-1/2 top-1/4 h-4 w-4 rounded-full bg-purple-200" />
        <div className="absolute right-1/4 bottom-1/4 h-8 w-8 rounded-full border-2 border-yellow-400" />
        <div className="px-4 md:px-6 flex  items-center">
          <div className="flex  items-center justify-between w-full">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-4"
            >
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Prakash Raz Shrestha
                  <motion.span
                    animate={{ rotate: [0, 14, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      repeatType: "reverse",
                    }}
                    className="inline-block ml-2"
                  >
                    👋
                  </motion.span>
                </h1>
                <div className="flex items-center gap-2">
                  <span className="h-px w-8 bg-foreground" />
                  <p className="text-lg font-medium">Frontend Developer</p>
                </div>
              </div>
              <p className="max-w-[600px] text-muted-foreground md:text-xl leading-7">
              I believe that knowing multiple programming languages does not make you a good developer; rather, it&apos;s the skill of seeing problems from different perspectives and solving them that truly matters. Whether you use HTML, CSS, or JavaScript, the key is to address real issues effectively.
              </p>
              
              <div className="mt-6">
                <div className="flex gap-4">
                  <ul className="flex gap-3">
                    <li className="cursor-pointer">
                      <Link href={LINKED_IN}>
                        <LinkedInLogoIcon width="38" height="38" />
                      </Link>
                    </li>
                    <li className="cursor-pointer">
                      <Link href={INSTAGRAM}>
                        <InstagramLogoIcon width="38" height="38" />
                      </Link>
                    </li>
                    <li className="cursor-pointer">
                      <Link href={GITHUB_ACCOUNT}>
                        <GitHubLogoIcon width="38" height="38" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative hidden lg:block"
            >
              <div className="relative h-[500px] w-[500px]">
                <div className="absolute inset-4 rounded-full bg-yellow-400" />
                <div className="absolute inset-0 rounded-full bg-yellow-400/20" />
                <Image
                  src={HERO_IMg}
                  alt="Prakash Raz Shrestha"
                  fill
                  className="object-cover rounded-full"
                  priority
                />
              </div>
              <div className="absolute bottom-6 right-10 flex h-24 w-24 items-center justify-center rounded-full bg-purple-700 text-white">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Image
                    src={LIGHT_LOGO}
                    className="object-contain"
                    alt="Logo"
                    width={100}
                    height={100}
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
