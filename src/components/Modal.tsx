import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./Modal.module.css";

type Props = {
  children: ReactNode;
};

export default function Modal({ children }: Props) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <Link href="/" className={styles.close} aria-label="Fechar">
          ✕
        </Link>
        {children}
      </div>
    </div>
  );
}
