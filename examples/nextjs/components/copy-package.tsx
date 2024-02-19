"use client";
import { toast } from "sonner";

export default function CopyPackage() {
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText("npm i civitai")
      .then(() => {
        toast.success("Copied to clipboard");
      })
      .catch((err) => {
        toast.error("Error copying to clipboard", err);
      });
  };

  return (
    <code
      className="thirteen w-fit px-4 py-1.5 text-xs font-light tracking-wide cursor-pointer"
      onClick={copyToClipboard}
    >
      npm i civitai
    </code>
  );
}
