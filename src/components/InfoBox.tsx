import styles from "./InfoBox.module.css";

type Props = {
  label: string;
  value: string;
};

export default function InfoBox({ label, value }: Props) {
  return (
    <div className={styles.box}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
}
