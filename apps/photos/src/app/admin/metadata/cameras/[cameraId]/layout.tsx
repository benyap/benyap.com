import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Camera",
};

export default function Layout(props: React.PropsWithChildren) {
  const { children } = props;
  return children;
}
