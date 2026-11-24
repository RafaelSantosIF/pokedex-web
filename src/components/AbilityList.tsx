import { formatName } from "@/utils";
import styles from "./AbilityList.module.css";

type Props = {
  abilities: string[];
};

export default function AbilityList({ abilities }: Props) {
  return (
    <div className={styles.list}>
      {abilities.map((ability) => (
        <span key={ability} className={styles.pill}>
          {formatName(ability)}
        </span>
      ))}
    </div>
  );
}
