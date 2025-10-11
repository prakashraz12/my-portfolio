"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Play, Send, Star, Phone, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import emailjs from "emailjs-com";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import Footer from "../footer/footer.component";
import {
  EMAIL,
  GITHUB_ACCOUNT,
  INSTAGRAM,
  LINKED_IN,
  PHONE_NUMBER,
} from "../../../constant";
import Link from "next/link";
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Component() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      emailjs
        .send(
          "service_79reue7",
          "template_tf7prfo",
          {
            from_name: values.name,
            from_email: values.email,
            message: values.message,
          },
          "IP5dTuPrYDiTZAGKK"
        )
        .then(
          () => {
            toast({
              title: "Message sent!",
              description: "We'll get back to you as soon as possible.",
            });
            form.reset();
          },
          () => {
            toast({
              title: "Message Failed!",
              description: "Ops Failed try another way",
            });
          }
        );

      setShowForm(false);
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-black py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden lg:mt-20 mt-4">
      <motion.div
        initial={{ opacity: 0, rotate: -180 }}
        animate={{ opacity: 1, rotate: 0 }}
        className="absolute top-4 right-4 text-yellow-400"
      >
        <Star className="w-6 h-6" />
      </motion.div>

      <div className="max-w-2xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
           

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl font-bold mb-6"
            >
              Let&apos;s work together
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 mb-8 max-w-lg"
            >
              You can express yourself however you want and whenever you want,
              for free. You can customize a template or make your own.
            </motion.p>

            {!showForm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-6 rounded-full text-lg"
                >
                  Say Hello <Send className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            )}

            <div className="mt-12 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-4"
              >
                <Phone className="w-6 h-6 text-gray-400" />
                <a
                  href={`tel:+977${PHONE_NUMBER}`}
                  className="text-xl hover:text-yellow-400 transition-colors"
                >
                  {PHONE_NUMBER}
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-4"
              >
                <Mail className="w-6 h-6 text-gray-400" />
                <a
                  href="mailto:support@smith.com"
                  className="text-xl hover:text-yellow-400 transition-colors"
                >
                  {EMAIL}
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-12"
            >
              <p className="text-gray-400 mb-4">Follow me:</p>
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
            </motion.div>
          </div>

          {showForm && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="bg-gray-900 p-8 rounded-2xl"
            >
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            {...field}
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="your@email.com"
                            {...field}
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Your message"
                            {...field}
                            className="bg-gray-800 border-gray-700 text-white min-h-[150px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-violet-600 hover:bg-violet-700 text-white px-8"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowForm(false)}
                      className="border-gray-700 text-gray-400 hover:text-white"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </motion.div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
