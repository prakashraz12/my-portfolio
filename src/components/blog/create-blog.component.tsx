"use client";
import { KeyboardEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import { db, slugGenerator } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import QuillEditor from "@/components/quil-editor/quil-editor.component";
import { toast } from "@/hooks/use-toast";
import { LoaderCircle, X } from "lucide-react";
import { Badge } from "../ui/badge";
import useCategories from "@/hooks/use-category-provide";

export default function BlogCreationPage() {
  const { categories, loading: isCategoryRendering } = useCategories();
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");
  const [bannerImageUrl, setBannerImageUrl] = useState("");
  const [isBannerUploading, setIsBannerUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  const addTag = (tag: string) => {
    tag = tag.trim().toLowerCase();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
    }
  };
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && /^image\//.test(file.type)) {
      setIsBannerUploading(true);
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
        setBannerImageUrl(data.secure_url);
      } catch (error) {
        console.log(error);
        toast({
          title: "Error",
          description: "Failed to upload image. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsBannerUploading(false);
      }
    }
  };

  const handleUpload = async () => {
    if (!title || !shortDescription || !content || !bannerImageUrl) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields and upload a banner image.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "blogs"), {
        title,
        shortDescription,
        bannerImageUrl,
        content,
        tags,
        category: selectedCategory,
        claps: 0,
        comments: [],
        slug: slugGenerator(title),
        createdAt: new Date(),
      });

      toast({
        title: "Success",
        description: "Blog post created successfully!",
      });
      router.push("/");
    } catch (error) {
      console.error("Error uploading blog:", error);
      toast({
        title: "Error",
        description: "Failed to create blog post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 mt-10">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Create New Blog Post
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="banner-image">Banner Image</Label>
            <div
              className=" aspect-video hover:opacity-80 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden flex flex-col justify-center items-center"
              id="banner-image"
            >
              {isBannerUploading && <LoaderCircle className="animate-spin" />}
              {bannerImageUrl && (
                <img
                  src={bannerImageUrl}
                  alt="banner-image"
                  className="w-full"
                />
              )}
            </div>
            <Input
              type="file"
              id="banner-image"
              accept=".png, .jpg, .jpeg"
              disabled={isBannerUploading}
              className="w-auto"
              onChange={handleImageChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="short-description">Short Description</Label>
            <Textarea
              id="short-description"
              placeholder="Enter a brief description of your blog post"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label>Content</Label>
            <QuillEditor value={content} onChange={setContent} />
          </div>
          {!isCategoryRendering && (
            <div className="space-y-2">
              <Label>Content</Label>
              <Select onValueChange={(e) => setSelectedCategory(e)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((i, index) => (
                    <SelectItem value={i?.id} key={index}>
                      {i?.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="space-y-2">
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Add tags..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleInputKeyDown}
                className="flex-grow"
              />
              <Button onClick={() => addTag(inputValue)}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-sm py-1 px-2"
                >
                  {tag}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-auto p-0"
                    onClick={() => removeTag(tag)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleUpload} disabled={loading}>
            {loading ? "Creating..." : "Create Blog Post"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
