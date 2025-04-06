import { APP_URL } from "./app";

export const PublicRoute = {
  url: APP_URL,
};

export const AdminRoute = {
  url: `${APP_URL}/admin`,
  index: "/admin",
  account: {
    index: "/admin/account",
  },
  photos: {
    index: "/admin/photos",
    photo: (id: string) => `/admin/photos/${id}`,
  },
  collections: {
    index: "/admin/collections",
    collection: (id: string) => `/admin/collections/${id}`,
  },
  metadata: {
    cameras: {
      index: "/admin/metadata/cameras",
      camera: (id: string) => `/admin/metadata/cameras/${id}`,
    },
    lenses: {
      index: "/admin/metadata/lenses",
      lens: (id: string) => `/admin/metadata/lenses/${id}`,
    },
    locations: {
      index: "/admin/metadata/locations",
      location: (id: string) => `/admin/metadata/locations/${id}`,
    },
    tags: {
      index: "/admin/metadata/tags",
      tag: (id: string) => `/admin/metadata/tags/${id}`,
    },
  },
};
