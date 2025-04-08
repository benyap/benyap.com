"use client";

import clsx from "clsx";
import filesize from "pretty-bytes";
import { useEffect, useState } from "react";
import { TriangleAlertIcon, UploadIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";

import {
  isSupportedPhotoFileType,
  PHOTO_MIME_TYPES_ACCEPT,
} from "~/core/photo/file";

import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardMedia,
  CardTitle,
} from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { Button, CloseButton } from "~/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

import { ImagePreview } from "./ImagePreview";

export function PhotoUploadSelectFilesForm(props: {
  files: File[];
  addFiles: (files: File[]) => void;
  removeFile: (file: File) => void;
}) {
  const { files, addFiles, removeFile } = props;

  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [rejectedFiles, setRejectedFiles] = useState<File[]>([]);

  const pending = pendingFiles.length > 0;

  // File validation requires an async call, so we need to use a useEffect.
  useEffect(() => {
    if (pendingFiles.length === 0) return;
    Promise.all(
      pendingFiles.map(async (file) => ({
        file,
        valid: await isSupportedPhotoFileType(file),
      })),
    ).then((results) => {
      const accepted = results.filter((result) => result.valid);
      const rejected = results.filter((result) => !result.valid);
      addFiles(accepted.map((result) => result.file));
      setRejectedFiles(rejected.map((result) => result.file));
      setPendingFiles([]);
    });
  }, [pendingFiles, addFiles]);

  const dragUpload = useDropzone({
    noClick: true,
    disabled: pending,
    onDrop: (files) => setPendingFiles(files),
  });

  const clickUpload = useDropzone({
    noDrag: true,
    disabled: pending,
    accept: PHOTO_MIME_TYPES_ACCEPT,
    onDrop: (files) => setPendingFiles(files),
  });

  return (
    <div className="@container space-y-4">
      {rejectedFiles.length > 0 && (
        <Alert>
          <TriangleAlertIcon className="size-4" />
          <AlertTitle>The following files were not accepted</AlertTitle>
          <AlertDescription>
            <ul className="my-2 ml-6">
              {rejectedFiles.map((file) => (
                <li key={file.name} className="list-disc">
                  {file.name}
                </li>
              ))}
            </ul>
            <Button onClick={() => setRejectedFiles([])}>Okay</Button>
          </AlertDescription>
        </Alert>
      )}
      <div
        {...dragUpload.getRootProps()}
        className={clsx(
          "relative grid w-full place-items-center rounded-md border transition-all",
          files.length > 0 && "h-40",
          files.length === 0 && "h-80",
          pending && "opacity-50",
          dragUpload.isDragActive && "bg-accent",
        )}
      >
        <input {...dragUpload.getInputProps()} />
        <div className="text-center">
          <Text className="grid place-items-center gap-2">
            <UploadIcon className="text-muted-foreground" />
            Drag and drop or
            <Button
              variant="outline"
              disabled={pending}
              {...clickUpload.getRootProps()}
            >
              <input {...clickUpload.getInputProps()} />
              Click to select files
            </Button>
          </Text>
        </div>
      </div>
      <div className="@min-lg:grid-cols-2 grid grid-cols-1 gap-4">
        {files.map((file) => (
          <Card key={file.name} dense>
            <CardMedia className="relative w-48">
              <ImagePreview file={file} />
            </CardMedia>
            <CardHeader className="relative">
              <CardAction>
                <CloseButton
                  className="-mr-1 -mt-1"
                  onClick={() => removeFile(file)}
                />
              </CardAction>
              <CardTitle className="truncate pr-8">{file.name}</CardTitle>
              <CardDescription>{filesize(file.size)}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
