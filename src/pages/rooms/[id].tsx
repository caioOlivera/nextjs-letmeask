import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import { database } from "../../services/firebase";
import { useState, FormEvent, useEffect } from "react";
//import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import { useRoom } from "../../hooks/useRoom";
import Question from "../../components/Question";
import RoomCode from "../../components/RoomCode";
import logoSVG from "../../assets/images/logo.svg";
import { Button } from "../../components/Button";
import styles from "../../assets/styles/pages/Room.module.scss";

type RoomQueryParams = {
  id?: string;
};

export default function Room() {
  const { user } = useAuth();
  const router = useRouter();
  const { id: roomId }: RoomQueryParams = router.query;

  const [newQuestion, setNewQuestion] = useState("");
  const { title, questions } = useRoom(roomId!);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === "") {
      return;
    }
    if (!user) {
      throw new Error("Voce deve estar logado");
    }
    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion("");
  }

  return (
    <>
      <header className={styles.header}>
        <div>
          <Image src={logoSVG} alt="LetMeAsk" />
          <RoomCode code={`${roomId}`} />
        </div>
      </header>
      <main className={styles.main}>
        <div>
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
        <form className={styles.formAsk} onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que voce quer perguntar"
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
          />
          <div className="formFooter">
            {user ? (
              <div className={styles.userInfo}>
                <Image
                  src={user?.avatar}
                  alt={user.name}
                  width="32"
                  height="32"
                />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta,{" "}
                <button type="button">fa??a seu login.</button>.
              </span>
            )}
            <Button type="submit" disabled={!user}>
              Enviar Pergunta
            </Button>
          </div>
        </form>

        {questions.map((question) => {
          return (
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
              likeId={question.likeId}
              likeCount={question.likeCount}
              id={question.id}
              roomId={roomId!}
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            />
          );
        })}
      </main>
    </>
  );
}
