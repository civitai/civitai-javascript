"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { ReloadIcon } from "@radix-ui/react-icons";
import { SuccessIcon } from "./ui/success-icon";

import { z } from "zod";
import { usePlaygroundForm } from "@/hooks/use-form";
import { cn, formSchema, pollJob } from "@/lib/utils";
import { toast } from "sonner";

export default function Playground() {
  const form = usePlaygroundForm();

  const [imageUrl, setImageUrl] = useState("");
  // Form states
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);
    try {
      const input = {
        model: "@civitai/130072",
        params: {
          prompt: values.prompt,
          negativePrompt:
            "(deformed iris, deformed pupils, semi-realistic, cgi, 3d, render, sketch, cartoon, drawing, anime, mutated hands and fingers:1.4), (deformed, distorted, disfigured:1.3), poorly drawn, bad anatomy, wrong anatomy, extra limb, missing limb, floating limbs, disconnected limbs, mutation, mutated, ugly, disgusting, amputation",
          scheduler: "EulerA",
          steps: 20,
          cfgScale: 7,
          width: 512,
          height: 512,
          clipSkip: 2,
        },
      };
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const data = await response.json();
      const token = data.token;

      if (token) {
        pollJob(token)
          .then((imageUrl) => {
            setImageUrl(imageUrl);
            setIsSuccess(true);
          })
          .catch((error) => {
            toast.error("Failed to generate image", {
              description: error.message,
            });
          })
          .finally(() => {
            setSubmitting(false);
            setTimeout(() => {
              setIsSuccess(false);
            }, 2000);
          });
      } else {
        toast.error("Failed to generate image");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to generate image: " + error);
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-8 mx-auto px-8 md:px-0">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="input">Input</Label>
                <FormField
                  control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="textarea-container relative">
                          <Textarea
                            placeholder={"A cat"}
                            className="flex-1 min-h-[150px] lg:min-h-[200px]"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-row items-center space-x-2">
                <Button
                  disabled={isSubmitting}
                  className={cn(
                    "w-full md:w-[140px] h-10",
                    isSuccess &&
                      "text-white duration-150 bg-green-500 hover:bg-green-600 hover:text-slate-100 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 active:scale-100 active:bg-green-800 active:text-green-100"
                  )}
                  type="submit"
                >
                  {isSubmitting ? (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  ) : isSuccess ? (
                    <SuccessIcon />
                  ) : (
                    <div className="flex items-center justify-center gap-x-2">
                      <Image
                        className="filter invert dark:filter-none lg:-ml-1"
                        width={15}
                        height={15}
                        src={"/sparkling-icon.png"}
                        alt={"Generate"}
                      />

                      <span>Generate</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>
            <div className="relative h-[320px] w-[320px] md:h-[500px] md:w-[500px] rounded-md border bg-muted">
              {isSubmitting ? (
                <div className="flex flex-col items-center justify-center absolute top-0 left-0 w-full h-full gap-3">
                  <div className="absolute bottom-4 w-full text-center text-slate-500 text-xs">
                    Takes 30 seconds to generate.
                  </div>
                </div>
              ) : (
                imageUrl && (
                  <Link
                    className="relative h-[320px] w-[320px] md:h-[500px] md:w-[500px] flex bg-muted rounded-md overflow-hidden group"
                    href={imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      alt="Glyph image output"
                      src={imageUrl}
                      width={512}
                      height={512}
                      className="object-cover transition-all md:hover:scale-105"
                    />
                  </Link>
                )
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}