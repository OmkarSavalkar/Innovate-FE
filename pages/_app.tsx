import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RouteGuard } from "../utils/routerGaurd";
import { store } from "../side-effects/store";
import { Provider } from "react-redux";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <RouteGuard>
        <Component {...pageProps} />
      </RouteGuard>
    </Provider>
  );
  // <RouteGuard>{getLayout(<Component {...pageProps} />)}</RouteGuard>
}
