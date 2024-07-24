import type { FileRouter } from "uploadthing/next";
import { getAuth } from "@clerk/nextjs/server";
import { createUploadthing, UTFiles } from "uploadthing/next";
import { UploadThingError, UTApi, UTFile } from "uploadthing/server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  documentUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 1, minFileCount: 1 },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req, files }) => {
      // This code runs on your server before upload
      const user = getAuth(req);

      // If you throw, the user will not be able to upload
      if (!user.userId || !user.orgId)
        throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.userId, orgId: user.orgId };
    })
    .onUploadComplete(async ({ metadata }) => {
      const api = new UTApi();
      // Rename the file
      await api.renameFiles({
        customId: metadata.userId,
        newName: `doc-${metadata.orgId}-${metadata.userId}`,
      });

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
