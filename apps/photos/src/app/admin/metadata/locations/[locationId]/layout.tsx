import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Locations",
};

export default function Layout(props: React.PropsWithChildren) {
  const { children } = props;
  return children;
}
