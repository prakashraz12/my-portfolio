"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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

import { Loader2 } from "lucide-react";

import { addCommentToPost } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const commentFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must not exceed 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  comment: z
    .string()
    .min(10, "Comment must be at least 10 characters")
    .max(500, "Comment must not exceed 500 characters"),
});

type CommentFormValues = z.infer<typeof commentFormSchema>;

const defaultValues: Partial<CommentFormValues> = {
  fullName: "",
  email: "",
  comment: "",
};

export default function CommentForm({
  postId,
  collectionName,
}: {
  postId: string;
  collectionName: string;
}) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentFormSchema),
    defaultValues,
  });

  async function onSubmit(data: CommentFormValues) {
    setIsSubmitting(true);
    try {
      await addCommentToPost(postId, data, collectionName);
      toast({
        title: "Comment submitted!",
        description: "Your comment has been successfully submitted.",
      });

      form.reset();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Error",
        description: "There was a problem submitting your comment.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Leave a Comment</h2>
        <p className="text-muted-foreground mt-1">
          Share your thoughts about this {collectionName === "blogs" ? "article." :"project, that will help to improve."}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
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
                      placeholder="john@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comment</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your comment here..."
                    className="min-h-[120px] resize-y"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Your comment must be between 10 and 500 characters.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isSubmitting ? "Submitting..." : "Submit Comment"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
