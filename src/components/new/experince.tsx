import type { ReactNode } from "react";
import { LinkPreview } from "@/components/ui/link-preview";
import { ImagesBadge } from "@/components/ui/images-badge";
import blacktechLogo from "@/assets/logo/blacktech.png";
import certificate from "@/assets/images/awards/f1.png";
import restroxLogo from "@/assets/images/restrox.png";
import mug from "@/assets/images/awards/c1.png";

const experience: {
  role: string;
  company?: string;
  link?: string;
  logo?: string;
  duration: string;
  description: ReactNode;
}[] = [
  {
    role: "Frontend Developer",
    company: "Black Tech",
    link: "https://www.blacktech.com.np/",
    logo: blacktechLogo.src,
    duration: "2025 — Present",
    description: (
      <>
      Worked as a{" "} <span className="underline decoration-dotted underline-offset-4">
      Frontend Developer </span>
      , building responsive and scalable interfaces for{" "} <span className="underline decoration-dotted underline-offset-4">
      Viewb.io </span>{" "}
      and{" "} <span className="underline decoration-dotted underline-offset-4">
      Restrox, a product by Blacktech </span>
      . Developed reusable components, optimized application performance, and
      collaborated with cross-functional teams to deliver{" "} <span className="underline decoration-dotted underline-offset-4">
      polished and user-focused experiences </span>
      . Recognized with the{" "} <span className="underline decoration-dotted underline-offset-4">
      Best UI Score Award </span>{" "}
      for outstanding frontend design and implementation.
      </>
      ),
      
  },
  {
    role: "Frontend Developer",
    company: "RestroX",
    link: "https://www.restrox.com",
    logo: restroxLogo.src,
    duration: "2025 - Present",
    description: (
      <>
        Worked on{" "}
        <span className="underline decoration-dotted underline-offset-4">
          Restrox, a product by Blacktech
        </span>
        , focusing on{" "}
        <span className="underline decoration-dotted underline-offset-4">
          frontend development and UI/UX
        </span>
        . Led the{" "}
        <span className="underline decoration-dotted underline-offset-4">
          landing page redesign
        </span>{" "}
        and built interfaces for the{" "}
        <span className="underline decoration-dotted underline-offset-4">
          Connect App
        </span>
        , an online food delivery platform.
      </>
    ),
  },
  {
    role: "Remote Freelance Developer",
    duration: "",
    description: "Web and mobile products for clients.",
  },
];

const Experience = () => {
  return (
    <section id="experience" className="mx-auto w-full max-w-5xl px-6 py-8">
      <div className="mx-auto max-w-xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-600 dark:text-neutral-400">
          Experience
        </p>
       
        <div className="mt-8 space-y-8">
          {experience.map((exp) => (
            <article
              key={`${exp.role}-${exp.company ?? "freelance"}`}
              className="grid gap-x-6 gap-y-1 sm:grid-cols-[7.5rem_1fr]"
            >
              {exp.duration ? (
                <p className="pt-0.5 text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-400">
                  {exp.duration}
                </p>
              ) : (
                <span className="hidden sm:block" />
              )}
              <div>
                <h2 className="text-[15px] font-semibold leading-6">
                  {exp.role}
                  {exp.company && (
                    <>
                      {" "}
                      <span className="font-normal">at</span>{" "}
                      {exp.logo && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={exp.logo}
                          alt=""
                          className="mr-1.5 inline-block h-5 w-5 object-contain rounded-sm align-[-4px]"
                        />
                      )}
                      {exp.link ? (
                        <LinkPreview
                          url={exp.link}
                          className="underline decoration-neutral-400 underline-offset-4 dark:decoration-neutral-500"
                        >
                          {exp.company}
                        </LinkPreview>
                      ) : (
                        exp.company
                      )}
                    </>
                  )}
                </h2>
                <p className="mt-1.5 text-[15px] leading-7 text-neutral-600 dark:text-neutral-400">
                  {exp.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-600 dark:text-neutral-400">
            Achievement
          </p>
          
            
             <div className="flex  gap-2 mt-4">
             <ImagesBadge
              text=""
              images={[certificate.src, mug.src]}
              hoverImageSize={{ width: 112, height: 76 }}
              hoverTranslateY={-88}
              hoverSpread={30}
            />
            <div className="flex flex-col">
              <span className="text-[15px] font-semibold leading-6 text-neutral-900 dark:text-neutral-100">
                Best UI Score Award
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-400">
                2026
              </span>
            </div>
             </div>
          
        </div>
      </div>
    </section>
  );
};

export default Experience;
