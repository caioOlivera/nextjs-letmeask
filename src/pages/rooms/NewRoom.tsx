import type { NextPage } from "next";
import AuthContext from "../../contexts/AuthContext";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import illustrationSVG from "../../assets/images/illustration.svg";
import logoSVG from "../../assets/images/logo.svg";
import styles from "../../assets/styles/pages/NewRoom.module.scss";
import { Button } from "../../components/Button";
import { FormEvent, useState } from "react";

import "../../services/firebase";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";

const NewRoom: NextPage = () => {
  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState("");

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    if (newRoom.trim() === "") {
      return;
    }

    const roomRef = database.ref("rooms"); // using real time database
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorID: user?.id,
    });
    Router.push(`/rooms/${firebaseRoom.key}`);
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
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link href="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default NewRoom;
