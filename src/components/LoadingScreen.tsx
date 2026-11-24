import Image from "next/image";
import styles from "./LoadingScreen.module.css";
import { TOTAL_POKEMON } from "@/api";

const STARTERS = [1, 4, 7, 25];

type Props = {
  done?: boolean;
};

export default function LoadingScreen({ done = false }: Props) {
  return (
    <div className={done ? `${styles.screen} ${styles.done}` : styles.screen}>
      <div className={styles.top}>
        <h1 className={styles.title}>Pokédex</h1>
      </div>

      <div className={styles.bottom}>
        <p className={styles.text}>
          Carregando os {TOTAL_POKEMON} Pokémon
          <span className={styles.dots} />
        </p>
        <div className={styles.progress}>
          <div className={styles.progressFill} />
        </div>
        <div className={styles.starters}>
          {STARTERS.map((id) => (
            <Image
              key={id}
              className={styles.sprite}
              src={`/sprites/animated/${id}.gif`}
              alt=""
              width={64}
              height={64}
              loading="eager"
              unoptimized
            />
          ))}
        </div>
      </div>

      <div className={styles.button}>
        <span className={styles.buttonCenter} />
      </div>
    </div>
  );
}
