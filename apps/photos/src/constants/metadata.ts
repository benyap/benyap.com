//#region public site

export const SITE_NAME = "Ben Yap Photos";

export const SITE_NAME_TEMPLATE = `%s - ${SITE_NAME}`;

export const DESCRIPTION =
  "The beauty of life and creation, captured in a moment.";

export function getSiteTitle(title?: string) {
  return title ? SITE_NAME_TEMPLATE.replace("%s", title) : SITE_NAME;
}

//#endregion

//#region admin site

export const SITE_NAME_ADMIN = "Photos Admin";

export const SITE_NAME_ADMIN_TEMPLATE = `%s - ${SITE_NAME_ADMIN}`;

export const DESCRIPTION_ADMIN = "No dodgy people allowed.";

export function getSiteAdminTitle(title?: string) {
  return title
    ? SITE_NAME_ADMIN_TEMPLATE.replace("%s", title)
    : SITE_NAME_ADMIN;
}

//#endregion
