import { FirebaseProvider } from "~/components/firebase/FirebaseProvider";

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <FirebaseProvider>{children}</FirebaseProvider>
      </body>
    </html>
  );
}
