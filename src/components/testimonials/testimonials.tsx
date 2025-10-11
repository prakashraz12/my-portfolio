"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { testimonials } from "../../../constant";

export default function TestimonialCarousel() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [api, setApi] = React.useState<any>();
  const [current, setCurrent] = React.useState(0);

  const autoplay = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl container mx-auto">
        What client
        <br />
        says about me!
        <span className="inline-block w-24 h-[2px] bg-black ml-4 align-middle" />
      </h2>

      <div className="w-full bg-background py-12 flex items-center justify-center">
        <div className="container px-4 md:px-6 max-w-4xl">
          <Carousel
            setApi={setApi}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            plugins={[autoplay.current] as any}
            className="w-full"
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
          >
            <CarouselContent>
              {testimonials?.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <Card className="border-0 shadow-none">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center">
                        <Quote className="h-8 w-8 mb-4 text-bk opacity-50" />
                        <div className="space-y-4">
                          <p className="text-lg md:text-xl lg:text-2xl leading-relaxed">
                            {testimonial.quote.split(" ").map((word, i) => (
                              <React.Fragment key={i}>
                                <span
                                  className={cn(
                                    [
                                      "Prakash Shrestha",
                                      "exceptional",
                                      "remarkable",
                                      "shrestha",
                                      "Prakash",
                                    ].includes(word.toLowerCase())
                                      ? "font-semibold"
                                      : ""
                                  )}
                                >
                                  {word}
                                </span>{" "}
                              </React.Fragment>
                            ))}
                          </p>
                          <div className="space-y-2">
                            <h3 className="text-xl font-semibold ">
                              {testimonial.author}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {testimonial.title}
                            </p>
                          </div>
                          <div className="h-8 flex justify-center">
                            <Image
                              src={testimonial.companyLogo}
                              alt={testimonial.company}
                              width={100}
                              height={32}
                              className="h-full w-auto object-contain rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "h-2 w-2 rounded-full transition-all",
                  index === current ? "bg-black w-4" : "bg-muted-foreground/20"
                )}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
