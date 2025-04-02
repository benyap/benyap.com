import { FirebaseUserProvider } from "~/components/firebase/FirebaseUserProvider";

export default function Layout(props: React.PropsWithChildren) {
  const { children } = props;
  return <FirebaseUserProvider>{children}</FirebaseUserProvider>;
}
