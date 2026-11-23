import Image from "next/image";
import Link from "next/link";
import type { Pokemon } from "@/api";
import { formatName, formatNumber } from "@/utils";
import TypeBadge from "./TypeBadge";
import styles from "./PokemonCard.module.css";

type Props = {
  pokemon: Pokemon;
  selected: boolean;
};

export default function PokemonCard({ pokemon, selected }: Props) {
  return (
    <Link
      href={`/pokemon/${pokemon.id}`}
      className={selected ? `${styles.card} ${styles.selected}` : styles.card}
    >
      <Image
        className={styles.sprite}
        src={pokemon.sprite}
        alt={formatName(pokemon.name)}
        width={96}
        height={96}
        unoptimized
      />
      <span className={styles.number}>{formatNumber(pokemon.id)}</span>
      <span className={styles.name}>{formatName(pokemon.name)}</span>
      <span className={styles.types}>
        {pokemon.types.map((type) => (
          <TypeBadge key={type} type={type} />
        ))}
      </span>
    </Link>
  );
}
