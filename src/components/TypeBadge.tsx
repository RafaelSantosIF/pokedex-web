import { typeInfo } from "@/utils";
import styles from "./TypeBadge.module.css";

type Props = {
  type: string;
};

export default function TypeBadge({ type }: Props) {
  const info = typeInfo(type);

  return (
    <span className={styles.badge} style={{ backgroundColor: info.color }}>
      {info.label}
    </span>
  );
}
