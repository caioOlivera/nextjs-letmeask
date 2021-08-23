import type { NextPage } from "next";
import Router from "next/router";
import Head from "next/head";
import Image from "next/image";
import illustrationSVG from "../assets/images/illustration.svg";
import logoSVG from "../assets/images/logo.svg";
import googleIconSVG from "../assets/images/google-icon.svg";
import styles from "../assets/styles/pages/home.module.scss";
import { Button } from "../components/Button";

import { useAuth } from "../hooks/useAuth";

const Home: NextPage = () => {
  const { user, signInWithGoogle } = useAuth();
  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    Router.push("/rooms/NewRoom");
  }

  return (
    <div className={styles.pageAuth}>
      <Head>
        <title>LetMeAsk</title>
      </Head>
      <aside className={styles.info}>
        <Image src={illustrationSVG} alt="Ilustracao" />
        <strong>Crie salas de Q&amp;A ao-vivo.</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real.</p>
      </aside>
      <main className={styles.content}>
        <div>
          <Image src={logoSVG} alt="Logo" />
          <button onClick={handleCreateRoom} className={styles.createRoom}>
            <Image src={googleIconSVG} alt="logo do google" />
            Crie sua sala com o Google.
          </button>
          <div className={styles.separator}>ou entre em uma sala</div>
          <form>
            <input type="text" placeholder="Digite o codigo da sala" />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Home;
