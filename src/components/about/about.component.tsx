'use client'


import { animated } from '@react-spring/web'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CodeIcon, BookOpenIcon, RocketIcon } from 'lucide-react'

export default function AboutSection() {
 

  const skills = [
    'HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Git'
  ]

  return (
    <section  className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <animated.div>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          About
          <br />
          Me
          <span className="inline-block w-24 h-[2px] bg-black ml-4 align-middle" />
        </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <Card className='outline-none border-none shadow-none'>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-4">Frontend Web Developer</h3>
                  <p className="text-muted-foreground mb-4">
                    {`I'm a passionate frontend web developer who started my journey 2 years ago. 
                    Since then, I've been constantly learning and improving my skills to create 
                    beautiful and functional web experiences.`}
                  </p>
                  <p className="text-muted-foreground mb-4">
                    My enthusiasm for web development drives me to stay up-to-date with the latest 
                    technologies and best practices in the field.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <Card className='outline-none border-none shadow-none'>
                <CardContent className="p-6 flex items-start space-x-4">
                  <CodeIcon className="h-6 w-6 mt-1 text-primary" />
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Technical Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className='outline-none border-none shadow-none'>
                <CardContent className="p-6 flex items-start space-x-4">
                  <BookOpenIcon className="h-6 w-6 mt-1 text-primary" />
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Continuous Learning</h4>
                    <p className="text-muted-foreground">
                      Always eager to learn new technologies and improve my skills through online courses, 
                      tutorials, and hands-on projects.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className='outline-none border-none shadow-none'>
                <CardContent className="p-6 flex items-start space-x-4">
                  <RocketIcon className="h-6 w-6 mt-1 text-primary" />
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Passion for Innovation</h4>
                    <p className="text-muted-foreground">
                     {`Excited about creating innovative web solutions and pushing the boundaries of what's 
                      possible in frontend development.`}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </animated.div>
      </div>
    </section>
  )
}
