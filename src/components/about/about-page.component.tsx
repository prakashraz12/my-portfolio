"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { GITHUB_ACCOUNT, LINKED_IN } from "../../../constant";

const educationData = [
  {
    year: 2015,
    degree: "School Leaving Certificate (SLC)",
    institution: "Shree sidda Madyamik Bidhyala",
    description: "Completed school level education",
  },
  {
    year: 2017,
    degree: "Intermediate",
    institution: "College Name", // Replace with your college name
    description: "Completed intermediate level with Business Studies",
  },
  {
    year: 2024,
    degree: "Bachelor's Degree",
    institution: "Tribhuvan University",
    description: "Completed bachelor's degree",
  },
  {
    year: 2023,
    degree: "MERN Stack Training",
    institution: "Deerwalk Training Institution",
    description: "3-month intensive training in MERN stack development",
    location: "Sifal, Kathmandu",
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AnimatedSection = ({ children }: { children: any }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.5 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
    >
      {children}
    </motion.div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RoadMap = ({ children }: { children: any }) => {
  return (
    <div className="relative">
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200 z-0"></div>
      {children}
    </div>
  );
};

const RoadNode = ({
  isLeft,
  children,
}: {
  isLeft: boolean;
  children: React.ReactNode;
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.5 }}
      variants={{
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: isLeft ? -50 : 50 },
      }}
      className={`flex items-center mb-8 ${isLeft ? "flex-row-reverse" : ""}`}
    >
      <div className={`flex-1 ${isLeft ? "text-right" : ""}`}>{children}</div>
      <div className="w-12 h-12 rounded-full bg-blue-500 border-4 border-white flex items-center justify-center z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="w-3 h-3 rounded-full bg-white"
        />
      </div>
      <div className="flex-1"></div>
    </motion.div>
  );
};

export default function EnhancedAboutPage() {
  const [activeSection, setActiveSection] = useState("whoIAm");

  const sections = [
    { id: "whoIAm", title: "Who I am?" },
    { id: "whyTechnology", title: "Why I Love Technology?" },
    { id: "artAndTech", title: "Have I Left Art Behind?" },
    {
      id: "strengthsWeaknesses",
      title: "What Are My Strengths and Weaknesses?",
    },
  ];
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16 mt-20">
        <div className="flex flex-col items-center justify-center mb-16">
          <AnimatedSection>
            <motion.div
              className="w-64 h-64 relative overflow-hidden mb-8 md:mb-0 md:mr-8 border rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src="https://res.cloudinary.com/du1bbws62/image/upload/v1730027930/cblzc2dpjfpcipufopva.jpg"
                alt="Prakash raz's profile image"
                layout="fill"
                objectFit="cover"
              />
            </motion.div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="max-w-lg text-center md:text-left">
              <motion.h2
                className="text-2xl font-semibold mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Prakash Shrestha
              </motion.h2>
              <p>rzprakash16@gmail.com</p>
              <div className="flex flex-wrap gap-2 mb-4 mt-5">
                {sections.map((section) => (
                  <motion.button
                    key={section.id}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      activeSection === section.id
                        ? "bg-slate-900 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => setActiveSection(section.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {section.title}
                  </motion.button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeSection === "whoIAm" && (
                    <p className="text-gray-600 mb-4">
                      I&apos;m a passionate self-taught developer 💻 committed to
                      honing my skills and creating impactful software. While my
                      heart lies in tech, I also embrace my artistic side 🎨
                      through sketching and taking on professional commissions.
                      Balancing these passions not only defines who I am but
                      also fuels my creativity and problem-solving abilities.
                    </p>
                  )}
                  {activeSection === "whyTechnology" && (
                    <>
                      <p className="text-gray-600 mb-4">
                        As a child, I was always fascinated by technology. I
                        eagerly explored various tools and gadgets, which
                        ignited my curiosity and sparked a desire to learn. From
                        playing with computers to experimenting with software,
                        every experience deepened my understanding of how
                        technology shapes our lives.
                      </p>
                      <p className="text-gray-600 mb-4">
                        The thrill of discovering new advancements and how they
                        can solve real-world problems has always captivated me.
                        I find joy in breaking down complex concepts and
                        transforming them into user-friendly solutions.
                      </p>
                    </>
                  )}
                  {activeSection === "artAndTech" && (
                    <>
                      <p className="text-gray-600 mb-4">
                        Absolutely not! I still take on commission work because
                        I believe that art plays a crucial role in my life.
                        Spending long hours in front of the computer can be
                        draining, and engaging in creative activities like
                        sketching allows me to recharge my mind and unleash my
                        imagination.
                      </p>
                      <p className="text-gray-600 mb-4">
                        Balancing my work as a front-end developer with my
                        passion for art not only keeps me motivated but also
                        enhances my creativity in both fields.
                      </p>
                    </>
                  )}
                  {activeSection === "strengthsWeaknesses" && (
                    <>
                      <p className="text-gray-600 mb-4">
                        One of my key strengths is my educational background; I
                        hold a Bachelor&lsquo;s degree in Business Studies, which
                        equips me with valuable insights into optimizing
                        business strategies. My artistic skills further enhance
                        my ability to create visually appealing and creative
                        websites.
                      </p>
                      <p className="text-gray-600 mb-4">
                        However, I also recognize my weaknesses. Mathematics is
                        a challenging area for me, which sometimes requires
                        additional time and effort when solving complex
                        problems. I acknowledge this limitation and am committed
                        to improving my mathematical skills.
                      </p>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-center md:justify-start space-x-4 mt-4">
                <motion.a
                  href={LINKED_IN}
                  className="text-blue-700 hover:text-blue-800"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </motion.a>
                <motion.a
                  href={GITHUB_ACCOUNT}
                  className="text-gray-800 hover:text-gray-900"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.a>
              </div>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection>
          <h2 className="text-3xl font-bold text-center mb-12">
            Education Journey
          </h2>
        </AnimatedSection>

        <RoadMap>
          {educationData?.map((edu, index) => (
            <RoadNode key={index} isLeft={index % 2 === 0}>
              <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
                <div className="flex flex-col mb-4">
                  <h3 className="text-xl font-semibold">{edu.degree}</h3>
                  <span className="text-gray-500">{edu.year}</span>
                </div>
                <p className="text-gray-600 mb-2">{edu.institution}</p>
                <p className="text-gray-700">{edu.description}</p>
                {edu.location && (
                  <p className="text-gray-500 mt-2">{edu.location}</p>
                )}
              </div>
            </RoadNode>
          ))}
        </RoadMap>

        <AnimatedSection>
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Let&apos;s Connect!</h2>
            <p className="text-gray-600 mb-4">
              I&apos;m always open to new opportunities and collaborations. Feel
              free to reach out!
            </p>
            <a
              href="mailto:rzprakash16@gmail.com"
              className="inline-block  bg-slate-900 text-white px-6 py-3 rounded-full font-semibold  transition duration-300"
            >
              Contact Me
            </a>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
