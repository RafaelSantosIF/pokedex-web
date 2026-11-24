import type { Stat } from "@/api";
import { statInfo } from "@/utils";
import styles from "./StatBar.module.css";

const MAX_STAT = 255;

type Props = {
  stat: Stat;
};

export default function StatBar({ stat }: Props) {
  const info = statInfo(stat.name);
  const percent = (stat.value / MAX_STAT) * 100;

  return (
    <div className={styles.row}>
      <span className={styles.label}>{info.label}</span>
      <span className={styles.value}>{stat.value}</span>
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{
            width: `${percent}%`,
            backgroundColor: info.color,
          }}
        />
      </div>
    </div>
  );
}
