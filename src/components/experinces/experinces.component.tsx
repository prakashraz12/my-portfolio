"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { AlertCircle, Briefcase } from "lucide-react";
import { DEERWALK_EXP, GAMMA_EXP_LETTER } from "../../../constant";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building2, Calendar, ExternalLink } from "lucide-react";
import { Experience } from "@/lib/types/types";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";

const roadmapData: Experience[] = [
  {
    type: "experience",
    title: "MERN Stack Training",
    company: "Deerwalk Training Center",
    description:
      "3-month intensive training in full-stack development at deer walk training center- sifal kahmandu, Nepal",
    jobs: [
      "Node js",
      "Javascript",
      "HTML",
      "CSS",
      "React",
      "Git",
      "Github",
      "Express",
    ],
    documentLink: GAMMA_EXP_LETTER,
    duration: "Sep 21 2022 to Nov 29 2022",
    period: "3 Months",
    website: "",
    keyResponsibilities: [
      "Learn HTML, CSS and JS basic.",
      "Learn React and their functions.",
      "Basic Understanding of Git and Github like how we can submit our app.",
      "Node js and framework like express and built a curd app.",
      "Understanding Git conflict.",
    ],
  },
  {
    type: "experience",
    title: "Frontend Developer 🧑‍💻",
    company: "Gamma Techno Pvt.ltd",
    description:
      "1.5+ years of experience in building responsive web applications using react, next js",
    documentLink: DEERWALK_EXP,
    jobs: [
      "Javascript",
      "HTML",
      "CSS",
      "React",
      "Git",
      "Github",
      "Next js",
      "Nest js",
      "Docker",
    ],
    duration: "Mar 2022 to May 12 2024",
    website: "",
    period: "1.5+ YOE",
    keyResponsibilities: [
      "Develop Ui as per requirement.",
      "Make UI functional and bug free.",
      "Fix buges.",
      "Ui development",
      "E2E test.",
    ],
  },
  {
    type: "experience",
    title: "Freelance Web & Mobile Developer",
    company: "Enfra Soft PVT.LTD",
    description:
      "Working on Digital Learning Platform Called eDigital Class, where i build responsive web design and development in react and next js with SEO friendly approach.",
    jobs: [
      "Javascript",
      "HTML",
      "CSS",
      "React",
      "Git",
      "Github",
      "Next js",
      "React Native",
    ],
    duration: "Jun 2024 to Current",
    website: "",
    keyResponsibilities: [
      "Develop and maintain code base and deploy.",
      "Fix buges.",
      "Ui development",
      "Mobile app development using react native for cross platform like ios and android.",
      "E2E test.",
    ],
    documentLink: "",
    period: "Running...",
  },
];

const RoadmapItem = ({ item, index }: { item: Experience; index: number }) => {
  const [showAlert, setShowAlert] = useState(false)
  const isEven = index % 2 === 0

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.2 },
    },
  }

  const handleDocumentClick = () => {
    if (item.documentLink) {
      window.open(item.documentLink, "_blank")
    } else {
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000)
    }
  }

  return (
    <motion.div
      className={`flex flex-col md:flex-row items-center ${
        isEven ? "md:flex-row-reverse" : ""
      } mb-12 md:mb-24 relative`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={`w-full md:w-5/12 ${isEven ? "md:text-right md:pr-8" : "md:pl-8"}`}>
        <Card className="overflow-hidden transition-all hover:shadow-lg">
          <CardHeader className="space-y-1 bg-muted/50">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
                {item.title}
                <Badge variant="secondary" className="ml-2">
                  {item.period}
                </Badge>
              </CardTitle>
              <Link
                href={item.website || "#"}
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Building2 className="h-4 w-4" />
                {item.company}
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
            <CardDescription className="flex items-center gap-1 text-sm">
              <Calendar className="h-4 w-4" />
              {item.duration}
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Core Responsibilities</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {item.keyResponsibilities.map((responsibility, index) => (
                    <li key={index}>{responsibility}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {item.jobs.map((tech) => (
                    <Badge key={tech} variant="outline" className="rounded-full">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-3 relative">
              <Button
                variant="ghost"
                size="sm"
                className="text-sm underline flex items-center gap-2"
                onClick={handleDocumentClick}
              >
                See document <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="w-full md:w-2/12 flex justify-center my-4 md:my-0">
        <motion.div
          className={`w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center z-10`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: index * 0.2 + 0.3,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <motion.div
            className="w-12 h-12 rounded-full bg-background flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: index * 0.2 + 0.4,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            {item.type === "hobby" ? "🎨" : <Briefcase className="h-6 w-6 text-primary" />}
          </motion.div>
        </motion.div>
      </div>
      <div className="w-full md:w-5/12" />
      {index < roadmapData.length - 1 && (
        <motion.svg
          className={`hidden md:block absolute ${isEven ? "left-0" : "right-0"} w-1/2 h-24`}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
        >
          <path
            d={`M ${isEven ? "100%" : "0"} 0 Q ${isEven ? "50%" : "50%"} 100% ${
              isEven ? "0" : "100%"
            } 100%`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
        </motion.svg>
      )}
      <AnimatePresence>
        {showAlert && (
          <motion.div
            className="fixed bottom-4 right-4 z-50"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <Alert variant="default">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Hmm... Coming soon!</AlertTitle>
              <AlertDescription>
                The document for this experience is not available yet. Check back later!
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const CurvedRoadmap = () => {
  return (
    <div className="container mx-auto px-4 py-16">
       
      <h2  className="text-3xl font-bold tracking-tighter sm:text-5xl">
        My Journey: <br /> Experiences
        <span className="inline-block w-24 h-[2px] bg-black ml-4 align-middle" />
      </h2>
      <div className="relative mt-4">
        {roadmapData.map((item, index) => (
          <RoadmapItem key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default CurvedRoadmap;
