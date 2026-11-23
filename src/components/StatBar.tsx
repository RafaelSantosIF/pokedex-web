import type { Stat } from "@/api";
import { statInfo } from "@/utils";
import styles from "./StatBar.module.css";

// Highest possible base stat. A stat of 255 fills the whole bar.
const MAX_STAT = 255;

type Props = {
  stat: Stat;
};

// TODO Questão 11: implement this component.
export default function StatBar({ stat }: Props) {
  return null;
}
