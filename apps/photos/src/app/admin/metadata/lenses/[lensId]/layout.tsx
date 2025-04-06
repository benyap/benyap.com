import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lens",
};

export default function Layout(props: React.PropsWithChildren) {
  const { children } = props;
  return children;
}
