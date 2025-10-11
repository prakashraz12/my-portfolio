import Image from "next/image"
import Link from "next/link"

const Experience = () => {
    const experience = [
        {
            role:"Frontend Developer",
            company:"Black Tech",
            link:"https://www.blacktech.com.np/",
            duration:"2025 - Present",
            description:"Currently work at Black Tech as a Frontend Developer, involved in building and maintain Restrox restaurant management software and other projects.",
            tech:["React","Next.js","TypeScript","Tailwind CSS","Framer Motion","Shadcn UI", "husky"],
            logo:"https://res.cloudinary.com/du1bbws62/image/upload/v1760099810/e8rytt3hvzo9ztr2qn6i.png"
        },
        {
            role:"Full Stack Developer",
            company:"Kritim Baudikata Anusandhan Kendra,Nepal",
            duration:"4 months",
            description:"Worked as a Full Stack Developer at Kritim Baudikata Anusandhan Kendra, Nepal, where I was responsible for building and maintaining the website and other projects.",
            tech:["React","Next.js","TypeScript","Tailwind CSS","Framer Motion","Shadcn UI", "Nest js", "Cpanel"],
            logo:"https://res.cloudinary.com/du1bbws62/image/upload/v1760152142/huerioejyd8klxrsszur.png",
            link:"https://kritrimbaudhikata.com/en"
        },
        {
            role:"Frontend Developer and Mobile App",
            company:"Freelancing",
            duration:"8 months",
            description:"Worked as a Frontend Developer and Mobile App Developer. I was building web and mobile app for e-tech business called e-digital class.",
            tech:["React","Next.js","TypeScript","Tailwind CSS","Framer Motion","Shadcn UI", "Nest js", "Cpanel", "react native", "expo", "firebase"],
            logo:""
        },
        {
            role:"Frontend Developer",
            company:"Gamma techno Pvt.ltd",
            duration:"1.8 years",
            description:"I was joined as intern at Gamma techno Pvt.ltd, where I learned react, SSR, Hooks, HOC and many more.",
            tech:["React", "Next js","Javascript","HTML","CSS","Material ui"],
            logo:"https://res.cloudinary.com/du1bbws62/image/upload/v1730448294/wz5umqfwrspggzx0arsm.png"
        }
    ]
    return (
        <div className="max-w-2xl mx-auto  px-4 sm:px-6">
            <h2 className="text-2xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-500 to-neutral-600 font-sans font-bold ">
                Experiences
            </h2>
            <p className="text-sm text-muted-foreground mt-3">Experiences never ends! until you die, when i was born i started to learning.</p>
            <div className="space-y-8 mt-8">
                {experience.map((exp, index) => (
                    <div key={index} className="flex gap-4 sm:gap-6 border-b pb-6">
                        <div className="bg-slate-50 rounded-md p-2 border h-12 w-12 min-w-[48px] flex items-center justify-center flex-shrink-0">
                            {exp.logo ? (
                                <div className="relative w-8 h-8">
                                    <Image 
                                        src={exp.logo} 
                                        alt={`${exp.company} logo`}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            ) : (
                                <div className="w-8 h-8 bg-gradient-to-br from-slate-200 to-slate-300 rounded" />
                            )}
                        </div>
                        <div className="flex flex-col gap-2 min-w-0 flex-1">
                            <h3 className="text-base sm:text-lg font-semibold">{exp.role}</h3>
                            <Link 
                                href={exp.link || "#"} 
                                className="font-semibold text-sm sm:text-base hover:underline"
                            >
                                {exp.company}
                            </Link>
                            <p className="text-sm text-muted-foreground">{exp.duration}</p>
                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                {exp.description}
                            </p>
                            <ul className="flex gap-2 flex-wrap mt-2">
                                {exp.tech.map((tech, techIndex) => (
                                    <li 
                                        key={techIndex} 
                                        className="bg-slate-50 dark:bg-slate-800 rounded-full text-sm px-3 py-0.5  border text-muted-foreground"
                                    >
                                        {tech}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Experience