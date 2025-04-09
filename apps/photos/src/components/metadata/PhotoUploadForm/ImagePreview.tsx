"use client";

import Image from "next/image";
import { useState } from "react";
import { FileImageIcon, FileQuestionIcon } from "lucide-react";

import { mimeTypeToFormat } from "~/core/photo/file";
import { cn } from "~/lib/utils";

import { Text } from "~/components/ui/text";
import { useImagePreview } from "~/components/core/ImagePreviewProvider";

export function ImagePreview(props: {
  className?: string;
  file: File | undefined;
}) {
  const { className, file } = props;

  const [loaded, setLoaded] = useState(false);

  const preview = useImagePreview(file);
  const format = mimeTypeToFormat(file?.type);

  if (!preview)
    return (
      <div
        className={cn(
          className,
          "bg-accent absolute inset-0 grid place-items-center",
        )}
      >
        <div className="flex flex-col items-center gap-1">
          {format ? (
            <FileImageIcon className="text-muted-foreground" />
          ) : (
            <FileQuestionIcon className="text-muted-foreground" />
          )}
          <Text color="secondary">{format || "Unknown"}</Text>
        </div>
      </div>
    );

  if (file && preview)
    return (
      <div className={cn(className, "bg-accent absolute inset-0")}>
        <Image
          fill
          src={preview.url}
          alt={file.name}
          className={cn(
            "fade-in object-cover transition-opacity duration-500",
            loaded ? "opacity-100" : "opacity-0",
          )}
          onLoad={() => {
            setLoaded(true);
          }}
        />
      </div>
    );

  return <div className={cn("bg-accent absolute inset-0 animate-pulse")} />;
}
