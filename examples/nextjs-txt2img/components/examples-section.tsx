"use client";

import Image from "next/image";
import clsx from "clsx";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { CheckIcon } from "@radix-ui/react-icons";

import { Column } from "@/components/ui/column";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Row } from "@/components/ui/row";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Example, examples } from "@/data/examples";

type SeeExampleOutputDialogProps = {
  item: any;
  setOpen: (state: boolean) => void;
};

type ItemProps = {
  item: Example | null;
  onSelectExample: (item: Example | null) => void;
};

function Item({ item, onSelectExample }: ItemProps) {
  return (
    <div
      onClick={() => {
        onSelectExample(item);
      }}
      className="group min-w-[256px] w-[256px] border flex items-center justify-center border-primary/20 rounded p-4 cursor-pointer hover:border-muted-foreground hover:shadow-md transition-colors duration-500"
    >
      <p className="group-hover:text-slate-900 dark:group-hover:text-slate-100 text-sm text-primary/70 line-clamp-2 leading-tight duration-500">
        {item?.name}
      </p>
    </div>
  );
}

const SeeExampleOutputDialog = ({
  item,
  setOpen,
}: SeeExampleOutputDialogProps) => {
  const form = useFormContext();
  const [isLoading, setIsLoading] = useState(true);

  const onSubmit = () => {
    console.log("item:", item);
    // form.setValue("image", item.image.url);

    setOpen(false);
  };

  return (
    <Dialog open={!!item} onOpenChange={setOpen}>
      <DialogContent className="!pt-[42px] max-w-sm md:max-w-4xl md:max-h-4xl">
        <div className="flex flex-col md:flex-row w-full gap-5">
          <div className="w-full  md:w-1/2">
            <ScrollArea className="aspect-square h-[170px] md:h-full relative shadow-sm border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 w-full rounded-lg">
              <div className="space-y-2 p-4">
                {item &&
                  Object.keys(item).map((key) => {
                    if (
                      key !== "id" &&
                      key !== "modelVersion" &&
                      key !== "name" &&
                      key !== "exampleOutput" &&
                      key !== "category"
                    ) {
                      if (key === "image") {
                        return (
                          <p key={key} className="text-sm">
                            <span className="font-semibold">{key}:</span>{" "}
                            {item[key].name}
                          </p>
                        );
                      }
                      return (
                        <p key={key} className="text-sm">
                          <span className="font-semibold">{key}:</span>{" "}
                          {JSON.stringify(item[key], null, 2)}
                        </p>
                      );
                    }
                    return null;
                  })}
              </div>
            </ScrollArea>
          </div>
          <div className="w-full md:w-1/2">
            <div className="relative scrollbar-hide overflow-auto shadow-sm border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 w-full rounded-lg p-1">
              <figure className={"aspect-square"}>
                <Image
                  loading="lazy"
                  priority={false}
                  className={clsx(
                    "object-cover duration-700 ease-in-out",
                    isLoading
                      ? "scale-120 blur-3xl grayscale"
                      : "scale-100 blur-0 grayscale-0"
                  )}
                  src={item?.exampleOutput}
                  fill={true}
                  alt="Example Image"
                  onLoadingComplete={() => setIsLoading(false)}
                />
              </figure>
            </div>
          </div>
        </div>
        <Row className="justify-end">
          <Button className="items-center gap-2" onClick={onSubmit}>
            <CheckIcon />
            Apply
          </Button>
        </Row>
      </DialogContent>
    </Dialog>
  );
};

export default function ExamplesSection() {
  const [selectedExample, setSelectedExample] = React.useState<Example | null>(
    null
  );

  return (
    <React.Fragment>
      <SeeExampleOutputDialog
        item={selectedExample}
        setOpen={() => setSelectedExample(null)}
      />
      <Column className="gap-2 w-full max-w-[90vw]">
        <Row className=" examples-container overflow-hidden">
          <Row className="examples-row gap-2">
            <Row className="gap-2 overflow-hidden">
              {firstRowExamples.map((item, index) => (
                <Item
                  key={`example-${item.prompt}-${index}`}
                  item={item}
                  onSelectExample={setSelectedExample}
                />
              ))}
            </Row>
            <Row className="gap-2">
              {firstRowExamples.map((item, index) => (
                <Item
                  key={`example-row-2-${item.prompt}-${index}`}
                  item={item}
                  onSelectExample={setSelectedExample}
                />
              ))}
            </Row>
          </Row>
        </Row>
        <Row className="examples-container overflow-hidden">
          <Row className="examples-row2 gap-2">
            <Row className="gap-2">
              {secondRowExamples.map((item, index) => (
                <Item
                  key={`example-${item.prompt}-${index}`}
                  item={item}
                  onSelectExample={setSelectedExample}
                />
              ))}
            </Row>
            <Row className="gap-2">
              {secondRowExamples.map((item, index) => (
                <Item
                  key={`example-row-2-${item.prompt}-${index}`}
                  item={item}
                  onSelectExample={setSelectedExample}
                />
              ))}
            </Row>
          </Row>
        </Row>
      </Column>
    </React.Fragment>
  );
}

const firstRowExamples = examples.slice(0, 4);
const secondRowExamples = examples.slice(-4);
