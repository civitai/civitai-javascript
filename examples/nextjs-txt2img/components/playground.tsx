"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { SuccessIcon } from "./ui/success-icon";

import { z } from "zod";
import { usePlaygroundForm } from "@/hooks/use-form";
import { cn, formSchema, pollJob } from "@/lib/utils";
import { FormFields } from "./form-fields";

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
        model: values.model,
        params: {
          prompt: values.prompt,
          negativePrompt: values.negativePrompt,
          scheduler: values.scheduler,
          steps: values.steps,
          cfgScale: values.cfgScale,
          width: values.width,
          height: values.height,
          clipSkip: values.clipSkip,
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
    <div className="flex flex-col mx-auto px-8 md:px-0">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col space-y-4">
              <FormFields />

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
