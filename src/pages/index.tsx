import HomePage from "@/components/home";
import { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Vion Nguyen | Web Technology</title>
        <meta name="og:title" content="Vion Nguyen" />
        <meta name="og:description" content="Web Technology" />
        <meta
          name="og:author"
          content="Vion Nguyen - facebook.com/minhhiep.vip99"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage />
    </>
  );
};

export default Home;
