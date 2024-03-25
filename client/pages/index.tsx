import Login from "@/src/client/components/auth/SignIn";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>SpeckCheck</title>
        <meta name="description" content="Mentor Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Login />
    </>
  );
}
