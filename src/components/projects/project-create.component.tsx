"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Loader2, LoaderCircle, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import QuillEditor from "@/components/quil-editor/quil-editor.component";
import { addDoc, collection } from "firebase/firestore";
import { db, slugGenerator } from "@/lib/utils";
import { useRouter } from "next/navigation";

const projectSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must not exceed 100 characters"),
  shortDescription: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must not exceed 1000 characters"),
  bannerImage: z.string().optional(),
  content: z.string(),
  githubLink: z.string().url("Please enter a valid GitHub URL").optional(),
  projectLink: z.string().url("Please enter a valid project URL").optional(),
  techStack: z
    .array(z.string())
    .min(1, "At least one technology must be added"),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function ProjectCreatePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      shortDescription: "",
      githubLink: "",
      projectLink: "",
      content: "",
      techStack: [],
    },
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && /^image\//.test(file.type)) {
      setImageUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "prakash-media");

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/du1bbws62/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!res.ok) {
          throw new Error("Image upload failed");
        }

        const data = await res.json();
        form.setValue("bannerImage", data.secure_url);
        setPreviewImage(data?.secure_url);
      } catch (error) {
        console.log(error);
        toast({
          title: "Error",
          description: "Failed to upload image. Please try again.",
          variant: "destructive",
        });
      } finally {
        setImageUploading(false);
      }
    }
  };

  const handleAddTech = (tech: string) => {
    const currentTech = form.getValues("techStack");
    if (tech && !currentTech.includes(tech)) {
      form.setValue("techStack", [...currentTech, tech]);
    }
  };

  const handleRemoveTech = (techToRemove: string) => {
    const currentTech = form.getValues("techStack");
    form.setValue(
      "techStack",
      currentTech.filter((tech) => tech !== techToRemove)
    );
  };

  async function onSubmit(data: ProjectFormValues) {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "project"), {
        title: data?.title,
        shortDescription: data?.shortDescription,
        bannerImageUrl: data?.bannerImage,
        content: data?.content,
        tech_stacks: data?.techStack,
        claps: 0,
        comments: [],
        slug: slugGenerator(data?.title),
        createdAt: new Date(),
        project_link: data?.projectLink,
        github_link: data?.githubLink,
      });

      router.push("/");

      toast({
        title: "Project created!",
        description: "Your project has been successfully created.",
      });

      form.reset();
      setPreviewImage(null);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "There was a problem creating your project.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  console.log(form.formState);
  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Create New Project
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="bannerImage"
                render={({}) => (
                  <FormItem>
                    <FormLabel>Banner Image</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-4 flex-col overflow-hidden">
                        <Input
                          disabled={imageUploading}
                          type="file"
                          accept=".jpg,.png,.webp"
                          onChange={(e) => {
                            handleImageChange(e);
                          }}
                        />
                        {imageUploading && (
                          <LoaderCircle className="animate-spin" />
                        )}
                        {previewImage && (
                          <div className="relative w-full h-[200px]">
                            <Image
                              src={previewImage}
                              alt="Banner preview"
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>
                      Upload a banner image for your project (max 5MB, .jpg,
                      .png, or .webp)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter project title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="shortDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Short description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your project"
                        className="min-h-[120px] resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Description</FormLabel>
                    <FormControl>
                      <QuillEditor
                        value={field.value}
                        onChange={(content) => field.onChange(content)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="githubLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub Link</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://github.com/yourusername/project"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Link</FormLabel>
                    <FormControl>
                      <Input placeholder="https://yourproject.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="techStack"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tech Stack</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <div className="flex space-x-2">
                          <Input
                            placeholder="Add technology"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddTech(e.currentTarget.value);
                                e.currentTarget.value = "";
                              }
                            }}
                          />
                          <Button
                            type="button"
                            onClick={() => {
                              const input = document.querySelector(
                                'input[placeholder="Add technology"]'
                              ) as HTMLInputElement;
                              if (input.value) {
                                handleAddTech(input.value);
                                input.value = "";
                              }
                            }}
                          >
                            Add
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {field.value.map((tech, index) => (
                            <div
                              key={index}
                              className="flex items-center bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm"
                            >
                              {tech}
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="ml-2 h-auto p-0"
                                onClick={() => handleRemoveTech(tech)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Add technologies used in your project
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isSubmitting ? "Creating Project..." : "Create Project"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
