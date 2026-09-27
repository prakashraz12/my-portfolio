import { LinkPreview } from "@/components/ui/link-preview";
import cueposLogo from "@/assets/logo/cuepos.svg";
import viewLogo from "@/assets/logo/view.svg";
import sizzbeLogo from "@/assets/images/sizzbe.png";
import restroxLogo from "@/assets/images/restrox.png";

const work = [
  {
    title: "Cuepos.app",
    description: "Club software for snooker and pool tables.",
    href: "https://cuepos.app/",
    logo: cueposLogo,
  },
  {
    title: "Viewb.io",
    description: "Link-in-bio pages for businesses and creators.",
    href: "https://viewb.io/",
    logo: viewLogo,
  },
  {
    title: "RestroX",
    description: "Restaurant POS for orders, sales, inventory, and staff.",
    href: "https://www.restrox.com/",
    logo: restroxLogo.src,
  },
  {
    title: "Sizzbe",
    description: "Real food, real places, and real experiences.",
    href: "https://www.sizzbe.com/",
    logo: sizzbeLogo.src,
  },
];

const HandsDirty = () => {
  return (
    <section id="work" className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="mx-auto max-w-xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-600 dark:text-neutral-400">
          Work
        </p>
        <div className="mt-4">
          {work.map((project) => (
            <LinkPreview
              key={project.title}
              url={project.href}
              className="flex items-center gap-3 py-2"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.logo}
                alt=""
                className="h-5 w-5 shrink-0 rounded-sm object-contain"
              />
              <p className="min-w-0 truncate text-[15px]">
                <span className="font-medium text-neutral-900 dark:text-neutral-100">
                  {project.title}
                </span>
                <span className="text-neutral-400"> / {project.description}</span>
              </p>
            </LinkPreview>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HandsDirty;
