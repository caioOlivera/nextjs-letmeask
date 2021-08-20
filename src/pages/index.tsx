import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import illustrationSVG from "../assets/images/illustration.svg";
import logoSVG from "../assets/images/logo.svg";
import googleIconSVG from "../assets/images/google-icon.svg";

import "../services/firebase";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>LetMeAsk</title>
      </Head>
      <aside>
        <Image src={illustrationSVG} alt="Ilustracao" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div>
          <Image src={logoSVG} alt="Logo" />
          <button>
            <Image src={googleIconSVG} alt="logo do google" />
            Crie sua sala com o Google.
          </button>
          <div>ou entre em uma sala</div>
          <form>
            <input type="text" placeholder="Digite o codigo da sala" />
            <button type="submit">Entrar na sala</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Home;
