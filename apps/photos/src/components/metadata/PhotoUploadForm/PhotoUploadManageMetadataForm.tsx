import prettyBytes from "pretty-bytes";

import { Photo } from "~/core/photo";
import { PhotoUploadException } from "~/core/photo/file";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardMedia,
  CardTitle,
} from "~/components/ui/card";
import { MetadataBadge } from "~/components/metadata/MetadataBadge";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { Subheading } from "~/components/ui/heading";
import { DateTimeDisplay } from "~/components/core/DateTimeDisplay";

import { ImagePreview } from "./ImagePreview";

export function PhotoUploadManageMetadataForm(props: {
  photos: Photo[];
  setPhotos: (photos: Photo[]) => void;
  errors: PhotoUploadException[];
  setErrors: (errors: PhotoUploadException[]) => void;
}) {
  const { photos, errors } = props;

  return (
    <div className="@container space-y-8">
      {errors.length > 0 && (
        <section className="space-y-2">
          <Subheading>Issues</Subheading>
          <Text>
            The following files had issues when they were being processed.
          </Text>
          <div className="grid gap-4 pt-2">
            {errors.map((error, index) => {
              return (
                <Card key={index} dense>
                  <CardMedia className="relative w-48 sm:w-64">
                    <ImagePreview file={error.fileInfo.file} />
                  </CardMedia>
                  <CardHeader>
                    <CardAction>
                      <Button variant="outline">Fix</Button>
                    </CardAction>
                    <CardTitle>{error.fileInfo.fileId}</CardTitle>
                    <CardDescription
                      color="custom"
                      className="text-destructive"
                    >
                      {error.message}
                    </CardDescription>
                  </CardHeader>
                  <CardContent></CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      <section className="space-y-2">
        <Subheading>Ready for upload</Subheading>
        <Text>
          Successfully extracted all required metadata for the following photos.
        </Text>
        <div className="grid gap-4 pt-2">
          {photos.map((photo) => {
            const { reference, files, metadata } = photo;

            const file = files.processed?.file ?? files.raw?.file;

            const fileList = [files.processed, files.raw].filter(
              (file): file is NonNullable<typeof file> => Boolean(file),
            );

            return (
              <Card key={reference} dense>
                <CardMedia className="relative w-48 sm:w-64">
                  <ImagePreview file={file} />
                </CardMedia>
                <CardHeader>
                  <CardAction>
                    <Button variant="outline">Edit</Button>
                  </CardAction>
                  <CardTitle className="truncate pr-8">{reference}</CardTitle>
                  <CardDescription>
                    <DateTimeDisplay format="datetime">
                      {metadata.date}
                    </DateTimeDisplay>
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-2">
                  <MetadataBadge match="cameras" matchId={metadata.cameraId} />
                  <MetadataBadge match="lenses" matchId={metadata.lensId} />
                  <div className="@min-lg:flex @min-lg:gap-4 grid grid-cols-2 gap-2">
                    <MetadataBadge type="focalLength">
                      {metadata.focalLength}
                    </MetadataBadge>
                    <MetadataBadge type="fNumber">
                      {metadata.fNumber}
                    </MetadataBadge>
                    <MetadataBadge type="shutterSpeed">
                      {metadata.shutterSpeed}
                    </MetadataBadge>
                    <MetadataBadge type="iso">{metadata.iso}</MetadataBadge>
                  </div>
                  <div className="flex flex-wrap gap-x-8 gap-y-2">
                    {fileList.map((file) => (
                      <Text key={file.id} className="truncate">
                        <span className="font-bold">{file.format}</span>{" "}
                        {prettyBytes(file.size)}
                      </Text>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
