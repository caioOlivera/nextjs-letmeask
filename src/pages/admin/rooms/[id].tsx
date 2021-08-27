import { GetServerSideProps } from "next";
import Router, { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
// import { parseCookies } from "nookies";
import { useState } from "react";
// import toast from "react-hot-toast";
// import Modal from "react-modal";
import { database } from "../../../services/firebase";
import { useRoom } from "../../../hooks/useRoom";
import Question from "../../../components/Question";
import RoomCode from "../../../components/RoomCode";
import { Button } from "../../../components/Button";
import logoSVG from "../../../assets/images/logo.svg";
import styles from "../../../assets/styles/pages/Room.module.scss";

type RoomQueryParams = {
  id?: string;
};

export default function AdminRoom() {
  const router = useRouter();
  const { id: roomId }: RoomQueryParams = router.query;

  const { title, questions } = useRoom(roomId!);

  async function handleEndRoom() {
    database.ref(`rooms/${roomId}`).update({ endedAt: new Date() });
    Router.push("/");
  }

  return (
    <>
      <header className={styles.header}>
        <div>
          <Image src={logoSVG} alt="LetMeAsk" />
          <div>
            <RoomCode code={`${roomId}`} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <div>
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        {questions.map((question) => {
          return (
            <Question
              key={question.id}
              id={question.id}
              content={question.content}
              author={question.author}
              isAdmin
              roomId={roomId!}
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            ></Question>
          );
        })}
      </main>
    </>
  );
}
