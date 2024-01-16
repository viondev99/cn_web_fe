import Layout from "@/layouts";
import { ProductContextProvider } from "@/store/product-context";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <ProductContextProvider>
        <Component {...pageProps} />
      </ProductContextProvider>
    </Layout>
  );
}
