import { Html, Head, Main, NextScript } from "next/document";

import { THEME_MODE_KEY } from "~/config/constants";

const FAVICON_VERSION = 1;

function v(path: string) {
  return `favicons/${path}?v=${FAVICON_VERSION}`;
}

export default function Document() {
  return (
    <Html lang="en" className="">
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href={v("apple-touch-icon.png")} />
        <link rel="icon" type="image/png" sizes="16x16" href={v("favicon-16x16.png")} />
        <link rel="icon" type="image/png" sizes="32x32" href={v("favicon-32x32.png")} />
        <link rel="manifest" href={v("site.webmanifest")} />
        <link rel="mask-icon" href={v("safari-pinned-tab.svg")} color="#2F353B" />
        <link rel="shortcut icon" href={v("favicon.ico")} />
        <meta name="apple-mobile-web-app-title" content="Ben Yap" />
        <meta name="application-name" content="Ben Yap" />
        <meta name="msapplication-TileColor" content="#2F353B" />
        <meta name="msapplication-config" content={v("browserconfig.xml")} />
        <meta name="theme-color" content="#F8F8F8" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            try {
              if (
                ("${THEME_MODE_KEY}" in localStorage && localStorage.${THEME_MODE_KEY} === "dark") ||
                window.matchMedia("(prefers-color-scheme: dark)").matches
              ) { document.documentElement.classList.add("dark") }
              else { document.documentElement.classList.remove("dark") }
            } catch {}
          `,
          }}
        />
      </Head>
      <body className="bg-brand-light text-gray-700 antialiased transition dark:bg-brand-dark dark:text-gray-200 print:bg-transparent">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
