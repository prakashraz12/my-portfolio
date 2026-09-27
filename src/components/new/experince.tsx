import { LinkPreview } from "@/components/ui/link-preview";
import blacktechLogo from "@/assets/logo/blacktech.png";

const experience: {
  role: string;
  company?: string;
  link?: string;
  logo?: string;
  duration: string;
  description: string;
}[] = [
  {
    role: "Frontend Developer",
    company: "Black Tech",
    link: "https://www.blacktech.com.np/",
    logo: blacktechLogo.src,
    duration: "2025 — Present",
    description:
      "Building and maintaining RestroX, a restaurant management product, along with other client work.",
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
        <p className="mt-4 text-[15px] leading-7 text-neutral-600 dark:text-neutral-400">
          I work as a frontend developer at Black Tech, and I take on remote
          freelance work alongside that.
        </p>
        <div className="mt-8 space-y-8">
          {experience.map((exp) => (
            <article
              key={exp.role}
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
                          className="mr-1.5 inline-block h-5 w-5 rounded-sm align-[-4px]"
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
      </div>
    </section>
  );
};

export default Experience;
