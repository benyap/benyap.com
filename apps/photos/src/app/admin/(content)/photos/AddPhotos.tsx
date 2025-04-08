"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";

import { preparePhotoFilesForUpload } from "~/core/photo/file";
import { PhotoUploadStep } from "~/stores/photo-upload";
import { wait } from "~/lib/wait";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { usePhotoUpload } from "~/components/metadata/PhotoUploadProvider";
import {
  PhotoUploadManageMetadataForm,
  PhotoUploadSelectFilesForm,
} from "~/components/metadata/PhotoUploadForm";
import { useMetadata } from "~/components/metadata/MetadataProvider";
import { Loader } from "~/components/core/Loader";
import { Text } from "~/components/ui/text";

const INFO: Record<PhotoUploadStep, { title: string; description: string }> = {
  "select-files": {
    title: "Select files",
    description:
      "Choose files to upload. JPEG and RAW files with matching names will be grouped together.",
  },
  "manage-metadata": {
    title: "Manage metadata",
    description:
      "Check the metadata for each photo before uploading and fill in any missing values.",
  },
  upload: {
    title: "Upload photos",
    description:
      "Upload your photos to the cloud. Optimised versions of each JPEG will also be created.",
  },
};

export function AddPhotos() {
  const [open, setOpen] = useState(false);
  const [processing, setProcessing] = useState(false);

  const {
    step,
    setStep,
    files,
    addFiles,
    removeFile,
    reset,
    photos,
    setPhotos,
    errors,
    setErrors,
  } = usePhotoUpload();

  const [, camerasSnapshot] = useMetadata().cameras;
  const [, lensesSnapshot] = useMetadata().lenses;

  const cameras = camerasSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const lenses = lensesSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // TODO: remove this
  console.log(photos, errors);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="@min-lg:w-auto w-full">
            <PlusIcon />
            Add photos
          </Button>
        </DialogTrigger>
        <DialogContent className="w-5xl max-h-[calc(100vh-64px)] overflow-y-scroll sm:max-w-[calc(100vw-64px)]">
          <DialogHeader>
            <DialogTitle>{INFO[step].title}</DialogTitle>
            <DialogDescription>{INFO[step].description}</DialogDescription>
          </DialogHeader>
          {step === "select-files" && (
            <PhotoUploadSelectFilesForm
              files={files}
              addFiles={addFiles}
              removeFile={removeFile}
            />
          )}
          {processing && (
            <div className="grid min-h-80 w-full place-items-center">
              <div className="space-y-6">
                <Loader />
                <Text>Processing</Text>
              </div>
            </div>
          )}
          {step === "manage-metadata" && !processing && (
            <PhotoUploadManageMetadataForm
              photos={photos}
              setPhotos={setPhotos}
              errors={errors}
              setErrors={setErrors}
            />
          )}
          <DialogFooter>
            {step === "select-files" && (
              <Button
                variant="ghost"
                className="sm:mr-auto"
                disabled={files.length === 0}
                onClick={reset}
              >
                Reset
              </Button>
            )}
            {step === "manage-metadata" && (
              <Button
                variant="ghost"
                className="sm:mr-auto"
                onClick={() => setStep("select-files")}
              >
                Back
              </Button>
            )}
            {step === "upload" && (
              <Button
                variant="ghost"
                className="sm:mr-auto"
                onClick={() => setStep("manage-metadata")}
              >
                Back
              </Button>
            )}
            {step === "select-files" && cameras && lenses && (
              <Button
                disabled={files.length === 0 || processing}
                onClick={async () => {
                  setProcessing(true);
                  setStep("manage-metadata");
                  await Promise.all([
                    wait(250), // minimum wait time
                    preparePhotoFilesForUpload(files, { cameras, lenses })
                      .andTee(({ photos }) => setPhotos(photos))
                      .andTee(({ errors }) => setErrors(errors)),
                  ]).then(() => setProcessing(false));
                }}
              >
                Next
              </Button>
            )}
            {step === "manage-metadata" && (
              <Button
                disabled={errors.length !== 0}
                onClick={() => {
                  setStep("upload");
                }}
              >
                Next
              </Button>
            )}
            {step === "upload" && <Button disabled>Upload</Button>}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
