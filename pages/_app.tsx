import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RouteGuard } from "../utils/routerGaurd";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RouteGuard>
      <Component {...pageProps} />
    </RouteGuard>
  );
  // <RouteGuard>{getLayout(<Component {...pageProps} />)}</RouteGuard>
}
