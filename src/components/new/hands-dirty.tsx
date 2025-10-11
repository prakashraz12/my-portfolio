import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GITHUB_ACCOUNT } from "../../../constant";

const HandsDirty = () => {
  const projects = [
    {
      title: "Byapar sathi",
      description:
        "Byapar Sathi is a SaaS-based shop management system designed to help businesses efficiently manage customer credits, product stock, finance, sales, purchases, and inventory — all from one powerful platform.",
      image:
        "https://res.cloudinary.com/du1bbws62/image/upload/v1760102722/tkkxhaxkjvrlbewes06p.png",
      link: "https://byaparsathi.com/",
      tech: [
        "React vite",
        "Tailwind CSS",
        "Shadcn UI",
        "TypeScript",
        "Nest Js",
        "My Sql",
        "Cpanel",
      ],
    },
  ];

  const loading = () => {
    return (
      <div className="border rounded-2xl p-4 animate-pulse">
        <div className="w-12 h-12 rounded-md bg-slate-200 dark:bg-slate-700" />

        <div className="mt-4 space-y-3">
          <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />

          <div className="space-y-2 mt-3">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full" />
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full" />
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
          </div>

          <div className="flex gap-2 flex-wrap mt-6">
            <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-full" />
            <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded-full" />
            <div className="h-6 w-14 bg-slate-200 dark:bg-slate-700 rounded-full" />
            <div className="h-6 w-14 bg-slate-200 dark:bg-slate-700 rounded-full" />
            <div className="h-6 w-14 bg-slate-200 dark:bg-slate-700 rounded-full" />
            <div className="h-6 w-14 bg-slate-200 dark:bg-slate-700 rounded-full" />
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="max-w-2xl mx-auto mt-12 px-4">
      <h1 className="text-2xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-500 to-neutral-600 font-sans font-bold">
        Hands Dirty, Projects!
      </h1>
      <p className="text-sm text-muted-foreground mt-3">
        One project is enough to make u, crazy on me!
      </p>
      <div className="grid gird-cols-2 lg:grid-cols-2 mt-8 gap-4">
        {projects.map((project) => (
          <Link
          key={project.title}
            href={project.link}
            className="border rounded-2xl p-4 hover:shadow-md transition-all ease-linear duration-300 hover:bg-gradient-to-b from-blue-50 to-white"
          >
            <div className="max-w-12 h-12 rounded-md">
              <Image
                src={project.image}
                alt={project.title}
                width={100}
                height={100}
              />
            </div>
            <div className="mt-4">
              <h1 className="text-md font-semibold">{project.title}</h1>
              <p className="text-sm text-muted-foreground mt-3 line-clamp-3">
                {project.description}
              </p>
              <ul className="flex gap-2 flex-wrap mt-4">
                {project.tech.map((tech, index) => (
                  <li
                    key={index}
                    className="bg-slate-50 dark:bg-slate-800 rounded-full text-sm px-3 py-0.5  border text-muted-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
        {loading()}
        {loading()}
        {loading()}
      </div>
      <div className="flex justify-center w-full mt-6">
       <Link href={GITHUB_ACCOUNT} className="text-sm flex items-center transition-all ease-linear duration-300">
       visit github <ChevronDown className="ml-2 h-4 w-4"/>
       </Link>
      </div>
    </div>
  );
};

export default HandsDirty;
