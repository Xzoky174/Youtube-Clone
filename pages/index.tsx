import { useSession } from "next-auth/react";
import Head from "next/head";

import styles from "../styles/modules/Home.module.css";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div>
      <Head>
        <title>YouTube Clone</title>
      </Head>

      <h1>{status === "authenticated" ? "Yup!" : "Nope!"}</h1>
    </div>
  );
}
